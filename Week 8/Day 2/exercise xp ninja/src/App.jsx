import { Component } from 'react'
import Customers from './components/Customers.jsx'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      isUsersLoaded: false,
      usersError: '',
    }
  }

  componentDidMount() {
    fetch('/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Could not load users (HTTP ${response.status}).`)
        }
        return response.json()
      })
      .then((users) => {
        this.setState({ users, isUsersLoaded: true })
      })
      .catch((error) => {
        this.setState({ usersError: error.message, isUsersLoaded: true })
      })
  }

  render() {
    const { users, isUsersLoaded, usersError } = this.state

    return (
      <main className="app">
        <header className="page-header">
          <h1>Community Directory</h1>
          <p>Meet the people in our community.</p>
        </header>

        <div className="content-grid">
          <section className="data-panel">
            <h2>Users</h2>
            {!isUsersLoaded && <p className="loading">Loading users...</p>}
            {usersError && <p className="error" role="alert">{usersError}</p>}
            {isUsersLoaded && !usersError && (
              <ul className="data-list">
                {users.map((user) => (
                  <li key={user.id}>{user.username}</li>
                ))}
              </ul>
            )}
          </section>

          <section className="data-panel">
            <h2>Customers</h2>
            <Customers />
          </section>
        </div>
      </main>
    )
  }
}

export default App
