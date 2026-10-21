import { useState, type FormEvent } from 'react'
import List from './components/List'
import type { Book } from './types'
import './App.css'

const initialBooks: Book[] = [
  { id: 'book-1', title: 'The Hobbit', author: 'J. R. R. Tolkien' },
  { id: 'book-2', title: 'Kindred', author: 'Octavia E. Butler' },
  { id: 'book-3', title: 'Pride and Prejudice', author: 'Jane Austen' },
]

function BookApp() {
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  function addBook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedAuthor = author.trim()

    if (!trimmedTitle || !trimmedAuthor) {
      return
    }

    setBooks((currentBooks) => [
      ...currentBooks,
      {
        id: crypto.randomUUID(),
        title: trimmedTitle,
        author: trimmedAuthor,
      },
    ])
    setTitle('')
    setAuthor('')
  }

  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">Week 10 · Day 1 · Daily Challenge</p>
        <h1>A little more <span>bookish.</span></h1>
        <p className="intro">
          Keep track of the stories you love, one title at a time.
        </p>
      </header>

      <section className="shelf-card" aria-labelledby="shelf-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Your collection</p>
            <h2 id="shelf-heading">On the shelf</h2>
          </div>
          <span className="book-count" aria-label={`${books.length} books`}>
            {books.length} {books.length === 1 ? 'book' : 'books'}
          </span>
        </div>

        <List
          items={books}
          getKey={(book) => book.id}
          renderItem={(book) => (
            <article className="book-card">
              <span className="book-mark" aria-hidden="true">✦</span>
              <div>
                <h3>{book.title}</h3>
                <p>by {book.author}</p>
              </div>
            </article>
          )}
        />
      </section>

      <section className="add-card" aria-labelledby="add-heading">
        <div>
          <p className="eyebrow">Make room for another</p>
          <h2 id="add-heading">Add a book</h2>
        </div>
        <form className="book-form" onSubmit={addBook}>
          <label>
            <span>Book title</span>
            <input
              autoComplete="off"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. The Left Hand of Darkness"
            />
          </label>
          <label>
            <span>Author</span>
            <input
              autoComplete="off"
              required
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              placeholder="e.g. Ursula K. Le Guin"
            />
          </label>
          <button type="submit">Add to shelf <span aria-hidden="true">＋</span></button>
        </form>
      </section>
      <footer>Every good book finds its way to someone.</footer>
    </main>
  )
}

export default BookApp
