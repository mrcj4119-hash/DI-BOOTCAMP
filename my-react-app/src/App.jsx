import { Component } from 'react'
import './App.css'
import ErrorBoundary from './ErrorBoundary'

class BuggyCounter extends Component {
  constructor(props) {
    super(props)
    this.state = { counter: 0 }
  }

  handleClick = () => {
    this.setState(({ counter }) => {
      const nextCounter = counter + 1

      if (nextCounter >= 5) {
        throw new Error('I crashed!')
      }

      return { counter: nextCounter }
    })
  }

  render() {
    return (
      <button type="button" className="counter-button" onClick={this.handleClick}>
        Counter: {this.state.counter}
      </button>
    )
  }
}

class LifecycleDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      favoriteColor: 'red',
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ favoriteColor: 'yellow' })
    }, 1000)
  }

  shouldComponentUpdate() {
    console.log('shouldComponentUpdate')
    return true
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('in getSnapshotBeforeUpdate')
    return `Changed from ${prevState.favoriteColor} to ${this.state.favoriteColor}`
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('after update')
    console.log(snapshot)
  }

  handleColorChange = () => {
    this.setState({ favoriteColor: 'blue' })
  }

  render() {
    return (
      <div className="lifecycle-box">
        <h3>Favorite color: {this.state.favoriteColor}</h3>
        <button type="button" className="action-button" onClick={this.handleColorChange}>
          Change to blue
        </button>
      </div>
    )
  }
}

class Child extends Component {
  componentWillUnmount() {
    alert('Child has been unmounted!')
  }

  render() {
    return <h3>Hello World!</h3>
  }
}

class UnmountingDemo extends Component {
  constructor(props) {
    super(props)
    this.state = { show: true }
  }

  handleDelete = () => {
    this.setState({ show: false })
  }

  render() {
    return (
      <div className="lifecycle-box">
        <button type="button" className="action-button danger" onClick={this.handleDelete}>
          Delete
        </button>
        {this.state.show && <Child />}
      </div>
    )
  }
}

function App() {
  return (
    <main className="app-shell">
      <section className="exercise-panel">
        <h2>Exercise 1: Error Boundary Simulation</h2>

        <div className="simulation-grid">
          <div className="simulation-card">
            <h3>Simulation 1: Shared boundary</h3>
            <ErrorBoundary>
              <BuggyCounter />
              <BuggyCounter />
            </ErrorBoundary>
          </div>

          <div className="simulation-card">
            <h3>Simulation 2: Separate boundaries</h3>
            <ErrorBoundary>
              <BuggyCounter />
            </ErrorBoundary>
            <ErrorBoundary>
              <BuggyCounter />
            </ErrorBoundary>
          </div>

          <div className="simulation-card">
            <h3>Simulation 3: No boundary</h3>
            <BuggyCounter />
          </div>
        </div>
      </section>

      <section className="exercise-panel">
        <h2>Exercise 2: Lifecycle</h2>
        <LifecycleDemo />
      </section>

      <section className="exercise-panel">
        <h2>Exercise 3: Lifecycle #2</h2>
        <UnmountingDemo />
      </section>
    </main>
  )
}

export default App
