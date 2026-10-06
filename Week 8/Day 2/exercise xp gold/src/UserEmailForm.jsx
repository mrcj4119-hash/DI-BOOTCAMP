import { Component } from 'react'

class UserEmailForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      email: '',
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { user, email } = this.state

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, email }),
      })

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      const postedData = await response.json()
      console.log('Posted user and email:', postedData)
    } catch (error) {
      console.error('Could not post user and email:', error)
    }
  }

  render() {
    const { user, email } = this.state

    return (
      <form className="post-form" onSubmit={this.handleSubmit}>
        <label htmlFor="user">User</label>
        <input
          id="user"
          name="user"
          type="text"
          placeholder="User"
          value={user}
          onChange={this.handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={this.handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default UserEmailForm
