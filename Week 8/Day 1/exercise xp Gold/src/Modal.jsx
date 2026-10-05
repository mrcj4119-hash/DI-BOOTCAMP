import { Component } from 'react'

class Modal extends Component {
  render() {
    const { errorInfo, onClose } = this.props

    return (
      <div className="modal-background" role="presentation" onClick={onClose}>
        <section
          className="modal-body"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(event) => event.stopPropagation()}
        >
          <h2 id="modal-title">Something went wrong</h2>
          <p>{errorInfo?.message || 'An unexpected error occurred.'}</p>
          {errorInfo?.componentStack && (
            <details>
              <summary>Error details</summary>
              <pre>{errorInfo.componentStack}</pre>
            </details>
          )}
          <button type="button" onClick={onClose}>
            Close
          </button>
        </section>
      </div>
    )
  }
}

export default Modal
