import { useDataFetching } from '../hooks/useDataFetching'

interface User {
  id: number
  name: string
  email: string
  website: string
  company: { name: string }
}

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'
const CACHE_MAX_AGE = 5 * 60 * 1000

function UserList() {
  const { data, isLoading, error, refetch, invalidateCache } =
    useDataFetching<User[]>(USERS_URL, { maxAge: CACHE_MAX_AGE })

  const clearCacheAndRefresh = () => {
    invalidateCache()
    void refetch()
  }

  return (
    <>
      <div className="table-actions">
        <button className="table-action" type="button" onClick={() => void refetch()}>
          Refresh
        </button>
        <button
          className="table-action secondary"
          type="button"
          onClick={clearCacheAndRefresh}
        >
          Clear Cache &amp; Refresh
        </button>
      </div>

      {isLoading && <p className="loading-message" role="status">Loading users…</p>}
      {error && (
        <div>
          <p className="error-message" role="alert">{error}</p>
          <button className="table-action" type="button" onClick={() => void refetch()}>
            Retry
          </button>
        </div>
      )}
      {!isLoading && !error && data && (
        <div className="user-list">
          {data.map((user) => (
            <article className="user-list-item" key={user.id}>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <p>{user.company.name}</p>
              <a href={`https://${user.website}`} target="_blank" rel="noreferrer">
                {user.website}
              </a>
            </article>
          ))}
        </div>
      )}
      {!isLoading && !error && data?.length === 0 && (
        <p className="empty-message">No users found.</p>
      )}
    </>
  )
}

export default UserList
