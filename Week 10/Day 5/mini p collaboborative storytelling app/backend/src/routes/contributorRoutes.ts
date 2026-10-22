import { Router } from 'express'
import { add, list, remove } from '../controllers/contributorsController'
import { authenticateToken } from '../middleware/auth'

const router = Router()
router.use(authenticateToken)
router.post('/', add)
router.get('/:story_id', list)
router.delete('/:id', remove)

export default router
