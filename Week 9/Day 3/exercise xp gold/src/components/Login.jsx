import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser, setUser } from '../features/auth/authSlice.js'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault()
    const normalizedEmail = email.trim().toLowerCase()

    if (!normalizedEmail || !password) {
      setError('Enter your email and password to continue.')
      return
    }

    const emailName = normalizedEmail.split('@')[0].replace(/[._-]+/g, ' ')
    const displayName = emailName.replace(/\b\w/g, (letter) => letter.toUpperCase())

    dispatch(
      setUser({
        name: displayName || 'Member',
        email: normalizedEmail,
      }),
    )
    dispatch(loginUser())
    setPassword('')
    setError('')
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="email">Email address</label>
      <input
        id="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value)
          setError('')
        }}
        aria-describedby={error ? 'login-error' : undefined}
      />

      <div className="password-label">
        <label htmlFor="password">Password</label>
        <span>Any password works in this demo</span>
      </div>
      <input
        id="password"
        type="password"
        autoComplete="current-password"
        placeholder="Enter any password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value)
          setError('')
        }}
        aria-describedby={error ? 'login-error' : undefined}
      />

      {error && (
        <p className="form-error" id="login-error" role="alert">
          {error}
        </p>
      )}

      <button className="primary-button" type="submit">
        Continue to your space <span aria-hidden="true">→</span>
      </button>
      <p className="form-note">
        This exercise simulates sign-in locally. It doesn’t verify credentials
        or send them to a server.
      </p>
    </form>
  )
}

export default Login
