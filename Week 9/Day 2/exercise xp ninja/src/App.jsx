import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  addTodo,
  authAnonymous,
  authChecking,
  authFailure,
  authRequest,
  clearTodosError,
  loginSuccess,
  logout,
  registerSuccess,
  removeTodo,
  toggleTodo,
} from './redux/actions.js'
import { authService } from './redux/authService.js'
import './App.css'

const filters = ['all', 'active', 'completed']

function App({
  auth,
  todos,
  todosError,
  onAuthChecking,
  onAuthRequest,
  onAuthFailure,
  onAuthAnonymous,
  onLoginSuccess,
  onRegisterSuccess,
  onLogout,
  onAddTodo,
  onToggleTodo,
  onRemoveTodo,
  onClearTodosError,
}) {
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    onAuthChecking()
    try {
      const session = authService.getCurrentSession()
      if (session) onLoginSuccess(session)
      else onAuthAnonymous()
    } catch (error) {
      onAuthFailure(error instanceof Error ? error.message : 'Your saved session could not be restored.')
    }
  }, [onAuthChecking, onAuthAnonymous, onAuthFailure, onLoginSuccess])

  async function handleLogin(credentials) {
    onAuthRequest()
    try {
      onLoginSuccess(await authService.login(credentials))
    } catch (error) {
      onAuthFailure(error instanceof Error ? error.message : 'Could not sign in. Please try again.')
    }
  }

  async function handleRegister(details) {
    onAuthRequest()
    try {
      onRegisterSuccess(await authService.register(details))
    } catch (error) {
      onAuthFailure(error instanceof Error ? error.message : 'Could not create your account. Please try again.')
    }
  }

  function handleLogout() {
    try {
      authService.logout()
      onLogout()
    } catch (error) {
      onAuthFailure(error instanceof Error ? error.message : 'Could not sign out. Please try again.')
    }
  }

  if (auth.status === 'checking') {
    return (
      <main className="loading-screen" aria-live="polite">
        <span className="brand-mark">l.</span>
        <p>Getting your little list ready...</p>
      </main>
    )
  }

  if (auth.status !== 'authenticated') {
    return (
      <AuthScreen
        busy={auth.status === 'submitting'}
        error={auth.error}
        onClearError={() => onAuthFailure('')}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    )
  }

  const completedCount = todos.filter((todo) => todo.completed).length
  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })
  const greetingName = auth.user.name.split(' ')[0]

  function handleAddTodo(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const text = formData.get('todo')
    if (typeof text === 'string' && text.trim()) {
      onAddTodo(text.trim())
      event.currentTarget.reset()
    }
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Little List home">
          <span className="brand-mark" aria-hidden="true">l.</span>
          <span>little list</span>
        </a>
        <div className="account-menu">
          <div className="account-copy">
            <span className="account-greeting">YOUR PERSONAL SPACE</span>
            <span className="account-name">{auth.user.name}</span>
          </div>
          <button className="signout-button" type="button" onClick={handleLogout}>Sign out</button>
        </div>
      </header>

      <section className="todo-card" aria-labelledby="page-title">
        <div className="card-heading">
          <div>
            <p className="eyebrow">A little progress goes a long way</p>
            <h1 id="page-title">Good things,<br /><span>{greetingName}.</span></h1>
          </div>
          <div className="progress-badge" aria-label={`${completedCount} of ${todos.length} tasks complete`}>
            <span className="progress-number">{String(completedCount).padStart(2, '0')}</span>
            <span className="progress-divider" />
            <span className="progress-total">{String(todos.length).padStart(2, '0')}</span>
            <span className="progress-caption">DONE</span>
          </div>
        </div>

        {auth.error && (
          <p className="notice notice-error" role="alert">
            {auth.error}
            <button type="button" onClick={() => onAuthFailure('')}>Dismiss</button>
          </p>
        )}
        {todosError && (
          <p className="notice notice-error" role="alert">
            {todosError}
            <button type="button" onClick={onClearTodosError}>Dismiss</button>
          </p>
        )}

        <form className="add-form" onSubmit={handleAddTodo}>
          <label className="visually-hidden" htmlFor="new-todo">Add a task</label>
          <span className="add-icon" aria-hidden="true">+</span>
          <input id="new-todo" name="todo" type="text" placeholder="Add something to your list..." maxLength={120} />
          <button type="submit">Add task <span aria-hidden="true">↗</span></button>
        </form>

        <div className="list-toolbar">
          <h2>Your tasks <span>{todos.length}</span></h2>
          <div className="filter-list" aria-label="Filter tasks">
            {filters.map((filterOption) => (
              <button
                key={filterOption}
                className={filter === filterOption ? 'filter-button is-selected' : 'filter-button'}
                type="button"
                aria-pressed={filter === filterOption}
                onClick={() => setFilter(filterOption)}
              >
                {filterOption}
              </button>
            ))}
          </div>
        </div>

        {visibleTodos.length > 0 ? (
          <ul className="todo-list">
            {visibleTodos.map((todo) => (
              <li className={todo.completed ? 'todo-row is-complete' : 'todo-row'} key={todo.id}>
                <button
                  className="toggle-button"
                  type="button"
                  aria-label={todo.completed ? `Mark ${todo.text} as active` : `Complete ${todo.text}`}
                  aria-pressed={todo.completed}
                  onClick={() => onToggleTodo(todo.id)}
                >
                  {todo.completed && <span aria-hidden="true">✓</span>}
                </button>
                <span className="todo-text">{todo.text}</span>
                <button className="remove-button" type="button" aria-label={`Remove ${todo.text}`} onClick={() => onRemoveTodo(todo.id)}>
                  <span aria-hidden="true">×</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state" role="status">
            <span className="empty-mark" aria-hidden="true">✓</span>
            <p>{todos.length === 0 ? 'Your list is a blank page.' : `No ${filter} tasks right now.`}</p>
            <span>{todos.length === 0 ? 'Add a task above to get started.' : 'Try another filter to see your tasks.'}</span>
          </div>
        )}

        <footer className="card-footer">
          <span>ONE THING AT A TIME</span>
          <span>YOU’VE GOT THIS <span className="footer-sparkle" aria-hidden="true">✳</span></span>
        </footer>
      </section>

      <p className="page-note">Your tasks are yours alone. Make today count.</p>
    </main>
  )
}

function AuthScreen({ busy, error, onClearError, onLogin, onRegister }) {
  const [mode, setMode] = useState('login')
  const [localError, setLocalError] = useState('')
  const isRegistering = mode === 'register'

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const password = String(formData.get('password') || '')
    const confirmation = String(formData.get('confirmation') || '')
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    let validationError = ''

    if (isRegistering && !name) validationError = 'Please enter your name.'
    else if (!emailPattern.test(email)) validationError = 'Enter a valid email address.'
    else if (password.length < 8) validationError = 'Your password must be at least 8 characters.'
    else if (isRegistering && password !== confirmation) validationError = 'Those passwords do not match.'

    if (validationError) {
      setLocalError(validationError)
      return
    }

    setLocalError('')
    if (isRegistering) onRegister({ name, email, password })
    else onLogin({ email, password })
  }

  function switchMode(nextMode) {
    setMode(nextMode)
    setLocalError('')
    onClearError()
  }

  return (
    <main className="auth-layout">
      <section className="welcome-panel" aria-label="Little List introduction">
        <a className="brand welcome-brand" href="#home">
          <span className="brand-mark" aria-hidden="true">l.</span>
          <span>little list</span>
        </a>
        <div className="welcome-message">
          <p className="eyebrow">A softer way to get things done</p>
          <h1>Small steps.<br /><span>Lovely things.</span></h1>
          <p className="welcome-description">A quiet corner for all the things you want to do. Pick up right where you left off, whenever you’re ready.</p>
        </div>
        <div className="welcome-bottom">
          <span className="welcome-stamp" aria-hidden="true">✳</span>
          <span>YOUR DAY, AT YOUR PACE</span>
        </div>
        <span className="welcome-orb welcome-orb-one" aria-hidden="true" />
        <span className="welcome-orb welcome-orb-two" aria-hidden="true" />
      </section>

      <section className="auth-panel" aria-labelledby="auth-title">
        <div className="auth-form-wrap">
          <div className="auth-mobile-brand">
            <span className="brand-mark" aria-hidden="true">l.</span>
            <span>little list</span>
          </div>
          <p className="eyebrow">{isRegistering ? 'YOUR OWN LITTLE SPACE' : 'WELCOME BACK'}</p>
          <h2 id="auth-title">{isRegistering ? 'Let’s make it yours.' : 'Good to see you.'}</h2>
          <p className="auth-subtitle">
            {isRegistering ? 'Create an account and start fresh.' : 'Sign in to pick up where you left off.'}
          </p>

          {(localError || error) && <p className="notice notice-error auth-error" role="alert">{localError || error}</p>}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {isRegistering && (
              <label className="field-label" htmlFor="auth-name">
                Your name
                <input id="auth-name" name="name" type="text" autoComplete="name" maxLength={60} required />
              </label>
            )}
            <label className="field-label" htmlFor="auth-email">
              Email address
              <input id="auth-email" name="email" type="email" autoComplete="email" required />
            </label>
            <label className="field-label" htmlFor="auth-password">
              Password
              <input
                id="auth-password"
                name="password"
                type="password"
                autoComplete={isRegistering ? 'new-password' : 'current-password'}
                minLength={8}
                required
              />
            </label>
            {isRegistering && (
              <label className="field-label" htmlFor="auth-confirmation">
                Confirm password
                <input id="auth-confirmation" name="confirmation" type="password" autoComplete="new-password" required />
              </label>
            )}
            <button className="auth-submit" type="submit" disabled={busy}>
              {busy ? 'Just a moment...' : isRegistering ? 'Create my account' : 'Sign in'}
              {!busy && <span aria-hidden="true">↗</span>}
            </button>
          </form>

          <p className="auth-switch">
            {isRegistering ? 'Already have an account?' : 'New to little list?'}
            <button type="button" disabled={busy} onClick={() => switchMode(isRegistering ? 'login' : 'register')}>
              {isRegistering ? 'Sign in' : 'Create an account'}
            </button>
          </p>
          <p className="auth-footnote">A little space that’s just for you.</p>
        </div>
      </section>
    </main>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  todos: state.todos.items,
  todosError: state.todos.error,
})

const mapDispatchToProps = (dispatch) => ({
  onAuthChecking: () => dispatch(authChecking()),
  onAuthRequest: () => dispatch(authRequest()),
  onAuthFailure: (message) => dispatch(authFailure(message)),
  onAuthAnonymous: () => dispatch(authAnonymous()),
  onLoginSuccess: (session) => dispatch(loginSuccess(session)),
  onRegisterSuccess: (session) => dispatch(registerSuccess(session)),
  onLogout: () => dispatch(logout()),
  onAddTodo: (text) => dispatch(addTodo(text)),
  onToggleTodo: (id) => dispatch(toggleTodo(id)),
  onRemoveTodo: (id) => dispatch(removeTodo(id)),
  onClearTodosError: () => dispatch(clearTodosError()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
