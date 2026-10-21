import { useBookActions } from '../hooks/useBookActions'
import type { Book } from '../model/Book'

interface BookItemProps {
  book: Book
}

function BookItemCard({ book }: BookItemProps) {
  const { removeBook, toggleReadStatus, setReadingProgress } = useBookActions()
  const progressLabel =
    book.isRead ? 'Read' : book.progress > 0 ? 'Currently reading' : 'Want to read'

  return (
    <article className="book-card">
      <div className="book-cover" aria-hidden="true">
        <span>{book.title.slice(0, 1).toLocaleUpperCase()}</span>
        <i />
      </div>
      <div className="book-info">
        <div className="book-meta">
          <span className="category-tag">{book.category}</span>
          <span className={`reading-tag ${book.isRead ? 'is-read' : ''}`}>
            {progressLabel}
          </span>
        </div>
        <h3>{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        {book.description && <p className="book-description">{book.description}</p>}
        <label className="progress-control">
          <span>
            Reading progress <strong>{book.progress}%</strong>
          </span>
          <input
            aria-label={`Reading progress for ${book.title}`}
            type="range"
            min="0"
            max="100"
            step="5"
            value={book.progress}
            onChange={(event) => setReadingProgress(book.id, Number(event.target.value))}
          />
        </label>
        <div className="book-actions">
          <button
            className="text-button"
            type="button"
            onClick={() => toggleReadStatus(book.id)}
          >
            {book.isRead ? 'Mark unread' : 'Mark read'}
          </button>
          <button
            className="text-button text-button-danger"
            type="button"
            aria-label={`Remove ${book.title} from library`}
            onClick={() => removeBook(book.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  )
}

export default BookItemCard
