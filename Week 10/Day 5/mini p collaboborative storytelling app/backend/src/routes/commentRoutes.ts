import { Router } from 'express'
import { add, list, react, remove, setCommenting, update } from '../controllers/commentsController'
import { authenticateToken } from '../middleware/auth'
const router = Router()
router.use(authenticateToken)
router.get('/:story_id', list)
router.post('/:story_id', add)
router.patch('/:id', update)
router.delete('/:id', remove)
router.post('/:id/reactions', react)
router.patch('/settings/:story_id', setCommenting)
export default router
