import { useEffect, useRef, useState } from 'react'
import { useTasks } from '../context/TaskContext.jsx'

function TaskItem({ task }) {
  const [isEditing, setIsEditing] = useState(false)
  const editInputRef = useRef(null)
  const { dispatch } = useTasks()

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus()
      editInputRef.current?.select()
    }
  }, [isEditing])

  function saveEdit(event) {
    event.preventDefault()
    const text = editInputRef.current?.value.trim()

    if (!text) {
      editInputRef.current?.focus()
      return
    }

    dispatch({ type: 'edited', id: task.id, text })
    setIsEditing(false)
  }

  function cancelEdit() {
    setIsEditing(false)
  }

  return (
    <li className={`task-item${task.completed ? ' is-completed' : ''}`}>
      <label className="task-check">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => dispatch({ type: 'toggled', id: task.id })}
          aria-label={`Mark "${task.text}" ${task.completed ? 'active' : 'completed'}`}
        />
        <span className="custom-checkbox" aria-hidden="true">
          {task.completed && '✓'}
        </span>
      </label>

      {isEditing ? (
        <form className="edit-form" onSubmit={saveEdit}>
          <label className="visually-hidden" htmlFor={`edit-${task.id}`}>
            Edit task
          </label>
          <input
            ref={editInputRef}
            id={`edit-${task.id}`}
            className="edit-input"
            type="text"
            defaultValue={task.text}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                cancelEdit()
              }
            }}
          />
          <button className="save-button" type="submit">Save</button>
          <button className="cancel-button" type="button" onClick={cancelEdit}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <span className="task-text">{task.text}</span>
          <div className="task-actions">
            <button
              className="edit-button"
              type="button"
              onClick={() => setIsEditing(true)}
              aria-label={`Edit "${task.text}"`}
            >
              Edit
            </button>
            <button
              className="remove-button"
              type="button"
              onClick={() => dispatch({ type: 'removed', id: task.id })}
              aria-label={`Remove "${task.text}"`}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </>
      )}
    </li>
  )
}

export default TaskItem
