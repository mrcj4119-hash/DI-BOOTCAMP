const USERS_KEY = 'little-list-auth-users'
const SESSION_KEY = 'little-list-auth-session'
const TODOS_KEY_PREFIX = 'little-list-todos:'

function readJson(key, fallback) {
  const value = localStorage.getItem(key)
  if (value === null) return fallback

  try {
    return JSON.parse(value)
  } catch {
    throw new Error('Saved browser data could not be read. Clear this app’s site data and try again.')
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    throw new Error('Your browser could not save this data. Check available storage and try again.')
  }
}

function getUsers() {
  const users = readJson(USERS_KEY, [])
  if (!Array.isArray(users)) {
    throw new Error('Saved account data is invalid. Clear this app’s site data and try again.')
  }
  return users
}

async function hashPassword(password) {
  const encoded = new TextEncoder().encode(password)
  const digest = await globalThis.crypto.subtle.digest('SHA-256', encoded)
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function createSession(user) {
  const todos = loadTodos(user.id)
  const session = {
    token: globalThis.crypto.randomUUID(),
    user: { id: user.id, name: user.name, email: user.email },
  }
  writeJson(SESSION_KEY, { token: session.token, userId: user.id })
  return { ...session, todos }
}

function loadTodos(userId) {
  const todos = readJson(`${TODOS_KEY_PREFIX}${userId}`, [])
  if (!Array.isArray(todos) || todos.some((todo) => (
    typeof todo?.id !== 'string'
    || typeof todo?.text !== 'string'
    || typeof todo?.completed !== 'boolean'
  ))) {
    throw new Error('Saved tasks could not be read. Clear this app’s saved task data and try again.')
  }
  return todos
}

export const authService = {
  async register({ name, email, password }) {
    const normalizedEmail = email.trim().toLowerCase()
    const users = getUsers()

    if (users.some((user) => user.email === normalizedEmail)) {
      throw new Error('An account with this email already exists. Try logging in instead.')
    }

    const user = {
      id: globalThis.crypto.randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: await hashPassword(password),
    }

    writeJson(USERS_KEY, [...users, user])
    return createSession(user)
  },

  async login({ email, password }) {
    const normalizedEmail = email.trim().toLowerCase()
    const user = getUsers().find((account) => account.email === normalizedEmail)
    const passwordHash = await hashPassword(password)

    if (!user || user.passwordHash !== passwordHash) {
      throw new Error('Email or password is incorrect.')
    }

    return createSession(user)
  },

  getCurrentSession() {
    const savedSession = readJson(SESSION_KEY, null)
    if (savedSession === null) return null
    if (typeof savedSession?.token !== 'string' || typeof savedSession?.userId !== 'string') {
      throw new Error('Your saved session is invalid. Please sign in again.')
    }

    const user = getUsers().find((account) => account.id === savedSession.userId)
    if (!user) {
      throw new Error('Your saved account could not be found. Please sign in again.')
    }

    return {
      token: savedSession.token,
      user: { id: user.id, name: user.name, email: user.email },
      todos: loadTodos(user.id),
    }
  },

  logout() {
    try {
      localStorage.removeItem(SESSION_KEY)
    } catch {
      throw new Error('Your session could not be cleared. Please try signing out again.')
    }
  },

  saveTodos(userId, todos) {
    writeJson(`${TODOS_KEY_PREFIX}${userId}`, todos)
  },
}
