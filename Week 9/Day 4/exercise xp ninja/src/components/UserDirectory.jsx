import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addTodo,
  fetchUserById,
  fetchUsers,
  removeTodo,
  setSelectedUserId,
  toggleTodo,
} from '../features/users/usersSlice.js'

function UserDirectory() {
  const dispatch = useDispatch()
  const { users, selectedUser, selectedUserId, status, error, todos, todoStatus, todoError } =
    useSelector((state) => state.users)
  const [searchQuery, setSearchQuery] = useState('')
  const [todoInput, setTodoInput] = useState('')

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  useEffect(() => {
    if (selectedUserId) {
      dispatch(fetchUserById(selectedUserId))
    }
  }, [dispatch, selectedUserId])

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users

    return users.filter((user) => {
      const query = searchQuery.toLowerCase()
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.company.name.toLowerCase().includes(query)
      )
    })
  }, [searchQuery, users])

  function handleSelectUser(id) {
    dispatch(setSelectedUserId(id))
  }

  function handleAddTodo(event) {
    event.preventDefault()
    const trimmedValue = todoInput.trim()

    if (!trimmedValue || !selectedUser) return

    dispatch(addTodo(trimmedValue))
    setTodoInput('')
  }

  return (
    <section className="dashboard" aria-label="Team pulse dashboard">
      <div className="panel users-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">TEAM DIRECTORY</p>
            <h2>People</h2>
          </div>
          <span className="pill">{users.length} profiles</span>
        </div>

        <label className="search-field" htmlFor="user-search">
          Search users
        </label>
        <input
          id="user-search"
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Find a teammate"
        />

        <div className="user-list" aria-live="polite">
          {status === 'loading' && <p className="empty-state">Loading team members…</p>}

          {status === 'failed' && <p className="error-box">{error}</p>}

          {status === 'succeeded' &&
            filteredUsers.map((user) => (
              <button
                key={user.id}
                type="button"
                className={`user-card ${selectedUser?.id === user.id ? 'selected' : ''}`}
                onClick={() => handleSelectUser(user.id)}
              >
                <span className="avatar" aria-hidden="true">
                  {user.name
                    .split(' ')
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join('')}
                </span>
                <span className="user-meta">
                  <strong>{user.name}</strong>
                  <small>{user.company.name}</small>
                </span>
              </button>
            ))}
        </div>
      </div>

      <div className="panel detail-panel">
        {selectedUser ? (
          <>
            <div className="profile-header">
              <div>
                <p className="eyebrow">PROFILE</p>
                <h2>{selectedUser.name}</h2>
              </div>
              <span className="pill">User #{selectedUser.id}</span>
            </div>

            <div className="profile-card">
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Website:</strong> {selectedUser.website}
              </p>
              <p>
                <strong>Company:</strong> {selectedUser.company.name}
              </p>
              <p>
                <strong>Location:</strong> {selectedUser.address.city}
              </p>
            </div>

            <div className="todo-header">
              <h3>Tasks</h3>
              <span className="pill">{todos.length} open</span>
            </div>

            <form className="todo-form" onSubmit={handleAddTodo}>
              <input
                type="text"
                value={todoInput}
                onChange={(event) => setTodoInput(event.target.value)}
                placeholder="Add a task for this user"
                aria-label="Add a task for the selected user"
              />
              <button type="submit" disabled={todoStatus === 'loading'}>
                Add
              </button>
            </form>

            {todoStatus === 'failed' && <p className="error-box">{todoError}</p>}

            <ul className="todo-list">
              {todoStatus === 'loading' && <li className="empty-state">Loading tasks…</li>}

              {todos.length === 0 && todoStatus !== 'loading' && (
                <li className="empty-state">No tasks yet for this teammate.</li>
              )}

              {todos.map((todo) => (
                <li key={todo.id} className={`todo-item ${todo.completed ? 'done' : ''}`}>
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => dispatch(toggleTodo(todo.id))}
                    />
                    <span>{todo.title}</span>
                  </label>
                  <button type="button" onClick={() => dispatch(removeTodo(todo.id))}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="empty-state">Choose a user to view their details.</p>
        )}
      </div>
    </section>
  )
}

export default UserDirectory
