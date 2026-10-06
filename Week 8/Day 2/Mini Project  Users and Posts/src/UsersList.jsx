import { Component } from 'react'

class UsersList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      isLoaded: false,
      errorMsg: '',
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Could not load users (HTTP ${response.status}).`)
        }
        return response.json()
      })
      .then((users) => {
        this.setState({ users, isLoaded: true })
      })
      .catch((error) => {
        this.setState({ errorMsg: error.message, isLoaded: true })
      })
  }

  render() {
    const { users, isLoaded, errorMsg } = this.state

    if (!isLoaded) {
      return <p className="loading-message">Loading...</p>
    }

    if (errorMsg) {
      return <p className="error-message" role="alert">{errorMsg}</p>
    }

    return (
      <ul className="users-list">
        {users.map((user) => (
          <li className="user-card" key={user.id}>
            <h3>{user.name}</h3>
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </li>
        ))}
      </ul>
    )
  }
}

export default UsersList
