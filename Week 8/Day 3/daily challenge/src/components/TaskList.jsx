import { useTasks } from '../context/TaskContext.jsx'
import TaskItem from './TaskItem.jsx'

function TaskList() {
  const { tasks, filter } = useTasks()
  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') {
      return !task.completed
    }
    if (filter === 'completed') {
      return task.completed
    }
    return true
  })

  if (visibleTasks.length === 0) {
    const message = tasks.length === 0
      ? 'Add a task above and it’ll show up here.'
      : `There are no ${filter} tasks right now.`

    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">✓</span>
        <p>{tasks.length === 0 ? 'No tasks yet' : 'Nothing to show'}</p>
        <span>{message}</span>
      </div>
    )
  }

  return (
    <ul className="task-list" aria-label={`${filter} tasks`}>
      {visibleTasks.map((task) => <TaskItem key={task.id} task={task} />)}
    </ul>
  )
}

export default TaskList
