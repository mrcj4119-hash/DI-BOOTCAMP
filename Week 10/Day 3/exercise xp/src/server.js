import { createApp } from './app.js'
import { loadConfig } from './config.js'
import { createDatabase } from './db.js'

const config = loadConfig()
const database = createDatabase(process.env.DATABASE_PATH ?? './data/auth.sqlite')
const app = createApp(database, config)

const server = app.listen(config.port, () => {
  console.log(`Authentication API listening on http://localhost:${config.port}`)
})

function shutDown() {
  server.close(() => {
    database.close()
    process.exit(0)
  })
}

process.on('SIGINT', shutDown)
process.on('SIGTERM', shutDown)
