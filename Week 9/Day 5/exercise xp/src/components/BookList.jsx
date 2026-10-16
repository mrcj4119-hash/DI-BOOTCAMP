import { useSelector } from 'react-redux'
import {
  selectBooks,
  selectFantasyBooks,
  selectHorrorBooks,
  selectScienceFictionBooks,
} from '../features/books/booksSelectors.js'

const genres = [
  { id: 'all', label: 'All books', selector: selectBooks },
  { id: 'horror', label: 'Horror', selector: selectHorrorBooks },
  { id: 'fantasy', label: 'Fantasy', selector: selectFantasyBooks },
  { id: 'science-fiction', label: 'Science fiction', selector: selectScienceFictionBooks },
]

function BookList({ genre }) {
  const books = useSelector(genres.find((item) => item.id === genre).selector)

  if (books.length === 0) {
    return (
      <div className="empty-state">
        <span aria-hidden="true">✳</span>
        <p>No books in this shelf yet.</p>
      </div>
    )
  }

  return (
    <ul className="book-grid" aria-live="polite">
      {books.map((book, index) => (
        <li className="book-card" key={book.id}>
          <div className={`book-cover cover-${(index % 4) + 1}`} aria-hidden="true">
            <span className="cover-mark">✳</span>
            <span className="cover-genre">{book.genre}</span>
            <span className="cover-title">{book.title}</span>
            <span className="cover-author">{book.author}</span>
          </div>
          <div className="book-details">
            <span className="book-genre">{book.genre}</span>
            <h3>{book.title}</h3>
            <p>by {book.author}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default BookList
