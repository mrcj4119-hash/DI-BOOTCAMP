import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Router } from 'express'
import { z } from 'zod'
import { credentialsSchema, profileSchema } from './validation.js'
import {
  createAccessToken,
  createRefreshToken,
  refreshCookieName,
  refreshTokenLifetimeSeconds,
  verifyAccessToken,
  verifyRefreshToken,
} from './tokens.js'

const passwordCost = 12

function publicUser(user) {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    bio: user.bio,
  }
}

function setRefreshCookie(response, token, isProduction) {
  response.cookie(refreshCookieName, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    path: '/api/auth',
    maxAge: refreshTokenLifetimeSeconds * 1000,
  })
}

function clearRefreshCookie(response, isProduction) {
  response.clearCookie(refreshCookieName, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    path: '/api/auth',
  })
}

function validationError(error) {
  if (error instanceof z.ZodError) {
    return error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }))
  }
  return null
}

function createSession(database, user, config, response) {
  const refresh = createRefreshToken(user, config.refreshTokenSecret)
  database
    .prepare(
      'INSERT INTO refresh_sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)',
    )
    .run(refresh.tokenHash, user.id, refresh.expiresAt)

  setRefreshCookie(response, refresh.token, config.isProduction)
  return createAccessToken(user, config.accessTokenSecret)
}

export function createAuthRouter(database, config) {
  const router = Router()

  router.post('/register', async (request, response, next) => {
    const parsed = credentialsSchema.safeParse(request.body)
    if (!parsed.success) {
      return response.status(400).json({
        error: 'Invalid registration details.',
        details: validationError(parsed.error),
      })
    }

    try {
      const { username, password } = parsed.data
      const passwordHash = await bcrypt.hash(password, passwordCost)
      const result = database
        .prepare('INSERT INTO users (username, password_hash, name) VALUES (?, ?, ?)')
        .run(username.toLowerCase(), passwordHash, username)
      const user = database
        .prepare('SELECT id, username, name, bio FROM users WHERE id = ?')
        .get(result.lastInsertRowid)
      const accessToken = createSession(database, user, config, response)
      return response.status(201).json({ user: publicUser(user), accessToken })
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        error.code === 'SQLITE_CONSTRAINT_UNIQUE'
      ) {
        return response.status(409).json({ error: 'That username is already registered.' })
      }
      return next(error)
    }
  })

  router.post('/login', async (request, response) => {
    const parsed = z
      .object({ username: z.string().trim().min(1).max(24), password: z.string().min(1).max(72) })
      .safeParse(request.body)
    if (!parsed.success) {
      return response.status(400).json({
        error: 'Username and password are required.',
        details: validationError(parsed.error),
      })
    }

    const user = database
      .prepare('SELECT id, username, password_hash, name, bio FROM users WHERE username = ?')
      .get(parsed.data.username.toLowerCase())

    if (!user || !(await bcrypt.compare(parsed.data.password, user.password_hash))) {
      return response.status(401).json({ error: 'Invalid username or password.' })
    }

    const accessToken = createSession(database, user, config, response)
    return response.json({ user: publicUser(user), accessToken })
  })

  router.post('/refresh', (request, response) => {
    const token = request.cookies?.[refreshCookieName]
    if (!token) {
      return response.status(401).json({ error: 'Refresh token is required.' })
    }

    let claims
    try {
      claims = verifyRefreshToken(token, config.refreshTokenSecret)
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
        clearRefreshCookie(response, config.isProduction)
        return response.status(401).json({ error: 'Refresh token is invalid or expired.' })
      }
      throw error
    }

    const user = database
      .prepare('SELECT id, username, name, bio FROM users WHERE id = ?')
      .get(claims.userId)
    if (!user) {
      clearRefreshCookie(response, config.isProduction)
      return response.status(401).json({ error: 'Refresh session is no longer valid.' })
    }

    const nextRefresh = createRefreshToken(user, config.refreshTokenSecret)
    const rotateSession = database.transaction(() => {
      const deletion = database
        .prepare('DELETE FROM refresh_sessions WHERE token_hash = ? AND user_id = ?')
        .run(claims.tokenHash, user.id)
      if (deletion.changes !== 1) {
        return false
      }

      database
        .prepare(
          'INSERT INTO refresh_sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)',
        )
        .run(nextRefresh.tokenHash, user.id, nextRefresh.expiresAt)
      return true
    })

    if (!rotateSession()) {
      clearRefreshCookie(response, config.isProduction)
      return response.status(401).json({ error: 'Refresh token was already used or revoked.' })
    }

    setRefreshCookie(response, nextRefresh.token, config.isProduction)
    return response.json({
      user: publicUser(user),
      accessToken: createAccessToken(user, config.accessTokenSecret),
    })
  })

  router.post('/logout', (request, response, next) => {
    const token = request.cookies?.[refreshCookieName]
    if (!token) {
      clearRefreshCookie(response, config.isProduction)
      return response.status(204).end()
    }

    try {
      const claims = verifyRefreshToken(token, config.refreshTokenSecret)
      database.prepare('DELETE FROM refresh_sessions WHERE token_hash = ?').run(claims.tokenHash)
    } catch (error) {
      if (!(error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError)) {
        return next(error)
      }
    }

    clearRefreshCookie(response, config.isProduction)
    return response.status(204).end()
  })

  router.get('/me', requireAuthentication(config), (request, response) => {
    const user = database
      .prepare('SELECT id, username, name, bio FROM users WHERE id = ?')
      .get(request.auth.userId)
    if (!user) {
      return response.status(401).json({ error: 'Authenticated user no longer exists.' })
    }
    return response.json({ user: publicUser(user) })
  })

  router.patch('/me', requireAuthentication(config), (request, response) => {
    const parsed = profileSchema.safeParse(request.body)
    if (!parsed.success) {
      return response.status(400).json({
        error: 'Invalid profile details.',
        details: validationError(parsed.error),
      })
    }

    database
      .prepare('UPDATE users SET name = ?, bio = ? WHERE id = ?')
      .run(parsed.data.name, parsed.data.bio, request.auth.userId)
    const user = database
      .prepare('SELECT id, username, name, bio FROM users WHERE id = ?')
      .get(request.auth.userId)
    return response.json({ user: publicUser(user) })
  })

  return router
}

function requireAuthentication(config) {
  return (request, response, next) => {
    const authorization = request.get('authorization')
    const match = authorization?.match(/^Bearer (.+)$/i)
    if (!match) {
      return response.status(401).json({ error: 'A bearer access token is required.' })
    }

    try {
      const claims = verifyAccessToken(match[1], config.accessTokenSecret)
      request.auth = { userId: claims.id, username: claims.username }
      return next()
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
        return response.status(401).json({ error: 'Access token is invalid or expired.' })
      }
      return next(error)
    }
  }
}
