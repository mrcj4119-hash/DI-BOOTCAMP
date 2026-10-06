import { Component } from 'react'
import PostList from './PostList.jsx'
import UsersList from './UsersList.jsx'
import './App.css'

class App extends Component {
  render() {
    return (
      <main className="app">
        <header className="page-header">
          <h1>Users and Posts</h1>
          <p>Data fetched from JSONPlaceholder</p>
        </header>

        <div className="content-grid">
          <section className="data-panel">
            <h2>Users</h2>
            <UsersList />
          </section>

          <section className="data-panel">
            <h2>Posts</h2>
            <PostList />
          </section>
        </div>
      </main>
    )
  }
}

export default App
