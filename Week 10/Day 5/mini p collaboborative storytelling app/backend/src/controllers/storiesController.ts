import type { Request, Response } from 'express'
import { AppError } from '../helpers/AppError'
import { canEditStory, createStory, deleteStory, getStories, getStory, isStoryAuthor, updateStory } from '../models/storiesModel'
import { broadcastStoryUpdate } from '../realtime'

function readId(rawId: string | string[] | undefined): number {
  if (typeof rawId !== 'string') throw new AppError(400, 'Enter a valid story ID.')
  const id = Number(rawId)
  if (!Number.isSafeInteger(id) || id < 1) throw new AppError(400, 'Enter a valid story ID.')
  return id
}

function readStoryFields(body: unknown) {
  const values = body && typeof body === 'object' ? body as Record<string, unknown> : {}
  const title = typeof values.title === 'string' ? values.title.trim() : ''
  const content = typeof values.content === 'string' ? values.content.trim() : ''
  if (!title || !content) throw new AppError(400, 'A title and story text are required.')
  if (title.length > 255) throw new AppError(400, 'Title must be 255 characters or fewer.')
  if (content.length > 50000) throw new AppError(400, 'Story text must be 50,000 characters or fewer.')
  return { title, content }
}

export async function listStories(_req: Request, res: Response) {
  res.json(await getStories())
}

export async function showStory(req: Request, res: Response) {
  const story = await getStory(readId(req.params.id))
  if (!story) throw new AppError(404, 'Story not found.')
  broadcastStoryUpdate(story)
  res.json(story)
}

export async function create(req: Request, res: Response) {
  const { title, content } = readStoryFields(req.body)
  const story = await createStory(title, content, req.user!.id)
  res.status(201).json(story)
}

export async function update(req: Request, res: Response) {
  const id = readId(req.params.id)
  if (!(await canEditStory(id, req.user!.id))) throw new AppError(403, 'You do not have permission to edit this story.')
  const { title, content } = readStoryFields(req.body)
  const story = await updateStory(id, title, content)
  if (!story) throw new AppError(404, 'Story not found.')
  res.json(story)
}

export async function remove(req: Request, res: Response) {
  const id = readId(req.params.id)
  if (!(await isStoryAuthor(id, req.user!.id))) throw new AppError(403, 'Only the story author can delete it.')
  await deleteStory(id)
  res.status(204).end()
}
