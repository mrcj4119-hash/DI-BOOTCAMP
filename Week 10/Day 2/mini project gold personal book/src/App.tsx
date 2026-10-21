import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks'
import {
  importBooks,
  selectBooks,
  selectStorageError,
  setStorageError,
} from './app/booksSlice'
import { BookItem } from './model/Book'
import BookInput from './components/BookInput'
import BookList from './components/BookList'
import LibraryControls from './components/LibraryControls'
import './App.css'

const storageKey = 'quiet-pages-library-v1'

function App() {
  const books = useAppSelector(selectBooks)
  const storageError = useAppSelector(selectStorageError)
  const dispatch = useAppDispatch()
  const importInputRef = useRef<HTMLInputElement>(null)
  const skipInitialSave = useRef(true)
  const [appMessage, setAppMessage] = useState('')

  useEffect(() => {
    if (skipInitialSave.current) {
      skipInitialSave.current = false
      return
    }

    try {
      localStorage.setItem(storageKey, JSON.stringify(books))
      if (storageError) {
        dispatch(setStorageError(null))
      }
    } catch (error) {
      dispatch(
        setStorageError(
          error instanceof Error
            ? `Could not save your library: ${error.message}`
            : 'Could not save your library.',
        ),
      )
    }
  }, [books, dispatch, storageError])

  const total = books.length
  const readCount = books.filter((book) => book.isRead).length
  const readingCount = books.filter(
    (book) => !book.isRead && book.progress > 0,
  ).length

  function exportLibrary() {
    const file = new Blob([JSON.stringify(books, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = url
    link.download = 'quiet-pages-library.json'
    link.click()
    URL.revokeObjectURL(url)
    setAppMessage('Your library export is ready.')
  }

  async function importLibrary(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) {
      return
    }

    try {
      const parsed: unknown = JSON.parse(await file.text())
      if (!Array.isArray(parsed)) {
        throw new Error('The import file must contain a list of books.')
      }

      const booksToImport = parsed.map((item) => BookItem.deserialize(item).serialize())
      dispatch(importBooks(booksToImport))
      setAppMessage(`${booksToImport.length} book${booksToImport.length === 1 ? '' : 's'} imported.`)
    } catch (error) {
      setAppMessage(
        error instanceof Error
          ? `Import failed: ${error.message}`
          : 'Import failed because the file is invalid.',
      )
    }
  }

  return (
    <main className="app-shell">
      <header className="page-header">
        <div className="brand-mark" aria-hidden="true">qp</div>
        <p className="eyebrow">A home for your next favorite</p>
        <h1>Quiet <span>Pages</span></h1>
        <p className="page-intro">Keep your reading life close, one book at a time.</p>
      </header>

      {storageError && <p className="storage-alert" role="alert">{storageError}</p>}
      {appMessage && <p className="app-message" role="status">{appMessage}</p>}

      <section className="stats-grid" aria-label="Reading statistics">
        <article className="stat-card">
          <span className="stat-label">In your library</span>
          <strong>{total}</strong>
          <span className="stat-note">books collected</span>
        </article>
        <article className="stat-card">
          <span className="stat-label">Finished</span>
          <strong>{readCount}</strong>
          <span className="stat-note">{total ? Math.round((readCount / total) * 100) : 0}% of your library</span>
        </article>
        <article className="stat-card">
          <span className="stat-label">In progress</span>
          <strong>{readingCount}</strong>
          <span className="stat-note">stories underway</span>
        </article>
      </section>

      <BookInput />

      <section className="collection-section" aria-labelledby="collection-heading">
        <div className="collection-header">
          <div>
            <p className="eyebrow">The shelves</p>
            <h2 id="collection-heading">Your library</h2>
          </div>
          <div className="data-actions">
            <button className="button button-outline" type="button" onClick={exportLibrary}>
              Export
            </button>
            <button
              className="button button-outline"
              type="button"
              onClick={() => importInputRef.current?.click()}
            >
              Import
            </button>
            <input
              ref={importInputRef}
              className="sr-only"
              type="file"
              accept="application/json,.json"
              onChange={importLibrary}
              aria-label="Import book library JSON file"
            />
          </div>
        </div>
        <LibraryControls />
        <BookList />
      </section>
      <footer>Make time for the pages that stay with you.</footer>
    </main>
  )
}

export default App
