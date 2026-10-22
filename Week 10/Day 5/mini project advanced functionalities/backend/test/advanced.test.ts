import test, { before, after } from 'node:test'
import assert from 'node:assert/strict'
import { rmSync } from 'node:fs'

process.env.SQLITE_PATH = 'data/test-advanced.sqlite'
let db: typeof import('../src/db')['db']

before(async () => { db = (await import('../src/db')).db })

test('advanced schema includes comments, reactions, versions, and share links', () => {
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type = 'table'").all() as Array<{ name: string }>
  for (const table of ['comments', 'reactions', 'versions', 'share_links']) assert.ok(tables.some((item) => item.name === table))
})

test('reaction uniqueness is per user and reaction', () => {
  db.prepare("INSERT OR IGNORE INTO users (username, email, password_hash) VALUES ('test', 'test@example.com', 'hash')").run()
  db.prepare("INSERT OR IGNORE INTO stories (title, content, author_id) VALUES ('Test', 'Body', 1)").run()
  db.prepare("INSERT OR IGNORE INTO comments (story_id, user_id, comment_text) VALUES (1, 1, 'Note')").run()
  db.prepare("INSERT OR IGNORE INTO reactions (comment_id, user_id, reaction) VALUES (1, 1, 'heart')").run()
  assert.throws(() => db.prepare("INSERT INTO reactions (comment_id, user_id, reaction) VALUES (1, 1, 'heart')").run())
})

after(() => { db.close(); rmSync('data/test-advanced.sqlite', { force: true }) })
