import { useEffect, useState, type FormEvent } from 'react'
import {
  selectCategories,
  selectCategoryFilter,
  selectFilter,
  selectSearchTerm,
  selectSortDirection,
  selectSortField,
} from '../app/booksSlice'
import { useAppSelector } from '../app/hooks'
import { useBookActions } from '../hooks/useBookActions'

function LibraryControls() {
  const categories = useAppSelector(selectCategories)
  const filter = useAppSelector(selectFilter)
  const categoryFilter = useAppSelector(selectCategoryFilter)
  const searchTerm = useAppSelector(selectSearchTerm)
  const sortField = useAppSelector(selectSortField)
  const sortDirection = useAppSelector(selectSortDirection)
  const {
    setReadingFilter,
    setCategoryFilter,
    setSearchTerm,
    setSortField,
    toggleSortDirection,
    addCategory,
    removeCategory,
  } = useBookActions()
  const [searchInput, setSearchInput] = useState(searchTerm)
  const [newCategory, setNewCategory] = useState('')
  const [categoryError, setCategoryError] = useState('')

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setSearchTerm(searchInput), 250)
    return () => window.clearTimeout(timeoutId)
  }, [searchInput, setSearchTerm])

  function handleAddCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const category = newCategory.trim()
    if (
      !category ||
      category.toLocaleLowerCase() === 'all' ||
      categories.some((item) => item.toLocaleLowerCase() === category.toLocaleLowerCase())
    ) {
      setCategoryError('Enter a new, unique category name.')
      return
    }

    addCategory(category)
    setNewCategory('')
    setCategoryError('')
  }

  return (
    <section className="library-tools" aria-label="Search, filter, and sort books">
      <label className="search-field">
        <span className="sr-only">Search books</span>
        <span className="search-icon" aria-hidden="true">⌕</span>
        <input
          type="search"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Search titles, authors, categories..."
        />
      </label>
      <div className="tool-row">
        <label className="tool-select">
          <span>Reading</span>
          <select
            value={filter}
            onChange={(event) =>
              setReadingFilter(event.target.value as typeof filter)
            }
          >
            <option value="all">All books</option>
            <option value="unread">Want to read</option>
            <option value="reading">Currently reading</option>
            <option value="read">Read</option>
          </select>
        </label>
        <label className="tool-select">
          <span>Category</span>
          <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>
        <label className="tool-select">
          <span>Sort by</span>
          <select
            value={sortField}
            onChange={(event) =>
              setSortField(event.target.value as typeof sortField)
            }
          >
            <option value="addedAt">Date added</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
          </select>
        </label>
        <button
          className="direction-button"
          type="button"
          onClick={toggleSortDirection}
          aria-label={`Sort ${sortDirection === 'ascending' ? 'descending' : 'ascending'}`}
          title={`Currently ${sortDirection}`}
        >
          {sortDirection === 'ascending' ? '↑' : '↓'}
        </button>
      </div>
      <details className="category-manager">
        <summary>Manage categories</summary>
        <div className="category-manager-content">
          <form onSubmit={handleAddCategory}>
            <label className="sr-only" htmlFor="new-category">New category</label>
            <input
              id="new-category"
              value={newCategory}
              onChange={(event) => setNewCategory(event.target.value)}
              placeholder="New category name"
              maxLength={32}
            />
            <button className="button button-small" type="submit">Add</button>
          </form>
          {categoryError && <p className="form-error" role="alert">{categoryError}</p>}
          <ul>
            {categories.map((category) => (
              <li key={category}>
                <span>{category}</span>
                {category !== 'Uncategorized' && (
                  <button
                    className="category-remove"
                    type="button"
                    aria-label={`Delete ${category} category`}
                    onClick={() => removeCategory(category)}
                  >
                    ×
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </details>
    </section>
  )
}

export default LibraryControls
