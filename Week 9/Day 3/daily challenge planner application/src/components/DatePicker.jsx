import { useSelector } from 'react-redux'

const weekdayFormatter = new Intl.DateTimeFormat('en', { weekday: 'short' })
const dayFormatter = new Intl.DateTimeFormat('en', { day: '2-digit' })
const monthFormatter = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' })
const fullDateFormatter = new Intl.DateTimeFormat('en', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

export function toDateKey(date) {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
  return localDate.toISOString().slice(0, 10)
}

export function dateFromKey(dateKey) {
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

function DatePicker({ selectedDate, onSelectDate }) {
  const selectedDateObject = dateFromKey(selectedDate)
  const weekDates = getWeekDates(selectedDateObject)
  const todayKey = toDateKey(new Date())
  const tasksByDate = useSelector((state) => state.planner.tasksByDate)

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
          <button className="today-button" type="button" onClick={() => onSelectDate(todayKey)}>
            Today
          </button>
          <button
            className="week-nav"
            type="button"
            aria-label="Previous week"
            onClick={() => shiftWeek(-1)}
          >
            ‹
          </button>
          <button
            className="week-nav"
            type="button"
            aria-label="Next week"
            onClick={() => shiftWeek(1)}
          >
            ›
          </button>
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
          <input
            type="date"
            value={selectedDate}
            onChange={(event) => event.target.value && onSelectDate(event.target.value)}
          />
        </label>
      </div>
    </section>
  )
}

export default DatePicker
