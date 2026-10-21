import { useState, type FormEvent } from 'react'
import { useAppSelector } from '../app/hooks'
import { selectCategories } from '../app/booksSlice'
import { useBookActions } from '../hooks/useBookActions'
import { BookItem } from '../model/Book'

function BookInput() {
  const categories = useAppSelector(selectCategories)
  const { addBook } = useBookActions()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('Fiction')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      const book = new BookItem({ title, author, category, description })
      addBook(book.serialize())
      setTitle('')
      setAuthor('')
      setDescription('')
      setError('')
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Could not add this book.')
    }
  }

  return (
    <section className="panel add-panel" aria-labelledby="add-book-heading">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">A new chapter</p>
          <h2 id="add-book-heading">Add a book</h2>
        </div>
        <span className="panel-icon" aria-hidden="true">＋</span>
      </div>
      <form className="book-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Title</span>
          <input
            required
            maxLength={120}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="The name of the book"
          />
        </label>
        <label className="field">
          <span>Author</span>
          <input
            required
            maxLength={100}
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="Who wrote it?"
          />
        </label>
        <label className="field">
          <span>Category</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="field field-wide">
          <span>Note <small>optional</small></span>
          <textarea
            rows={2}
            maxLength={260}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="What made you add this one?"
          />
        </label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button button-primary" type="submit">Add to library</button>
      </form>
    </section>
  )
}

export default BookInput
