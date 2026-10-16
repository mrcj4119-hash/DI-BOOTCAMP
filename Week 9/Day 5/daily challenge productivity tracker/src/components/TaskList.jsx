import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCompletedTasks,
  selectTasksByCategory,
} from '../features/productivity/productivitySelectors.js'
import {
  addTask,
  deleteTask,
  editTask,
  updateTaskProgress,
} from '../features/productivity/productivitySlice.js'

function TaskList({ categoryId }) {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => selectTasksByCategory(state, categoryId))
  const completedCount = useSelector(selectCompletedTasks)
  const categories = useSelector((state) => state.productivity.categories)
  const [newTask, setNewTask] = useState('')
  const [newTaskCategory, setNewTaskCategory] = useState(categoryId !== 'all' && categoryId !== 'uncategorized' ? categoryId : '')
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [editedTitle, setEditedTitle] = useState('')
  const [editedCategoryId, setEditedCategoryId] = useState('')

  const handleToggle = useCallback((taskId) => {
    dispatch(updateTaskProgress(taskId))
  }, [dispatch])

  const handleDelete = useCallback((taskId) => {
    dispatch(deleteTask(taskId))
  }, [dispatch])

  const handleSubmit = (event) => {
    event.preventDefault()
    const title = newTask.trim()

    if (title) {
      dispatch(addTask({
        title,
        categoryId: categoryId !== 'all' && categoryId !== 'uncategorized'
          ? categoryId
          : newTaskCategory,
      }))
      setNewTask('')
    }
  }

  const beginEditing = (task) => {
    setEditingTaskId(task.id)
    setEditedTitle(task.title)
    setEditedCategoryId(task.categoryId ?? '')
  }

  const handleSaveEdit = (event) => {
    event.preventDefault()
    const title = editedTitle.trim()

    if (title && editingTaskId) {
      dispatch(editTask({ id: editingTaskId, title, categoryId: editedCategoryId }))
      setEditingTaskId(null)
    }
  }

  return (
    <section className="tasks-panel" aria-labelledby="tasks-heading">
      <div className="tasks-heading">
        <div>
          <p className="eyebrow">A CLEARER VIEW OF TODAY</p>
          <h2 id="tasks-heading">Your tasks</h2>
        </div>
        <span className="progress-count">
          <strong>{completedCount}</strong> completed
        </span>
      </div>

      <form className="add-task-form" onSubmit={handleSubmit}>
        <label className="visually-hidden" htmlFor="new-task">Add a task</label>
        <span className="add-task-icon" aria-hidden="true">+</span>
        <input
          id="new-task"
          maxLength={120}
          onChange={(event) => setNewTask(event.target.value)}
          placeholder="What would you like to get done?"
          value={newTask}
        />
        {(categoryId === 'all' || categoryId === 'uncategorized') && (
          <select
            aria-label="Task category"
            onChange={(event) => setNewTaskCategory(event.target.value)}
            value={newTaskCategory}
          >
            <option value="">Uncategorized</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        )}
        <button disabled={!newTask.trim()} type="submit">Add task</button>
      </form>

      {tasks.length === 0 ? (
        <div className="empty-tasks" aria-live="polite">
          <span aria-hidden="true">✳</span>
          <p>Nothing on this list yet.</p>
          <span>Add a task to give your day a starting point.</span>
        </div>
      ) : (
        <ul className="task-list" aria-live="polite">
          {tasks.map((task) => {
            const category = categories.find((item) => item.id === task.categoryId)

            return (
              <li className={`task-row${task.completed ? ' task-complete' : ''}`} key={task.id}>
                {editingTaskId === task.id ? (
                  <form className="edit-task-form" onSubmit={handleSaveEdit}>
                    <label className="visually-hidden" htmlFor={`edit-${task.id}`}>Edit task title</label>
                    <input
                      autoFocus
                      id={`edit-${task.id}`}
                      maxLength={120}
                      onChange={(event) => setEditedTitle(event.target.value)}
                      value={editedTitle}
                    />
                    <select
                      aria-label="Task category"
                      onChange={(event) => setEditedCategoryId(event.target.value)}
                      value={editedCategoryId}
                    >
                      <option value="">Uncategorized</option>
                      {categories.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))}
                    </select>
                    <button disabled={!editedTitle.trim()} type="submit">Save</button>
                    <button onClick={() => setEditingTaskId(null)} type="button">Cancel</button>
                  </form>
                ) : (
                  <>
                    <label className="task-check-label">
                      <input
                        checked={task.completed}
                        onChange={() => handleToggle(task.id)}
                        type="checkbox"
                      />
                      <span className="task-checkbox" aria-hidden="true">
                        {task.completed ? '✓' : ''}
                      </span>
                      <span className="task-title">{task.title}</span>
                    </label>
                    <span className={`task-category${category ? ` tag-${category.color}` : ' tag-none'}`}>
                      {category?.name ?? 'Uncategorized'}
                    </span>
                    <button className="edit-button" onClick={() => beginEditing(task)} type="button">
                      Edit
                    </button>
                    <button
                      aria-label={`Delete ${task.title}`}
                      className="delete-button"
                      onClick={() => handleDelete(task.id)}
                      type="button"
                    >
                      ×
                    </button>
                  </>
                )}
              </li>
            )
          })}
        </ul>
      )}

      <div className="tasks-footer">
        <span>Progress is built one small step at a time.</span>
        <span>{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} in this view</span>
      </div>
    </section>
  )
}

export default TaskList
