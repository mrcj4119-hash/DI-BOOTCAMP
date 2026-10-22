import type { Story } from '../../../types/types'
import { database } from '../db/sqlite'

interface StoryRow { id: number; title: string; content: string; author_id: number; author: string; created_at: string; updated_at: string }
function withContributors(row: StoryRow): Story {
  const contributors = database.prepare('SELECT c.id, u.id AS user_id, u.username FROM contributors c JOIN users u ON u.id = c.user_id WHERE c.story_id = ? ORDER BY u.username').all(row.id)
  return { ...row, contributors } as Story
}
export async function getStories(): Promise<Story[]> { const rows = database.prepare('SELECT s.id, s.title, s.content, s.author_id, s.created_at, s.updated_at, u.username AS author FROM stories s JOIN users u ON u.id = s.author_id ORDER BY s.updated_at DESC').all() as StoryRow[]; return rows.map(withContributors) }
export async function getStory(id: number): Promise<Story | undefined> { const row = database.prepare('SELECT s.id, s.title, s.content, s.author_id, s.created_at, s.updated_at, u.username AS author FROM stories s JOIN users u ON u.id = s.author_id WHERE s.id = ?').get(id) as StoryRow | undefined; return row ? withContributors(row) : undefined }
export async function createStory(title: string, content: string, authorId: number): Promise<Story> { const result = database.prepare('INSERT INTO stories (title, content, author_id) VALUES (?, ?, ?)').run(title, content, authorId); return (await getStory(Number(result.lastInsertRowid)))! }
export async function updateStory(id: number, title: string, content: string): Promise<Story | undefined> { const current = await getStory(id); if (current) database.prepare('INSERT INTO versions (story_id, title, content) VALUES (?, ?, ?)').run(id, current.title, current.content); const result = database.prepare('UPDATE stories SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(title, content, id); return result.changes ? getStory(id) : undefined }
export async function deleteStory(id: number): Promise<boolean> { return database.prepare('DELETE FROM stories WHERE id = ?').run(id).changes === 1 }
export async function canEditStory(storyId: number, userId: number): Promise<boolean> { return Boolean(database.prepare('SELECT 1 FROM stories WHERE id = ? AND (author_id = ? OR EXISTS (SELECT 1 FROM contributors WHERE story_id = ? AND user_id = ?))').get(storyId, userId, storyId, userId)) }
export async function isStoryAuthor(storyId: number, userId: number): Promise<boolean> { return Boolean(database.prepare('SELECT 1 FROM stories WHERE id = ? AND author_id = ?').get(storyId, userId)) }
export async function areCommentsEnabled(storyId: number): Promise<boolean> { const row = database.prepare('SELECT comments_enabled FROM stories WHERE id = ?').get(storyId) as { comments_enabled: number } | undefined; return row?.comments_enabled !== 0 }
export async function setCommentsEnabled(storyId: number, enabled: boolean): Promise<void> { database.prepare('UPDATE stories SET comments_enabled = ? WHERE id = ?').run(enabled ? 1 : 0, storyId) }
