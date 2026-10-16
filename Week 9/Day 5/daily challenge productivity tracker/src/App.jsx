import { useCallback, useState } from 'react'
import CategorySelector from './components/CategorySelector.jsx'
import TaskList from './components/TaskList.jsx'
import './App.css'

function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState('all')
  const handleSelectCategory = useCallback((categoryId) => {
    setSelectedCategoryId(categoryId)
  }, [])

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Northstar home">
          <span className="brand-mark" aria-hidden="true">n.</span>
          northstar
        </a>
        <span className="topbar-note">Make room for meaningful work.</span>
      </header>

      <section className="intro" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">WEEK 9 · DAY 5 · DAILY CHALLENGE</p>
          <h1 id="page-title">
            A little more
            <br />
            <span>in focus.</span>
          </h1>
          <p className="intro-description">
            Bring your tasks together, sort them into gentle little buckets,
            and notice how far you have come.
          </p>
        </div>
        <div className="intro-card" aria-hidden="true">
          <span>MAKE TODAY COUNT</span>
          <strong>Progress,<br />not pressure.</strong>
          <span className="intro-flower">✳</span>
        </div>
      </section>

      <div className="workspace">
        <CategorySelector
          onSelectCategory={handleSelectCategory}
          selectedCategoryId={selectedCategoryId}
        />
        <TaskList categoryId={selectedCategoryId} />
      </div>

      <footer className="page-footer">
        <span>React + Redux Toolkit + React Redux</span>
        <span>Built for a more considered day.</span>
      </footer>
    </main>
  )
}

export default App
