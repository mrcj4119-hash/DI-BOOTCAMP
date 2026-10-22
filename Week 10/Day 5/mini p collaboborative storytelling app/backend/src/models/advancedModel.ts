import crypto from 'node:crypto'
import { database } from '../db/sqlite'
import type { Story, User, StoryVersion } from '../../../types/types'
export async function getVersions(storyId: number): Promise<StoryVersion[]> { return database.prepare('SELECT id, story_id, title, content, created_at FROM versions WHERE story_id = ? ORDER BY created_at DESC').all(storyId) as StoryVersion[] }
export async function getVersion(id: number): Promise<StoryVersion | undefined> { return database.prepare('SELECT id, story_id, title, content, created_at FROM versions WHERE id = ?').get(id) as StoryVersion | undefined }
export async function createShareLink(storyId: number) { const token = crypto.randomBytes(18).toString('base64url'); database.prepare('INSERT INTO share_links (story_id, token) VALUES (?, ?)').run(storyId, token); return token }
export async function getSharedStory(token: string): Promise<Story | undefined> { const row = database.prepare('SELECT s.* FROM stories s JOIN share_links l ON l.story_id = s.id WHERE l.token = ?').get(token) as Story | undefined; return row }
export async function getProfile(userId: number) { return database.prepare('SELECT u.id, u.username, u.email, (SELECT COUNT(*) FROM stories WHERE author_id = u.id) AS stories_created, (SELECT COUNT(*) FROM contributors WHERE user_id = u.id) AS stories_contributed FROM users u WHERE u.id = ?').get(userId) as User & { stories_created: number; stories_contributed: number } }
