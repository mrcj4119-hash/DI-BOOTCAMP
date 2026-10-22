import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes'
import storyRoutes from './routes/storyRoutes'
import contributorRoutes from './routes/contributorRoutes'
import commentRoutes from './routes/commentRoutes'
import advancedRoutes from './routes/advancedRoutes'
import { errorHandler, notFound } from './middleware/errorHandler'

dotenv.config()

if (!process.env.JWT_SECRET || !process.env.REFRESH_SECRET) {
  throw new Error('JWT_SECRET and REFRESH_SECRET must be configured.')
}

const app = express()
const allowedOrigins = (process.env.CLIENT_ORIGIN ?? 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())

app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use(express.json({ limit: '100kb' }))
app.use(cookieParser())

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))
app.use('/api/auth', authRoutes)
app.use('/api/stories', storyRoutes)
app.use('/api/contributors', contributorRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api', advancedRoutes)
app.use(notFound)
app.use(errorHandler)

const port = Number(process.env.PORT) || 3001
app.listen(port, () => console.log(`Storyweaver API listening on port ${port}`))
