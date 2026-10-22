import { Router } from 'express'
import { create, listStories, remove, showStory, update } from '../controllers/storiesController'
import { authenticateToken } from '../middleware/auth'

const router = Router()
router.use(authenticateToken)
router.get('/', listStories)
router.post('/', create)
router.get('/:id', showStory)
router.patch('/:id', update)
router.delete('/:id', remove)

export default router
