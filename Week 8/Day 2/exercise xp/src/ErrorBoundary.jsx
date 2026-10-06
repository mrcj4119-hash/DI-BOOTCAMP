import { Component } from 'react'

class ErrorBoundary extends Component {
  state = { hasError: false }

  componentDidCatch(error) {
    console.error('A page failed to render:', error)
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger" role="alert">
          <h2 className="h4">Something went wrong.</h2>
          <p className="mb-0">This page could not be displayed. Try another page from the navigation.</p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
