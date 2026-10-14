import { useSelector } from 'react-redux'
import DeleteTask from './DeleteTask.jsx'

const emptyTasks = []

function formatTime(time) {
  if (!time) return 'ANYTIME'

  return new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).format(
    new Date(`2000-01-01T${time}:00`),
  )
}

function TaskList({ date, onEdit, onDelete }) {
  const tasks = useSelector((state) => state.planner.tasksByDate[date] || emptyTasks)
  const orderedTasks = [...tasks].sort((a, b) => (a.time || '99:99').localeCompare(b.time || '99:99'))

  if (orderedTasks.length === 0) {
    return (
      <div className="empty-agenda">
        <span className="empty-calendar" aria-hidden="true">
          <span>✳</span>
        </span>
        <p>Nothing on the agenda.</p>
        <span>Enjoy the breathing room, or add a task for this day.</span>
      </div>
    )
  }

  return (
    <div className="task-list">
      {orderedTasks.map((task) => (
        <article className="task-row" key={task.id}>
          <div className="task-time">{formatTime(task.time)}</div>
          <span className="timeline-marker" aria-hidden="true">
            <span />
          </span>
          <div className="task-content">
            <div className="task-copy">
              <h3>{task.title}</h3>
              {task.notes && <p>{task.notes}</p>}
            </div>
            <div className="task-actions">
              <button type="button" aria-label={`Edit ${task.title}`} onClick={() => onEdit(task)}>
                Edit
              </button>
              <DeleteTask date={date} task={task} onDeleted={onDelete} />
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export default TaskList
