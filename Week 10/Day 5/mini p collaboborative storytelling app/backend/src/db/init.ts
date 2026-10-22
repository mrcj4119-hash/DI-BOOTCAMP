import { initializeSqlite } from './sqlite'

try {
  initializeSqlite()
  console.log('SQLite database tables are ready.')
} catch (error) {
  console.error('Could not initialize the SQLite database:', error instanceof Error ? error.message : error)
  process.exitCode = 1
}
