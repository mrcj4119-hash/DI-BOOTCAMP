import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Book } from '../model/Book'

export type ReadingFilter = 'all' | 'unread' | 'reading' | 'read'
export type SortField = 'title' | 'author' | 'addedAt'

export interface BooksState {
  books: Book[]
  categories: string[]
  filter: ReadingFilter
  categoryFilter: string
  searchTerm: string
  sortField: SortField
  sortDirection: 'ascending' | 'descending'
  storageError: string | null
}

const defaultCategories = ['Fiction', 'Fantasy', 'Mystery', 'Non-fiction', 'Uncategorized']
const storageKey = 'quiet-pages-library-v1'

function loadInitialBooks(): { books: Book[]; storageError: string | null } {
  try {
    const stored = localStorage.getItem(storageKey)
    if (stored === null) {
      return { books: [], storageError: null }
    }

    const parsed: unknown = JSON.parse(stored)
    if (!Array.isArray(parsed)) {
      throw new Error('Saved library data must be a list.')
    }

    const books = parsed as Book[]
    for (const book of books) {
      if (
        !book ||
        typeof book.id !== 'string' ||
        typeof book.title !== 'string' ||
        typeof book.author !== 'string' ||
        typeof book.category !== 'string' ||
        typeof book.description !== 'string' ||
        typeof book.addedAt !== 'string' ||
        typeof book.isRead !== 'boolean' ||
        typeof book.progress !== 'number' ||
        !Number.isFinite(book.progress) ||
        book.progress < 0 ||
        book.progress > 100
      ) {
        throw new Error('A saved book has invalid or missing fields.')
      }
    }

    return { books, storageError: null }
  } catch (error) {
    return {
      books: [],
      storageError: error instanceof Error
        ? `Could not load saved library: ${error.message}`
        : 'Could not load saved library.',
    }
  }
}

const initialData = loadInitialBooks()

const initialState: BooksState = {
  books: initialData.books,
  categories: [
    ...new Set([
      ...defaultCategories,
      ...initialData.books.map((book) => book.category),
    ]),
  ],
  filter: 'all',
  categoryFilter: 'all',
  searchTerm: '',
  sortField: 'addedAt',
  sortDirection: 'descending',
  storageError: initialData.storageError,
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook(state, action: PayloadAction<Book>) {
      if (state.books.some((book) => book.id === action.payload.id)) {
        return
      }
      state.books.push(action.payload)
      if (!state.categories.includes(action.payload.category)) {
        state.categories.push(action.payload.category)
      }
    },
    removeBook(state, action: PayloadAction<string>) {
      state.books = state.books.filter((book) => book.id !== action.payload)
    },
    toggleReadStatus(state, action: PayloadAction<string>) {
      const book = state.books.find((item) => item.id === action.payload)
      if (book) {
        book.isRead = !book.isRead
        book.progress = book.isRead ? 100 : 0
      }
    },
    setReadingProgress(
      state,
      action: PayloadAction<{ id: string; progress: number }>,
    ) {
      const book = state.books.find((item) => item.id === action.payload.id)
      if (!book || !Number.isFinite(action.payload.progress)) {
        return
      }

      book.progress = Math.max(0, Math.min(100, action.payload.progress))
      book.isRead = book.progress === 100
    },
    setReadingFilter(state, action: PayloadAction<ReadingFilter>) {
      state.filter = action.payload
    },
    setCategoryFilter(state, action: PayloadAction<string>) {
      state.categoryFilter = action.payload
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload
    },
    setSortField(state, action: PayloadAction<SortField>) {
      state.sortField = action.payload
    },
    toggleSortDirection(state) {
      state.sortDirection =
        state.sortDirection === 'ascending' ? 'descending' : 'ascending'
    },
    addCategory(state, action: PayloadAction<string>) {
      const category = action.payload.trim()
      if (
        category &&
        category.toLocaleLowerCase() !== 'all' &&
        !state.categories.some(
          (existing) => existing.toLocaleLowerCase() === category.toLocaleLowerCase(),
        )
      ) {
        state.categories.push(category)
      }
    },
    removeCategory(state, action: PayloadAction<string>) {
      const category = action.payload
      if (category === 'Uncategorized') {
        return
      }

      state.categories = state.categories.filter((item) => item !== category)
      state.books = state.books.map((book) =>
        book.category === category ? { ...book, category: 'Uncategorized' } : book,
      )
      if (state.categoryFilter === category) {
        state.categoryFilter = 'all'
      }
    },
    importBooks(state, action: PayloadAction<Book[]>) {
      const byId = new Map(state.books.map((book) => [book.id, book]))
      for (const book of action.payload) {
        byId.set(book.id, book)
        if (!state.categories.includes(book.category)) {
          state.categories.push(book.category)
        }
      }
      state.books = [...byId.values()]
      state.storageError = null
    },
    setStorageError(state, action: PayloadAction<string | null>) {
      state.storageError = action.payload
    },
  },
})

export const {
  addBook,
  removeBook,
  toggleReadStatus,
  setReadingProgress,
  setReadingFilter,
  setCategoryFilter,
  setSearchTerm,
  setSortField,
  toggleSortDirection,
  addCategory,
  removeCategory,
  importBooks,
  setStorageError,
} = booksSlice.actions

interface StateWithBooks {
  books: BooksState
}

export const selectBooks = (state: StateWithBooks) => state.books.books
export const selectFilter = (state: StateWithBooks) => state.books.filter
export const selectCategoryFilter = (state: StateWithBooks) => state.books.categoryFilter
export const selectSearchTerm = (state: StateWithBooks) => state.books.searchTerm
export const selectSortField = (state: StateWithBooks) => state.books.sortField
export const selectSortDirection = (state: StateWithBooks) => state.books.sortDirection
export const selectCategories = (state: StateWithBooks) => state.books.categories
export const selectStorageError = (state: StateWithBooks) => state.books.storageError

export const selectVisibleBooks = createSelector(
  [selectBooks, selectFilter, selectCategoryFilter, selectSearchTerm, selectSortField, selectSortDirection],
  (books, filter, category, searchTerm, sortField, sortDirection) => {
    const query = searchTerm.trim().toLocaleLowerCase()
    const filtered = books.filter((book) => {
      const matchesReading =
        filter === 'all' ||
        (filter === 'read' && book.isRead) ||
        (filter === 'unread' && book.progress === 0) ||
        (filter === 'reading' && !book.isRead && book.progress > 0)
      const matchesCategory = category === 'all' || book.category === category
      const matchesSearch =
        !query ||
        `${book.title} ${book.author} ${book.category}`.toLocaleLowerCase().includes(query)
      return matchesReading && matchesCategory && matchesSearch
    })

    return [...filtered].sort((first, second) => {
      const comparison =
        sortField === 'addedAt'
          ? first.addedAt.localeCompare(second.addedAt)
          : first[sortField].localeCompare(second[sortField], undefined, {
              sensitivity: 'base',
            })
      return sortDirection === 'ascending' ? comparison : -comparison
    })
  },
)

export default booksSlice.reducer
