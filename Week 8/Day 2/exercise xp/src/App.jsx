import { useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import ErrorBoundary from './ErrorBoundary.jsx'
import Example1 from './Example1.jsx'
import Example2 from './Example2.jsx'
import Example3 from './Example3.jsx'
import PostList from './PostList.jsx'

function JsonPostForm() {
  const [webhookUrl, setWebhookUrl] = useState('')
  const [status, setStatus] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('')

    let endpoint
    try {
      endpoint = new URL(webhookUrl)
    } catch {
      setStatus('Enter your webhook.site unique URL to send the request.')
      return
    }

    if (endpoint.protocol !== 'https:' && endpoint.protocol !== 'http:') {
      setStatus('The webhook URL must use HTTP or HTTPS.')
      return
    }

    const payload = {
      key1: 'myusername',
      email: 'mymail@gmail.com',
      name: 'Isaac',
      lastname: 'Doe',
      age: 27,
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const responseBody = await response.text()

      if (!response.ok) {
        throw new Error(`Webhook returned ${response.status}: ${responseBody || response.statusText}`)
      }

      console.log('Webhook response:', {
        status: response.status,
        body: responseBody,
      })
      setStatus(`Request sent successfully (HTTP ${response.status}). Check the browser console.`)
    } catch (error) {
      console.error('Could not send the webhook request:', error)
      setStatus(`Request failed: ${error.message}`)
    }
  }

  return (
    <form className="webhook-form" onSubmit={handleSubmit}>
      <label className="form-label" htmlFor="webhook-url">
        Your webhook.site unique URL
      </label>
      <input
        className="form-control"
        id="webhook-url"
        type="url"
        value={webhookUrl}
        onChange={(event) => setWebhookUrl(event.target.value)}
        placeholder="https://webhook.site/your-unique-id"
        required
      />
      <button className="btn btn-primary mt-3" type="submit">
        Send JSON with POST
      </button>
      {status && <p className="form-status mt-3 mb-0" role="status">{status}</p>}
    </form>
  )
}

function HomeScreen() {
  return (
    <>
      <header className="page-heading">
        <p className="eyebrow">Week 8 · Day 2 · Exercise XP</p>
        <h1>React data and routing</h1>
        <p>Practice error boundaries, React Router, JSON rendering, and POST requests.</p>
      </header>

      <section className="exercise-panel">
        <h2>Exercise 2: Display JSON Data</h2>
        <PostList />
      </section>

      <section className="exercise-panel">
        <h2>Exercise 3: Parse JSON Data</h2>
        <h3 className="subheading">Social Medias</h3>
        <Example1 />
        <h3 className="subheading">Skills</h3>
        <Example2 />
        <h3 className="subheading">Experiences</h3>
        <Example3 />
      </section>

      <section className="exercise-panel">
        <h2>Exercise 4: Post JSON Data</h2>
        <p>Enable CORS on webhook.site, then paste your unique URL below.</p>
        <JsonPostForm />
      </section>
    </>
  )
}

function ProfileScreen() {
  return (
    <header className="page-heading">
      <p className="eyebrow">React Router</p>
      <h1>This is the Profile Screen</h1>
      <p>Use the navigation links to move between the screens.</p>
    </header>
  )
}

function ShopScreen() {
  throw new Error('The shop is currently unavailable.')
}

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand navbar-dark app-navbar">
        <div className="container app-container">
          <span className="navbar-brand">
            React Exercises
          </span>
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/" end>
              Home
            </NavLink>
            <NavLink className="nav-link" to="/profile">
              Profile
            </NavLink>
            <NavLink className="nav-link" to="/shop">
              Shop
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="container app-container page-content">
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <HomeScreen />
              </ErrorBoundary>
            }
          />
          <Route
            path="/profile"
            element={
              <ErrorBoundary>
                <ProfileScreen />
              </ErrorBoundary>
            }
          />
          <Route
            path="/shop"
            element={
              <ErrorBoundary>
                <ShopScreen />
              </ErrorBoundary>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
