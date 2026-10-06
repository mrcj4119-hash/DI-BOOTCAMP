import { Component } from 'react'
import axios from 'axios'

class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      title: '',
      body: '',
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { userId, title, body } = this.state

    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        { userId, title, body },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      console.log('Posted post:', response.data)
    } catch (error) {
      console.error('Could not post data with Axios:', error)
    }
  }

  render() {
    const { userId, title, body } = this.state

    return (
      <form className="post-form" onSubmit={this.handleSubmit}>
        <label htmlFor="userId">User ID</label>
        <input
          id="userId"
          name="userId"
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={this.handleChange}
          required
        />

        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={this.handleChange}
          required
        />

        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          name="body"
          placeholder="Body"
          value={body}
          onChange={this.handleChange}
          required
          rows="4"
        />

        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default PostForm
