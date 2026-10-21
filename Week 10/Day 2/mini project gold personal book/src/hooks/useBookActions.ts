import {
  addBook,
  addCategory,
  removeBook,
  removeCategory,
  setCategoryFilter,
  setReadingFilter,
  setReadingProgress,
  setSearchTerm,
  setSortField,
  toggleReadStatus,
  toggleSortDirection,
  type ReadingFilter,
  type SortField,
} from '../app/booksSlice'
import { useAppDispatch } from '../app/hooks'
import type { Book } from '../model/Book'

export function useBookActions() {
  const dispatch = useAppDispatch()

  return {
    addBook: (book: Book) => dispatch(addBook(book)),
    removeBook: (id: string) => dispatch(removeBook(id)),
    toggleReadStatus: (id: string) => dispatch(toggleReadStatus(id)),
    setReadingProgress: (id: string, progress: number) =>
      dispatch(setReadingProgress({ id, progress })),
    setReadingFilter: (filter: ReadingFilter) => dispatch(setReadingFilter(filter)),
    setCategoryFilter: (category: string) => dispatch(setCategoryFilter(category)),
    setSearchTerm: (term: string) => dispatch(setSearchTerm(term)),
    setSortField: (field: SortField) => dispatch(setSortField(field)),
    toggleSortDirection: () => dispatch(toggleSortDirection()),
    addCategory: (category: string) => dispatch(addCategory(category)),
    removeCategory: (category: string) => dispatch(removeCategory(category)),
  }
}
