import { useEffect, useState } from 'react'

interface User {
  id: number
  name: string
  email: string
  website: string
}

function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchUsers() {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users',
          { signal: controller.signal },
        )

        if (!response.ok) {
          throw new Error(`Could not load users (HTTP ${response.status}).`)
        }

        const data: User[] = await response.json()
        setUsers(data)
      } catch (fetchError: unknown) {
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          return
        }
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : 'An unexpected error occurred while loading users.',
        )
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void fetchUsers()
    return () => controller.abort()
  }, [])

  if (isLoading) {
    return <p className="loading-message" role="status">Loading users…</p>
  }

  if (error) {
    return <p className="error-message" role="alert">{error}</p>
  }

  return (
    <div className="user-list">
      {users.map((user) => (
        <article className="user-list-item" key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <a href={`https://${user.website}`} target="_blank" rel="noreferrer">
            {user.website}
          </a>
        </article>
      ))}
    </div>
  )
}

export default UserList
