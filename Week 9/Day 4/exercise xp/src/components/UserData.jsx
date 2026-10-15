import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserById } from '../features/users/usersSlice.js'

function UserData() {
  const dispatch = useDispatch()
  const { user, status, error } = useSelector((state) => state.users)
  const [userId, setUserId] = useState('1')

  useEffect(() => {
    dispatch(fetchUserById(1))
  }, [dispatch])

  function handleSubmit(event) {
    event.preventDefault()
    dispatch(fetchUserById(Number(userId)))
  }

  return (
    <section className="directory" aria-labelledby="directory-title" aria-busy={status === 'loading'}>
      <div className="directory-heading">
        <div>
          <p className="eyebrow">THE PEOPLE DIRECTORY</p>
          <h2 id="directory-title">Find a profile</h2>
          <p className="section-description">
            Fetch a user and watch Redux keep the page in sync.
          </p>
        </div>
        <span className="directory-count">10 profiles</span>
      </div>

      <form className="search-form" onSubmit={handleSubmit}>
        <label htmlFor="user-id">User ID</label>
        <div className="search-controls">
          <input
            id="user-id"
            name="userId"
            type="number"
            min="1"
            step="1"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
            required
          />
          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Loading…' : 'Find user'}
            <span aria-hidden="true">→</span>
          </button>
        </div>
        <p className="form-hint">Try IDs 1–10, or use 999 to see error handling.</p>
      </form>

      <div className="result-area" aria-live="polite">
        {status === 'loading' && (
          <div className="state-message">
            <span className="spinner" aria-hidden="true" />
            <p>Fetching profile…</p>
          </div>
        )}

        {status === 'failed' && (
          <div className="error-message" role="alert">
            <span className="message-icon" aria-hidden="true">!</span>
            <div>
              <h3>We couldn’t find that profile</h3>
              <p>{error}</p>
            </div>
          </div>
        )}

        {status === 'succeeded' && user && (
          <article className="profile-card">
            <div className="profile-avatar" aria-hidden="true">
              {user.name
                .split(' ')
                .map((part) => part[0])
                .slice(0, 2)
                .join('')}
            </div>
            <div className="profile-details">
              <p className="profile-label">PROFILE · #{user.id}</p>
              <h3>{user.name}</h3>
              <p className="profile-username">@{user.username}</p>
              <div className="profile-info">
                <a href={`mailto:${user.email}`}>
                  <span aria-hidden="true">✉</span>
                  {user.email}
                </a>
                <a href={`https://${user.website}`} target="_blank" rel="noreferrer">
                  <span aria-hidden="true">↗</span>
                  {user.website}
                </a>
                <p>
                  <span aria-hidden="true">⌖</span>
                  {user.address.city}
                </p>
              </div>
            </div>
            <div className="company-badge">
              <span>COMPANY</span>
              <strong>{user.company.name}</strong>
            </div>
          </article>
        )}

        {status === 'idle' && (
          <div className="state-message">
            <p>Enter a user ID to load a profile.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default UserData
