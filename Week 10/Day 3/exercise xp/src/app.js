import express from 'express'
import cookieParser from 'cookie-parser'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import { createAuthRouter } from './auth.js'

export function createApp(database, config) {
  const app = express()

  app.disable('x-powered-by')
  app.use(helmet())
  app.use(express.json({ limit: '16kb' }))
  app.use(cookieParser())

  app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' })
  })

  app.use(
    '/api/auth',
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 10,
      standardHeaders: 'draft-8',
      legacyHeaders: false,
      message: { error: 'Too many authentication attempts. Try again later.' },
    }),
    createAuthRouter(database, config),
  )

  app.use((_request, response) => {
    response.status(404).json({ error: 'Route not found.' })
  })

  app.use((error, _request, response, _next) => {
    if (error instanceof SyntaxError && 'body' in error) {
      return response.status(400).json({ error: 'Request body must be valid JSON.' })
    }

    console.error('Unhandled request error:', error)
    return response.status(500).json({ error: 'An unexpected server error occurred.' })
  })

  return app
}
