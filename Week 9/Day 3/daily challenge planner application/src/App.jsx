import { useSelector } from 'react-redux'
import { useState } from 'react'
import AddTask from './components/AddTask.jsx'
import DatePicker, { dateFromKey, toDateKey } from './components/DatePicker.jsx'
import EditTask from './components/EditTask.jsx'
import TaskList from './components/TaskList.jsx'
import './App.css'

const weekdayFormatter = new Intl.DateTimeFormat('en', { weekday: 'long' })
const fullDateFormatter = new Intl.DateTimeFormat('en', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
})
const emptyTasks = []

function App() {
  const [selectedDate, setSelectedDate] = useState(toDateKey(new Date()))
  const [isAdding, setIsAdding] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const tasks = useSelector((state) => state.planner.tasksByDate[selectedDate] || emptyTasks)
  const selectedDateObject = dateFromKey(selectedDate)
  const todayKey = toDateKey(new Date())

  function closeEditor() {
    setIsAdding(false)
    setEditingTask(null)
  }

  function selectDate(date) {
    closeEditor()
    setSelectedDate(date)
  }

  function handleDeleted(taskId) {
    if (editingTask?.id === taskId) {
      setEditingTask(null)
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Daybook home">
          <span className="brand-mark" aria-hidden="true">
            d.
          </span>
          <span>daybook</span>
        </a>
        <div className="topbar-right">
          <span className="course-label">WEEK 9 <i>/</i> DAY 3</span>
          <span className="topbar-divider" />
          <span className="topbar-motto">Make today yours.</span>
        </div>
      </header>

      <section className="page-heading">
        <div>
          <p className="eyebrow">A little intention goes a long way</p>
          <h1>
            Plan your <span>day.</span>
          </h1>
          <p>Make a little room for what matters. Your plans, one day at a time.</p>
        </div>
        <div className="heading-stamp" aria-hidden="true">
          <span>ONE DAY</span>
          <strong>at a time</strong>
          <i />
          <span>YOU’VE GOT THIS</span>
        </div>
      </section>

      <div className="planner-grid">
        <aside className="date-column">
          <DatePicker selectedDate={selectedDate} onSelectDate={selectDate} />
          <div className="gentle-reminder">
            <span className="reminder-mark" aria-hidden="true">
              ✳
            </span>
            <p>
              Give your day
              <br />a little breathing room.
            </p>
          </div>
        </aside>

        <section className="agenda-card" aria-labelledby="agenda-title">
          <header className="agenda-header">
            <div>
              <p className="eyebrow">
                {selectedDate === todayKey
                  ? 'A FRESH PAGE'
                  : weekdayFormatter.format(selectedDateObject).toUpperCase()}
              </p>
              <h2 id="agenda-title">{fullDateFormatter.format(selectedDateObject)}</h2>
            </div>
            <button
              className="add-task-button"
              type="button"
              onClick={() => {
                setEditingTask(null)
                setIsAdding(true)
              }}
            >
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
                <button
                  className="close-form"
                  type="button"
                  aria-label="Close form"
                  onClick={closeEditor}
                >
                  ×
                </button>
              </div>
              {editingTask ? (
                <EditTask
                  date={selectedDate}
                  task={editingTask}
                  onCancel={closeEditor}
                  onSaved={closeEditor}
                />
              ) : (
                <AddTask
                  date={selectedDate}
                  onCancel={closeEditor}
                  onSaved={closeEditor}
                />
              )}
            </div>
          )}

          <div className="agenda-toolbar">
            <div>
              <h3>
                Your plans <span>{tasks.length}</span>
              </h3>
              <p>
                {tasks.length === 0
                  ? 'No plans yet. Keep the day open, or add a little something.'
                  : `${tasks.length} ${tasks.length === 1 ? 'thing' : 'things'} on your list`}
              </p>
            </div>
            {tasks.length > 0 && (
              <span className="agenda-time">
                <span className="clock-mark" aria-hidden="true">
                  ◷
                </span>
                {tasks.some((task) => task.time) ? 'A day with intention' : 'At your pace'}
              </span>
            )}
          </div>

          <TaskList
            date={selectedDate}
            onEdit={(task) => {
              setIsAdding(false)
              setEditingTask(task)
            }}
            onDelete={handleDeleted}
          />

          <footer className="agenda-footer">
            <span>ONE DAY AT A TIME</span>
            <span>
              {tasks.length === 0 ? 'ROOM TO WANDER' : 'YOU’RE MAKING IT HAPPEN'}{' '}
              <span className="footer-sparkle" aria-hidden="true">
                ✳
              </span>
            </span>
          </footer>
        </section>
      </div>

      <p className="page-note">A thoughtful day is made one small moment at a time.</p>
    </main>
  )
}

export default App
