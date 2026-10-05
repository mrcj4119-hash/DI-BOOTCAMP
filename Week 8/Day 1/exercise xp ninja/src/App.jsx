import { Component } from 'react'
import './App.css'

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const clockRings = [
  { key: 'month', count: 12, radius: 45, suffix: ' month', selected: (time) => time.month },
  { key: 'weekday', count: 7, radius: 37, suffix: ' day', selected: (time) => time.weekday },
  { key: 'day', count: 31, radius: 29, suffix: ' day', selected: (time) => time.day - 1 },
  { key: 'hour', count: 24, radius: 21, suffix: ' hr', selected: (time) => time.hour },
  { key: 'minute', count: 60, radius: 14, suffix: ' min', selected: (time) => time.minute },
  { key: 'second', count: 60, radius: 8, suffix: ' sec', selected: (time) => time.second },
]

function readClock() {
  const now = new Date()
  return {
    year: now.getFullYear(),
    month: now.getMonth(),
    weekday: now.getDay(),
    day: now.getDate(),
    hour: now.getHours(),
    minute: now.getMinutes(),
    second: now.getSeconds(),
  }
}

function getRingLabel(ringKey, value) {
  if (ringKey === 'month') return monthNames[value]
  if (ringKey === 'weekday') return weekDays[value]
  return String(value + (ringKey === 'day' ? 1 : 0))
}

class ReactClock extends Component {
  constructor(props) {
    super(props)
    this.state = readClock()
  }

  componentDidMount() {
    this.timer = window.setInterval(() => {
      this.setState(readClock())
    }, 1000)
  }

  componentWillUnmount() {
    window.clearInterval(this.timer)
  }

  render() {
    const { year, month, weekday, day, hour, minute, second } = this.state
    const linearTime = [
      `${day} day`,
      `${String(hour).padStart(2, '0')} hr`,
      `${String(minute).padStart(2, '0')} min`,
      `${String(second).padStart(2, '0')} sec`,
    ].join('  ')

    return (
      <main className="clock-app">
        <section className="clock-panel" aria-label="Compass-style current date and time">
          <div className="year-label">
            <span>{year}</span>
            <small> / Year</small>
          </div>

          <div className="clock-face">
            {clockRings.map((ring) =>
              Array.from({ length: ring.count }, (_, index) => {
                const angle = (index / ring.count) * 360
                const isCurrent = index === ring.selected(this.state)
                const label = `${getRingLabel(ring.key, index)}${ring.suffix}`

                return (
                  <span
                    className={`clock-mark${isCurrent ? ' current' : ''}`}
                    key={`${ring.key}-${index}`}
                    style={{
                      '--angle': `${angle}deg`,
                      '--radius': `min(${(ring.radius / 45) * 41}vw, ${(ring.radius / 45) * 260}px)`,
                    }}
                    aria-hidden="true"
                  >
                    {label}
                  </span>
                )
              }),
            )}
            <output className="clock-readout" aria-live="off">
              {linearTime}
            </output>
          </div>

          <div className="month-label">{monthNames[month].slice(0, 3)}</div>
          <span className="accessible-date">
            {weekDays[weekday]}, {monthNames[month]} {day}, {year}
          </span>
        </section>
      </main>
    )
  }
}

function App() {
  return <ReactClock />
}

export default App
