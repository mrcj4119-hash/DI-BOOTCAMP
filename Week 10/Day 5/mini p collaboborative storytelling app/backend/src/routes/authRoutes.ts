import { Router } from 'express'
import { currentUser, login, logout, refresh, register } from '../controllers/authController'
import { authenticateToken } from '../middleware/auth'

const router = Router()
router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refresh)
router.post('/logout', logout)
router.get('/me', authenticateToken, currentUser)

export default router
