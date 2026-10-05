import { Component } from 'react'
import Modal from './Modal.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorInfo: { message: error.message },
    }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({ errorInfo: { ...errorInfo, message: error.message } })
  }

  occurError = () => {
    this.setState({
      hasError: true,
      errorInfo: { message: 'This is a simulated error.' },
    })
  }

  closeModal = () => {
    this.setState({
      hasError: false,
      errorInfo: null,
    })
  }

  render() {
    const children =
      typeof this.props.children === 'function'
        ? this.props.children(this.occurError)
        : this.props.children

    if (this.state.hasError) {
      return (
        <>
          {children}
          <Modal
            errorInfo={this.state.errorInfo}
            onClose={this.closeModal}
          />
        </>
      )
    }

    return children
  }
}

export default ErrorBoundary
