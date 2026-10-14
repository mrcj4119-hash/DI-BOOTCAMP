import { useState } from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem.jsx'

const filters = ['all', 'active', 'completed']

function TodoList() {
  const [filter, setFilter] = useState('all')
  const todos = useSelector((state) => state.todos.items)
  const remainingCount = todos.filter((todo) => !todo.completed).length
  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <section className="list-card" aria-labelledby="list-heading">
      <div className="list-header">
        <div>
          <p className="eyebrow">YOUR CHECKLIST</p>
          <h2 id="list-heading">Today’s tasks</h2>
        </div>
        <span className="task-count" aria-live="polite">
          {remainingCount} left
        </span>
      </div>

      <div className="filters" aria-label="Filter tasks">
        {filters.map((option) => (
          <button
            key={option}
            className={filter === option ? 'filter-button is-selected' : 'filter-button'}
            type="button"
            aria-pressed={filter === option}
            onClick={() => setFilter(option)}
          >
            {option[0].toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>

      {visibleTodos.length > 0 ? (
        <ul className="todo-list">
          {visibleTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">
            {todos.length === 0 ? '✳' : '✓'}
          </span>
          <p>
            {todos.length === 0
              ? 'Your list is a blank page.'
              : `No ${filter} tasks right now.`}
          </p>
          <span>
            {todos.length === 0
              ? 'Add a task above and make today your own.'
              : 'Try another filter to see the rest of your list.'}
          </span>
        </div>
      )}
    </section>
  )
}

export default TodoList
