import type { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { AppError } from '../helpers/AppError'
import { createUser, findUserByEmail, findUserById } from '../models/authModel'
import type { AuthResponse } from '../../../types/types'

const accessSecret = () => process.env.JWT_SECRET!
const refreshSecret = () => process.env.REFRESH_SECRET!
const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' as const : 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/api/auth',
})

function issueTokens(user: { id: number }) {
  return {
    accessToken: jwt.sign({ id: user.id }, accessSecret(), { expiresIn: '15m' }),
    refreshToken: jwt.sign({ id: user.id }, refreshSecret(), { expiresIn: '7d' }),
  }
}

export async function register(req: Request, res: Response<AuthResponse>) {
  const username = typeof req.body.username === 'string' ? req.body.username.trim() : ''
  const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : ''
  const password = typeof req.body.password === 'string' ? req.body.password : ''

  if (!username || !email || !password) throw new AppError(400, 'Username, email, and password are required.')
  if (username.length > 50) throw new AppError(400, 'Username must be 50 characters or fewer.')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new AppError(400, 'Enter a valid email address.')
  if (password.length < 8 || password.length > 72) throw new AppError(400, 'Password must be between 8 and 72 characters.')
  if (await findUserByEmail(email)) throw new AppError(409, 'An account with that email already exists.')

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await createUser(username, email, passwordHash)
  const tokens = issueTokens(user)
  res.cookie('refreshToken', tokens.refreshToken, cookieOptions())
  res.status(201).json({ accessToken: tokens.accessToken, user })
}

export async function login(req: Request, res: Response<AuthResponse>) {
  const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : ''
  const password = typeof req.body.password === 'string' ? req.body.password : ''
  if (!email || !password) throw new AppError(400, 'Email and password are required.')

  const account = await findUserByEmail(email)
  if (!account || !(await bcrypt.compare(password, account.password_hash))) {
    throw new AppError(401, 'Email or password is incorrect.')
  }

  const user = { id: account.id, username: account.username, email: account.email }
  const tokens = issueTokens(user)
  res.cookie('refreshToken', tokens.refreshToken, cookieOptions())
  res.json({ accessToken: tokens.accessToken, user })
}

export async function refresh(req: Request, res: Response) {
  const token = req.cookies?.refreshToken
  if (!token) throw new AppError(401, 'Please sign in to continue.')

  try {
    const payload = jwt.verify(token, refreshSecret()) as { id: number }
    const user = await findUserById(payload.id)
    if (!user) throw new AppError(401, 'Your session has expired. Please sign in again.')
    const tokens = issueTokens({ id: payload.id })
    res.cookie('refreshToken', tokens.refreshToken, cookieOptions())
    res.json({ accessToken: tokens.accessToken, user })
  } catch {
    throw new AppError(401, 'Your session has expired. Please sign in again.')
  }
}

export async function currentUser(req: Request, res: Response) {
  const user = await findUserById(req.user!.id)
  if (!user) throw new AppError(401, 'Please sign in to continue.')
  res.json(user)
}

export function logout(_req: Request, res: Response) {
  res.clearCookie('refreshToken', { ...cookieOptions(), maxAge: undefined })
  res.status(204).end()
}
