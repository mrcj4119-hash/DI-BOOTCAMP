import { Component } from 'react'

class PostList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      errorMsg: '',
      isLoaded: false,
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Could not load posts (HTTP ${response.status}).`)
        }
        return response.json()
      })
      .then((posts) => {
        this.setState({ posts, isLoaded: true })
      })
      .catch((error) => {
        this.setState({ errorMsg: error.message, isLoaded: true })
      })
  }

  render() {
    const { posts, errorMsg, isLoaded } = this.state

    if (errorMsg) {
      return <p className="error-message" role="alert">{errorMsg}</p>
    }

    if (!isLoaded) {
      return <p className="loading-message">Loading posts...</p>
    }

    if (posts.length === 0) {
      return <p>No posts found.</p>
    }

    return (
      <div className="posts-list">
        {posts.map((post) => (
          <article className="post-card" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </article>
        ))}
      </div>
    )
  }
}

export default PostList
