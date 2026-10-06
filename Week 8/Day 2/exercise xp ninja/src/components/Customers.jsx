import { Component } from 'react'

class Customers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      customers: [],
      isLoaded: false,
      errorMsg: '',
    }
  }

  componentDidMount() {
    fetch('/api/customers/')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Could not load customers (HTTP ${response.status}).`)
        }
        return response.json()
      })
      .then((customers) => {
        this.setState({ customers, isLoaded: true })
      })
      .catch((error) => {
        this.setState({ errorMsg: error.message, isLoaded: true })
      })
  }

  render() {
    const { customers, isLoaded, errorMsg } = this.state

    if (!isLoaded) {
      return <p className="loading">Loading customers...</p>
    }

    if (errorMsg) {
      return <p className="error" role="alert">{errorMsg}</p>
    }

    return (
      <ul className="data-list">
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.firstName} {customer.lastName}
          </li>
        ))}
      </ul>
    )
  }
}

export default Customers
