import { useEffect, useState } from 'react'

function Clock() {
  const [currentDate, setCurrentDate] = useState(() => new Date())

  const tick = () => {
    setCurrentDate(new Date())
  }

  useEffect(() => {
    const timerId = window.setInterval(tick, 1000)

    return () => window.clearInterval(timerId)
  }, [])

  return (
    <section className="clock-panel" aria-labelledby="clock-heading">
      <div className="clock-topline">
        <span className="live-indicator" aria-hidden="true" />
        <p id="clock-heading">Your local time</p>
      </div>
      <p className="clock-time" aria-live="off">
        {currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })}
      </p>
      <p className="clock-date">
        {currentDate.toLocaleDateString([], {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </p>
      <div className="clock-rule" />
      <p className="clock-note">Updated every second</p>
    </section>
  )
}

export default Clock