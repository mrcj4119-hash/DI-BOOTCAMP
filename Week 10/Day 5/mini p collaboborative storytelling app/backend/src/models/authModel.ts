import type { User } from '../../../types/types'
import { database } from '../db/sqlite'

interface UserWithPassword extends User { password_hash: string }
export async function findUserByEmail(email: string): Promise<UserWithPassword | undefined> { return database.prepare('SELECT id, username, email, password_hash FROM users WHERE email = ?').get(email) as UserWithPassword | undefined }
export async function findUserById(id: number): Promise<User | undefined> { return database.prepare('SELECT id, username, email FROM users WHERE id = ?').get(id) as User | undefined }
export async function createUser(username: string, email: string, passwordHash: string): Promise<User> {
  const result = database.prepare('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)').run(username, email, passwordHash)
  return (await findUserById(Number(result.lastInsertRowid)))!
}
