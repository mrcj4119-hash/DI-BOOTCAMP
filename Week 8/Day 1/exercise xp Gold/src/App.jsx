import { Component } from 'react'
import ErrorBoundary from './ErrorBoundary.jsx'
import './App.css'

class App extends Component {
  render() {
    return (
      <main className="app">
        <h1>React Modal with Error Handling</h1>
        <ErrorBoundary>
          {(occurError) => (
            <button
              className="open-modal-button"
              type="button"
              onClick={occurError}
            >
              Click me
            </button>
          )}
        </ErrorBoundary>
      </main>
    )
  }
}

export default App
