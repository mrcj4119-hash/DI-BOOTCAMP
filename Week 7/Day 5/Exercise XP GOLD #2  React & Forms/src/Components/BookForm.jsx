import { useState } from 'react'

const emptyBook = {
  title: '',
  author: '',
  genre: '',
  yearPublished: '',
}

function BookForm() {
  const [book, setBook] = useState(emptyBook)
  const [submittedBook, setSubmittedBook] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setBook((currentBook) => ({ ...currentBook, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const bookData = { ...book }
    setSubmittedBook(bookData)
    console.log('Book submitted:', bookData)
  }

  return (
    <section className="exercise-panel book-panel" aria-labelledby="book-heading">
      <div className="panel-heading">
        <span className="panel-index">01</span>
        <div>
          <p className="panel-kicker">Exercise 1</p>
          <h2 id="book-heading">Add a book</h2>
        </div>
      </div>

      <form className="form-fields" onSubmit={handleSubmit}>
        <label htmlFor="book-title">Title</label>
        <input id="book-title" name="title" value={book.title} onChange={handleChange} required />

        <label htmlFor="book-author">Author</label>
        <input id="book-author" name="author" value={book.author} onChange={handleChange} required />

        <label htmlFor="book-genre">Genre</label>
        <input id="book-genre" name="genre" value={book.genre} onChange={handleChange} required />

        <label htmlFor="book-year">Year published</label>
        <input
          id="book-year"
          name="yearPublished"
          type="number"
          min="1"
          max={new Date().getFullYear()}
          value={book.yearPublished}
          onChange={handleChange}
          required
        />

        <button className="submit-button" type="submit">Save book <span aria-hidden="true">↗</span></button>
      </form>

      {submittedBook && (
        <div className="success-message" role="status">
          <span className="success-mark" aria-hidden="true">✓</span>
          <div>
            <strong>Book added</strong>
            <p>{submittedBook.title} by {submittedBook.author} · {submittedBook.genre}, {submittedBook.yearPublished}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default BookForm