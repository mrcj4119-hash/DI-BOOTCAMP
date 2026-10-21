import { useAppSelector } from '../app/hooks'
import { selectVisibleBooks } from '../app/booksSlice'
import BookItemCard from './BookItem'

function BookList() {
  const books = useAppSelector(selectVisibleBooks)

  if (books.length === 0) {
    return (
      <div className="empty-library">
        <span aria-hidden="true">✧</span>
        <h3>No books found</h3>
        <p>Try another search or filter, or add a new book to your library.</p>
      </div>
    )
  }

  return (
    <div className="book-grid">
      {books.map((book) => <BookItemCard book={book} key={book.id} />)}
    </div>
  )
}

export default BookList
