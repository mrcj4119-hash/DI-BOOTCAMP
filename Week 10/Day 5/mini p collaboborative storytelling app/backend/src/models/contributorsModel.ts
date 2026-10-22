import type { StoryContributor } from '../../../types/types'
import { database } from '../db/sqlite'
export async function getContributors(storyId: number): Promise<StoryContributor[]> { return database.prepare('SELECT c.id, u.id AS user_id, u.username FROM contributors c JOIN users u ON u.id = c.user_id WHERE c.story_id = ? ORDER BY u.username').all(storyId) as StoryContributor[] }
export async function addContributor(storyId: number, userId: number): Promise<void> { database.prepare('INSERT INTO contributors (story_id, user_id) VALUES (?, ?)').run(storyId, userId) }
export async function removeContributor(contributorId: number): Promise<number | undefined> { const result = database.prepare('DELETE FROM contributors WHERE id = ? RETURNING story_id').get(contributorId) as { story_id: number } | undefined; return result?.story_id }
export async function getContributorStoryId(contributorId: number): Promise<number | undefined> { const result = database.prepare('SELECT story_id FROM contributors WHERE id = ?').get(contributorId) as { story_id: number } | undefined; return result?.story_id }
