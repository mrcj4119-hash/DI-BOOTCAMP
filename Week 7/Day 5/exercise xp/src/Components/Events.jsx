import { useState } from 'react'

function Events() {
  const [isToggleOn, setIsToggleOn] = useState(true)

  const clickMe = () => {
    alert('I was clicked')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      alert(event.currentTarget.value)
    }
  }

  const toggleState = () => {
    setIsToggleOn((isOn) => !isOn)
  }

  return (
    <div className="component-demo event-demo">
      <div className="control-row">
        <button className="action-button" type="button" onClick={clickMe}>
          Click me
        </button>
        <input
          className="text-input"
          type="text"
          aria-label="Type a message and press Enter"
          placeholder="Type a message, then press Enter"
          onKeyDown={handleKeyDown}
        />
      </div>
      <button className="toggle-button" type="button" onClick={toggleState}>
        Turn {isToggleOn ? 'OFF' : 'ON'}
      </button>
      <p className="status-copy" aria-live="polite">The switch is {isToggleOn ? 'ON' : 'OFF'}.</p>
    </div>
  )
}

export default Events