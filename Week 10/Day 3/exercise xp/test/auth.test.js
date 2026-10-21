import { after, before, test } from 'node:test'
import assert from 'node:assert/strict'
import request from 'supertest'
import { createApp } from '../src/app.js'
import { createDatabase } from '../src/db.js'

const config = {
  accessTokenSecret: 'test-access-secret-value-with-at-least-32-characters',
  refreshTokenSecret: 'test-refresh-secret-value-with-at-least-32-characters',
  isProduction: false,
}

let database
let app
let agent
let accessToken
let originalRefreshToken

const credentials = {
  username: 'reader_01',
  password: 'A-secure-passphrase-123',
}

before(() => {
  database = createDatabase(':memory:')
  app = createApp(database, config)
  agent = request.agent(app)
})

after(() => {
  database.close()
})

test('registration validates input, hashes password, and issues HttpOnly refresh cookie', async () => {
  const invalid = await request(app).post('/api/auth/register').send({
    username: 'ab',
    password: 'short',
  })
  assert.equal(invalid.status, 400)

  const response = await agent.post('/api/auth/register').send(credentials)
  assert.equal(response.status, 201)
  assert.equal(response.body.user.username, credentials.username)
  assert.equal(typeof response.body.accessToken, 'string')
  assert.match(response.headers['set-cookie'][0], /HttpOnly/i)
  originalRefreshToken = response.headers['set-cookie'][0].match(/refreshToken=([^;]+)/)?.[1]
  assert.ok(originalRefreshToken)
  assert.notEqual(
    database.prepare('SELECT password_hash FROM users WHERE username = ?')
      .get(credentials.username).password_hash,
    credentials.password,
  )
  accessToken = response.body.accessToken
})

test('login rejects incorrect passwords without revealing whether user exists', async () => {
  const response = await request(app).post('/api/auth/login').send({
    username: credentials.username,
    password: 'Wrong-password-123!',
  })

  assert.equal(response.status, 401)
  assert.equal(response.body.error, 'Invalid username or password.')
})

test('protected profile route requires an access token and allows profile update', async () => {
  const unauthorized = await request(app).get('/api/auth/me')
  assert.equal(unauthorized.status, 401)

  const current = await request(app)
    .get('/api/auth/me')
    .set('Authorization', `Bearer ${accessToken}`)
  assert.equal(current.status, 200)
  assert.equal(current.body.user.name, credentials.username)

  const updated = await request(app)
    .patch('/api/auth/me')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({ name: 'Avid Reader', bio: 'One chapter at a time.' })
  assert.equal(updated.status, 200)
  assert.equal(updated.body.user.name, 'Avid Reader')
})

test('refresh rotates cookie token and rejects reuse of the previous token', async () => {
  const refreshed = await agent.post('/api/auth/refresh')
  assert.equal(refreshed.status, 200)
  assert.notEqual(refreshed.body.accessToken, accessToken)

  const replay = await request(app)
    .post('/api/auth/refresh')
    .set('Cookie', `refreshToken=${originalRefreshToken}`)
  assert.equal(replay.status, 401)
})

test('logout revokes refresh session and clears cookie', async () => {
  const logout = await agent.post('/api/auth/logout')
  assert.equal(logout.status, 204)
  assert.match(logout.headers['set-cookie'][0], /refreshToken=;/)

  const refresh = await agent.post('/api/auth/refresh')
  assert.equal(refresh.status, 401)
})

test('duplicate registration returns a conflict', async () => {
  const response = await request(app).post('/api/auth/register').send(credentials)
  assert.equal(response.status, 409)
})
