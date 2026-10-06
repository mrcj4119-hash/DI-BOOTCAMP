import { Component } from 'react'
import UserEmailForm from './UserEmailForm.jsx'
import PostForm from './PostForm.jsx'
import './App.css'

class App extends Component {
  render() {
    return (
      <main className="app">
        <header className="page-header">
          <h1>POST JSON Data</h1>
          <p>Submit form data to JSONPlaceholder and inspect the response in the console.</p>
        </header>

        <section className="exercise-card">
          <h2>Exercise 1: POST JSON Data</h2>
          <UserEmailForm />
        </section>

        <section className="exercise-card">
          <h2>Exercise 1: POST JSON Data with Axios</h2>
          <PostForm />
        </section>
      </main>
    )
  }
}

export default App
