import type { Request, Response } from 'express'
import { AppError } from '../helpers/AppError'
import { createShareLink, getProfile, getSharedStory, getVersion, getVersions } from '../models/advancedModel'
import { getStory, isStoryAuthor, updateStory } from '../models/storiesModel'
function id(value: unknown, label: string) { const parsed = Number(value); if (!Number.isSafeInteger(parsed) || parsed < 1) throw new AppError(400, `Enter a valid ${label}.`); return parsed }
export async function versions(req: Request, res: Response) { const storyId = id(req.params.story_id, 'story ID'); if (!(await isStoryAuthor(storyId, req.user!.id))) throw new AppError(403, 'Only the story author can view versions.'); res.json(await getVersions(storyId)) }
export async function restore(req: Request, res: Response) { const version = await getVersion(id(req.params.id, 'version ID')); if (!version || !(await isStoryAuthor(version.story_id, req.user!.id))) throw new AppError(403, 'Only the story author can restore versions.'); res.json(await updateStory(version.story_id, version.title, version.content)) }
export async function profile(req: Request, res: Response) { res.json(await getProfile(req.user!.id)) }
export async function share(req: Request, res: Response) { const storyId = id(req.body?.story_id, 'story ID'); if (!(await getStory(storyId))) throw new AppError(404, 'Story not found.'); res.status(201).json({ token: await createShareLink(storyId) }) }
export async function shared(req: Request, res: Response) { const token = typeof req.params.token === 'string' ? req.params.token : ''; const story = await getSharedStory(token); if (!story) throw new AppError(404, 'Share link not found.'); res.json(story) }
