import { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      greeting: '',
      inputValue: '',
      responseMessage: '',
      errorMessage: '',
    }
  }

  async componentDidMount() {
    try {
      const response = await fetch('/api/hello')
      if (!response.ok) {
        throw new Error(`Could not load greeting (HTTP ${response.status}).`)
      }

      const data = await response.json()
      this.setState({ greeting: data.message })
    } catch (error) {
      this.setState({ errorMessage: error.message })
    }
  }

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
      responseMessage: '',
      errorMessage: '',
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    this.setState({ responseMessage: '', errorMessage: '' })

    try {
      const response = await fetch('/api/world', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: this.state.inputValue }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || `Request failed (HTTP ${response.status}).`)
      }

      this.setState({ responseMessage: data.message })
    } catch (error) {
      this.setState({ errorMessage: error.message })
    }
  }

  render() {
    const { greeting, inputValue, responseMessage, errorMessage } = this.state

    return (
      <main className="app">
        <section className="message-card">
          <div className="server-mark" aria-hidden="true">↔</div>
          <h1>{greeting || 'Connecting to Express...'}</h1>

          <form onSubmit={this.handleSubmit}>
            <label htmlFor="message">Send a message</label>
            <div className="form-row">
              <input
                id="message"
                type="text"
                value={inputValue}
                onChange={this.handleChange}
                placeholder="Type something..."
                required
              />
              <button type="submit">Send</button>
            </div>
          </form>

          {responseMessage && <p className="response-message" role="status">{responseMessage}</p>}
          {errorMessage && <p className="error-message" role="alert">{errorMessage}</p>}
        </section>
      </main>
    )
  }
}

export default App
