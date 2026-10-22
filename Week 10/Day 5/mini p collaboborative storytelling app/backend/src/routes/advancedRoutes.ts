import { Router } from 'express'
import { profile, restore, share, shared, versions } from '../controllers/advancedController'
import { authenticateToken } from '../middleware/auth'
const router = Router()
router.get('/shared/:token', shared)
router.use(authenticateToken)
router.get('/profile', profile)
router.post('/share', share)
router.get('/versions/:story_id', versions)
router.post('/versions/:id/restore', restore)
export default router
