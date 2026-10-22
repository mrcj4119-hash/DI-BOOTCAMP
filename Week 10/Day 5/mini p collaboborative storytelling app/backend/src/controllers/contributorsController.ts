import type { Request, Response } from 'express'
import { AppError } from '../helpers/AppError'
import { addContributor, getContributorStoryId, getContributors, removeContributor } from '../models/contributorsModel'
import { isStoryAuthor } from '../models/storiesModel'
import { findUserByEmail, findUserById } from '../models/authModel'

function positiveId(value: unknown, label: string): number {
  const id = Number(value)
  if (!Number.isSafeInteger(id) || id < 1) throw new AppError(400, `Enter a valid ${label}.`)
  return id
}

export async function list(req: Request, res: Response) {
  res.json(await getContributors(positiveId(req.params.story_id, 'story ID')))
}

export async function add(req: Request, res: Response) {
  const storyId = positiveId(req.body?.story_id, 'story ID')
  const userId = req.body?.user_id === undefined
    ? undefined
    : positiveId(req.body.user_id, 'user ID')
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : ''
  if (!userId && !email) throw new AppError(400, 'A user ID or email is required.')
  if (!(await isStoryAuthor(storyId, req.user!.id))) throw new AppError(403, 'Only the story author can invite contributors.')
  const user = userId ? await findUserById(userId) : await findUserByEmail(email)
  if (!user) throw new AppError(404, 'That user could not be found.')
  if (user.id === req.user!.id) throw new AppError(400, 'You are already the author of this story.')
  await addContributor(storyId, user.id)
  res.status(201).json({ message: 'Contributor added.' })
}

export async function remove(req: Request, res: Response) {
  const contributorId = positiveId(req.params.id, 'contributor ID')
  const storyId = await getContributorStoryId(contributorId)
  if (!storyId) throw new AppError(404, 'Contributor not found.')
  if (!(await isStoryAuthor(storyId, req.user!.id))) throw new AppError(403, 'Only the story author can remove contributors.')
  await removeContributor(contributorId)
  res.status(204).end()
}
