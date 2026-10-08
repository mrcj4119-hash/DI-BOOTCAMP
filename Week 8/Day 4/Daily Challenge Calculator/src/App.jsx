import { useState } from 'react'
import './App.css'

const operations = [
  { symbol: '+', label: 'Addition', calculate: (first, second) => first + second },
  { symbol: '−', label: 'Subtraction', calculate: (first, second) => first - second },
  { symbol: '×', label: 'Multiplication', calculate: (first, second) => first * second },
  { symbol: '÷', label: 'Division', calculate: (first, second) => first / second },
]

function App() {
  const [firstNumber, setFirstNumber] = useState('')
  const [secondNumber, setSecondNumber] = useState('')
  const [operationIndex, setOperationIndex] = useState(0)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const first = Number(firstNumber)
    const second = Number(secondNumber)
    const operation = operations[operationIndex]

    if (operation.symbol === '÷' && second === 0) {
      setResult(null)
      setError('Division by zero is undefined. Enter a non-zero second number.')
      return
    }

    setError('')
    setResult(operation.calculate(first, second))
  }

  return (
    <main className="page">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Number Notes home">
          <span className="brand-mark" aria-hidden="true">n.</span>
          <span>number notes</span>
        </a>
        <span className="topbar-label">A LITTLE MATH, MADE SIMPLE</span>
      </header>

      <section className="calculator-layout" aria-labelledby="page-title">
        <div className="intro">
          <span className="eyebrow"><span /> YOUR EVERYDAY CALCULATOR</span>
          <h1 id="page-title">Let’s work<br />it out.</h1>
          <p>Pick your numbers, choose what to do, and let the answer find you.</p>
          <span className="decorative-plus" aria-hidden="true">+</span>
        </div>

        <form className="calculator-card" onSubmit={handleSubmit}>
          <div className="card-heading">
            <div>
              <span className="card-overline">THE CALCULATOR</span>
              <h2>Make a calculation</h2>
            </div>
            <span className="card-icon" aria-hidden="true">∑</span>
          </div>

          <div className="number-fields">
            <label className="field">
              <span className="field-label">FIRST NUMBER</span>
              <input
                type="number"
                step="any"
                value={firstNumber}
                onChange={(event) => setFirstNumber(event.target.value)}
                placeholder="e.g. 12"
                required
              />
            </label>

            <label className="field">
              <span className="field-label">SECOND NUMBER</span>
              <input
                type="number"
                step="any"
                value={secondNumber}
                onChange={(event) => setSecondNumber(event.target.value)}
                placeholder="e.g. 8"
                required
              />
            </label>
          </div>

          <label className="field operation-field">
            <span className="field-label">OPERATION</span>
            <span className="select-wrap">
              <select
                value={operationIndex}
                onChange={(event) => {
                  setOperationIndex(Number(event.target.value))
                  setResult(null)
                  setError('')
                }}
              >
                {operations.map((operation, index) => (
                  <option key={operation.label} value={index}>
                    {operation.label} ({operation.symbol})
                  </option>
                ))}
              </select>
              <span aria-hidden="true">⌄</span>
            </span>
          </label>

          <button className="calculate-button" type="submit">
            <span>Calculate</span>
            <span aria-hidden="true">→</span>
          </button>

          <section
            className={`result-panel${result !== null ? ' has-result' : ''}${error ? ' has-error' : ''}`}
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="result-label">YOUR RESULT</span>
            {error ? (
              <p className="result-error" role="alert">{error}</p>
            ) : result !== null ? (
              <p className="result-value">{result}</p>
            ) : (
              <p className="result-placeholder">Your answer will appear here</p>
            )}
          </section>
        </form>
      </section>

      <footer className="page-footer">
        <span>ONE STEP AT A TIME</span>
        <span>MADE FOR CURIOUS MINDS <span aria-hidden="true">✳</span></span>
      </footer>
    </main>
  )
}

export default App
