import type { ErrorRequestHandler, RequestHandler } from 'express'
import { AppError } from '../helpers/AppError'

export const notFound: RequestHandler = (_req, res) => {
  res.status(404).json({ message: 'That page could not be found.' })
}

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof AppError) {
    res.status(error.status).json({ message: error.message })
    return
  }

  if (error?.code === '23505') {
    res.status(409).json({ message: 'That record already exists.' })
    return
  }

  if (error?.code === 'SQLITE_CONSTRAINT_UNIQUE') {
    res.status(409).json({ message: 'That record already exists.' })
    return
  }

  if (error?.code === '23503') {
    res.status(400).json({ message: 'A related record could not be found.' })
    return
  }


  console.error('Unhandled request error:', error)
  res.status(500).json({ message: 'Something went wrong. Please try again.' })
}
