import { useTasks } from '../context/TaskContext.jsx'

function TaskItem({ task }) {
  const { dispatch } = useTasks()

  return (
    <li className={`task-item${task.completed ? ' is-completed' : ''}`}>
      <label className="task-check">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => dispatch({ type: 'toggled', id: task.id })}
          aria-label={`Mark "${task.text}" ${task.completed ? 'incomplete' : 'complete'}`}
        />
        <span className="custom-checkbox" aria-hidden="true">
          {task.completed && '✓'}
        </span>
      </label>
      <span className="task-text">{task.text}</span>
      <button
        className="remove-button"
        type="button"
        onClick={() => dispatch({ type: 'removed', id: task.id })}
        aria-label={`Remove "${task.text}"`}
      >
        <span aria-hidden="true">×</span>
      </button>
    </li>
  )
}

export default TaskItem
