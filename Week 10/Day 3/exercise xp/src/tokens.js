import { createHash, randomUUID } from 'node:crypto'
import jwt from 'jsonwebtoken'

const issuer = 'week-10-jwt-exercise'
const accessAudience = 'week-10-api'
const refreshAudience = 'week-10-refresh'
export const refreshCookieName = 'refreshToken'
export const refreshTokenLifetimeSeconds = 7 * 24 * 60 * 60

export function hashToken(token) {
  return createHash('sha256').update(token).digest('hex')
}

export function createAccessToken(user, secret) {
  return jwt.sign(
    { username: user.username, tokenType: 'access' },
    secret,
    {
      algorithm: 'HS256',
      subject: String(user.id),
      issuer,
      audience: accessAudience,
      expiresIn: '15m',
    },
  )
}

export function createRefreshToken(user, secret) {
  const token = jwt.sign(
    { tokenType: 'refresh' },
    secret,
    {
      algorithm: 'HS256',
      subject: String(user.id),
      jwtid: randomUUID(),
      issuer,
      audience: refreshAudience,
      expiresIn: refreshTokenLifetimeSeconds,
    },
  )

  return {
    token,
    tokenHash: hashToken(token),
    expiresAt: Date.now() + refreshTokenLifetimeSeconds * 1000,
  }
}

export function verifyAccessToken(token, secret) {
  const payload = jwt.verify(token, secret, {
    algorithms: ['HS256'],
    issuer,
    audience: accessAudience,
  })
  if (
    typeof payload === 'string' ||
    payload.tokenType !== 'access' ||
    typeof payload.sub !== 'string' ||
    typeof payload.username !== 'string'
  ) {
    throw new jwt.JsonWebTokenError('Invalid access token payload.')
  }
  return { id: Number(payload.sub), username: payload.username }
}

export function verifyRefreshToken(token, secret) {
  const payload = jwt.verify(token, secret, {
    algorithms: ['HS256'],
    issuer,
    audience: refreshAudience,
  })
  if (
    typeof payload === 'string' ||
    payload.tokenType !== 'refresh' ||
    typeof payload.sub !== 'string'
  ) {
    throw new jwt.JsonWebTokenError('Invalid refresh token payload.')
  }
  return { userId: Number(payload.sub), tokenHash: hashToken(token) }
}
