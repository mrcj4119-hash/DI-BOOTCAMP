import { useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { addTask, clearError, deleteTask, editTask } from './redux/actions.js'
import './App.css'

const weekdayFormatter = new Intl.DateTimeFormat('en', { weekday: 'short' })
const dayFormatter = new Intl.DateTimeFormat('en', { day: '2-digit' })
const monthFormatter = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' })
const fullDateFormatter = new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' })

function toDateKey(date) {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
  return localDate.toISOString().slice(0, 10)
}

function dateFromKey(dateKey) {
  return new Date(`${dateKey}T12:00:00`)
}

function getWeekDates(anchorDate) {
  const start = new Date(anchorDate)
  start.setHours(12, 0, 0, 0)
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7))
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)
    return date
  })
}

function DatePicker({ selectedDate, onSelectDate, tasksByDate }) {
  const selectedDateObject = dateFromKey(selectedDate)
  const weekDates = getWeekDates(selectedDateObject)
  const todayKey = toDateKey(new Date())

  function shiftWeek(amount) {
    const nextDate = new Date(selectedDateObject)
    nextDate.setDate(nextDate.getDate() + amount * 7)
    onSelectDate(toDateKey(nextDate))
  }

  return (
    <section className="date-card" aria-label="Choose a day">
      <div className="calendar-heading">
        <div>
          <p className="eyebrow">YOUR WEEK, AT A GLANCE</p>
          <h2>{monthFormatter.format(selectedDateObject)}</h2>
        </div>
        <div className="calendar-actions">
          <button className="today-button" type="button" onClick={() => onSelectDate(todayKey)}>Today</button>
          <button className="week-nav" type="button" aria-label="Previous week" onClick={() => shiftWeek(-1)}>‹</button>
          <button className="week-nav" type="button" aria-label="Next week" onClick={() => shiftWeek(1)}>›</button>
        </div>
      </div>

      <div className="week-strip">
        {weekDates.map((date) => {
          const dateKey = toDateKey(date)
          const selected = dateKey === selectedDate
          const dayHasTasks = (tasksByDate[dateKey] || []).length > 0
          return (
            <button
              className={`day-button${selected ? ' is-selected' : ''}${dateKey === todayKey ? ' is-today' : ''}`}
              key={dateKey}
              type="button"
              aria-pressed={selected}
              aria-label={`${fullDateFormatter.format(date)}${dayHasTasks ? `, ${(tasksByDate[dateKey] || []).length} tasks` : ''}`}
              onClick={() => onSelectDate(dateKey)}
            >
              <span className="weekday">{weekdayFormatter.format(date)}</span>
              <span className="day-number">{dayFormatter.format(date)}</span>
              <span className={`day-dot${dayHasTasks ? ' has-tasks' : ''}`} aria-hidden="true" />
            </button>
          )
        })}
      </div>

      <div className="date-input-row">
        <span>Or jump to a date</span>
        <label>
          <span className="visually-hidden">Choose date</span>
          <input type="date" value={selectedDate} onChange={(event) => event.target.value && onSelectDate(event.target.value)} />
        </label>
      </div>
    </section>
  )
}

function TaskForm({ initialTask, onSave, onCancel }) {
  const [title, setTitle] = useState(initialTask?.title || '')
  const [time, setTime] = useState(initialTask?.time || '')
  const [notes, setNotes] = useState(initialTask?.notes || '')
  const [validationError, setValidationError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!title.trim()) {
      setValidationError('Add a task name before saving.')
      return
    }
    onSave({ title: title.trim(), time, notes: notes.trim() })
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="form-field form-title">
        <span>Task name</span>
        <input
          autoFocus
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="What would you like to get done?"
          maxLength={100}
          required
        />
      </label>
      {validationError && <p className="form-validation" role="alert">{validationError}</p>}
      <div className="form-row">
        <label className="form-field">
          <span>Time <small>OPTIONAL</small></span>
          <input type="time" value={time} onChange={(event) => setTime(event.target.value)} />
        </label>
        <label className="form-field">
          <span>Note <small>OPTIONAL</small></span>
          <input value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="A little reminder..." maxLength={160} />
        </label>
      </div>
      <div className="form-actions">
        <button className="cancel-button" type="button" onClick={onCancel}>Cancel</button>
        <button className="save-button" type="submit">{initialTask ? 'Save changes' : 'Add to my day'} <span aria-hidden="true">↗</span></button>
      </div>
    </form>
  )
}

function TaskRow({ task, onEdit, onDelete }) {
  const formattedTime = task.time
    ? new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).format(
      new Date(`2000-01-01T${task.time}:00`),
    )
    : 'ANYTIME'

  return (
    <article className="task-row">
      <div className="task-time">{formattedTime}</div>
      <span className="timeline-marker" aria-hidden="true"><span /></span>
      <div className="task-content">
        <div className="task-copy">
          <h3>{task.title}</h3>
          {task.notes && <p>{task.notes}</p>}
        </div>
        <div className="task-actions">
          <button type="button" aria-label={`Edit ${task.title}`} onClick={() => onEdit(task)}>Edit</button>
          <button className="delete-action" type="button" aria-label={`Delete ${task.title}`} onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      </div>
    </article>
  )
}

function Planner({
  tasksByDate,
  error,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onClearError,
}) {
  const [selectedDate, setSelectedDate] = useState(toDateKey(new Date()))
  const [isAdding, setIsAdding] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const tasks = tasksByDate[selectedDate] || []
  const selectedDateObject = dateFromKey(selectedDate)
  const orderedTasks = useMemo(
    () => [...tasks].sort((a, b) => (a.time || '99:99').localeCompare(b.time || '99:99')),
    [tasks],
  )
  const totalMinutes = tasks.reduce((total, task) => {
    if (!task.time) return total
    const [hours, minutes] = task.time.split(':').map(Number)
    return total + hours * 60 + minutes
  }, 0)

  function saveNewTask(task) {
    onAddTask(selectedDate, task)
    setIsAdding(false)
  }

  function saveEditedTask(task) {
    onEditTask(selectedDate, editingTask.id, task)
    setEditingTask(null)
  }

  function removeTask(taskId) {
    onDeleteTask(selectedDate, taskId)
    if (editingTask?.id === taskId) setEditingTask(null)
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Daybook home">
          <span className="brand-mark" aria-hidden="true">d.</span>
          <span>daybook</span>
        </a>
        <div className="topbar-right">
          <span className="course-label">WEEK 9 <i>/</i> DAY 2</span>
          <span className="topbar-divider" />
          <span className="topbar-motto">Make today yours.</span>
        </div>
      </header>

      <section className="page-heading">
        <div>
          <p className="eyebrow">A little intention goes a long way</p>
          <h1>Plan your <span>day.</span></h1>
          <p className="heading-subtitle">A calm space for everything you want to make time for.</p>
        </div>
        <div className="heading-mark" aria-hidden="true"><span>✳</span></div>
      </section>

      {error && (
        <p className="error-banner" role="alert">
          <span>{error}</span>
          <button type="button" aria-label="Dismiss message" onClick={onClearError}>×</button>
        </p>
      )}

      <div className="planner-grid">
        <aside className="date-column">
          <DatePicker selectedDate={selectedDate} onSelectDate={setSelectedDate} tasksByDate={tasksByDate} />
          <div className="gentle-reminder">
            <span className="reminder-mark" aria-hidden="true">✳</span>
            <p>Give your day<br />a little breathing room.</p>
          </div>
        </aside>

        <section className="agenda-card" aria-labelledby="agenda-title">
          <header className="agenda-header">
            <div>
              <p className="eyebrow">{selectedDate === toDateKey(new Date()) ? 'A FRESH PAGE' : weekdayFormatter.format(selectedDateObject).toUpperCase()}</p>
              <h2 id="agenda-title">{fullDateFormatter.format(selectedDateObject)}</h2>
            </div>
            <button className="add-task-button" type="button" onClick={() => { setEditingTask(null); setIsAdding(true) }}>
              <span aria-hidden="true">+</span> New task
            </button>
          </header>

          {(isAdding || editingTask) && (
            <div className="form-card">
              <div className="form-card-heading">
                <div>
                  <p className="eyebrow">{editingTask ? 'MAKE A CHANGE' : 'ADD TO YOUR DAY'}</p>
                  <h3>{editingTask ? 'Edit this task' : 'What’s on your mind?'}</h3>
                </div>
                <button className="close-form" type="button" aria-label="Close form" onClick={() => { setIsAdding(false); setEditingTask(null) }}>×</button>
              </div>
              <TaskForm
                key={editingTask?.id || 'new-task'}
                initialTask={editingTask}
                onSave={editingTask ? saveEditedTask : saveNewTask}
                onCancel={() => { setIsAdding(false); setEditingTask(null) }}
              />
            </div>
          )}

          <div className="agenda-toolbar">
            <div>
              <h3>Your plans <span>{tasks.length}</span></h3>
              <p>{tasks.length === 0 ? 'No plans yet. Keep the day open, or add a little something.' : `${tasks.length} ${tasks.length === 1 ? 'thing' : 'things'} on your list`}</p>
            </div>
            {tasks.length > 0 && (
              <span className="agenda-time">
                <span className="clock-mark" aria-hidden="true">◷</span>
                {totalMinutes > 0 ? `${Math.floor(totalMinutes / 60)}:${String(totalMinutes % 60).padStart(2, '0')} start` : 'At your pace'}
              </span>
            )}
          </div>

          {orderedTasks.length > 0 ? (
            <div className="task-list">
              {orderedTasks.map((task) => (
                <TaskRow key={task.id} task={task} onEdit={setEditingTask} onDelete={removeTask} />
              ))}
            </div>
          ) : (
            !isAdding && (
              <div className="empty-agenda">
                <span className="empty-calendar" aria-hidden="true"><span>✳</span></span>
                <p>Nothing on the agenda.</p>
                <span>Enjoy the breathing room, or add a task for this day.</span>
                <button type="button" onClick={() => setIsAdding(true)}>Add a task <span aria-hidden="true">↗</span></button>
              </div>
            )
          )}

          <footer className="agenda-footer">
            <span>ONE DAY AT A TIME</span>
            <span>{tasks.length === 0 ? 'ROOM TO WANDER' : 'YOU’RE MAKING IT HAPPEN'} <span className="footer-sparkle" aria-hidden="true">✳</span></span>
          </footer>
        </section>
      </div>

      <p className="page-note">A thoughtful day is made one small moment at a time.</p>
    </main>
  )
}

const mapStateToProps = (state) => ({
  tasksByDate: state.tasksByDate,
  error: state.error,
})

const mapDispatchToProps = {
  onAddTask: addTask,
  onEditTask: editTask,
  onDeleteTask: deleteTask,
  onClearError: clearError,
}

export default connect(mapStateToProps, mapDispatchToProps)(Planner)
