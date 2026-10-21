import { useState } from 'react'

type CounterAction = 'increment' | 'decrement'

function Counter() {
  const [count, setCount] = useState<number>(0)
  const [lastAction, setLastAction] = useState<CounterAction | null>(null)

  const updateCount = (action: CounterAction) => {
    setCount((currentCount) =>
      action === 'increment' ? currentCount + 1 : currentCount - 1,
    )
    setLastAction(action)
  }

  return (
    <div className="counter-card">
      <button
        type="button"
        className="counter-action"
        onClick={() => updateCount('decrement')}
        aria-label="Decrease counter"
      >
        −
      </button>
      <output className="counter-value" aria-live="polite">{count}</output>
      <button
        type="button"
        className="counter-action"
        onClick={() => updateCount('increment')}
        aria-label="Increase counter"
      >
        +
      </button>
      <p className="last-action">
        Last action: {lastAction ?? 'None yet'}
      </p>
    </div>
  )
}

export default Counter
