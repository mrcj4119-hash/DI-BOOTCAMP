import { useState, type ReactNode } from 'react'

export interface TableColumn<T extends { id: number | string }> {
  key: keyof T
  title: string
  sortable?: boolean
  render?: (value: T[keyof T], row: T) => ReactNode
}

interface DataTableProps<T extends { id: number | string }> {
  data: T[]
  columns: TableColumn<T>[]
  onSort?: (key: keyof T, direction: 'ascending' | 'descending') => void
  onSelect?: (selectedItems: T[]) => void
}

interface SortConfig<T> {
  key: keyof T
  direction: 'ascending' | 'descending'
}

function compareValues(left: unknown, right: unknown): number {
  if (left == null || right == null) {
    return left == null ? (right == null ? 0 : -1) : 1
  }
  if (typeof left === 'number' && typeof right === 'number') {
    return left - right
  }
  if (typeof left === 'boolean' && typeof right === 'boolean') {
    return Number(left) - Number(right)
  }
  return String(left).localeCompare(String(right), undefined, {
    numeric: true,
    sensitivity: 'base',
  })
}

function DataTable<T extends { id: number | string }>({
  data,
  columns,
  onSort,
  onSelect,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<T['id']>>(() => new Set())
  const visibleData = sortConfig
    ? [...data].sort((left, right) => {
        const result = compareValues(left[sortConfig.key], right[sortConfig.key])
        return sortConfig.direction === 'ascending' ? result : -result
      })
    : data
  const allSelected =
    data.length > 0 && data.every((item) => selectedIds.has(item.id))

  const updateSelection = (nextIds: Set<T['id']>) => {
    setSelectedIds(nextIds)
    onSelect?.(data.filter((item) => nextIds.has(item.id)))
  }

  const toggleRow = (id: T['id']) => {
    const nextIds = new Set(selectedIds)
    if (nextIds.has(id)) {
      nextIds.delete(id)
    } else {
      nextIds.add(id)
    }
    updateSelection(nextIds)
  }

  const toggleAll = () => {
    updateSelection(allSelected ? new Set() : new Set(data.map((item) => item.id)))
  }

  const handleSort = (key: keyof T) => {
    const direction =
      sortConfig?.key === key && sortConfig.direction === 'ascending'
        ? 'descending'
        : 'ascending'
    setSortConfig({ key, direction })
    onSort?.(key, direction)
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th scope="col">
              <input
                type="checkbox"
                aria-label="Select all rows"
                checked={allSelected}
                onChange={toggleAll}
              />
            </th>
            {columns.map((column) => (
              <th scope="col" key={String(column.key)}>
                {column.sortable ? (
                  <button type="button" onClick={() => handleSort(column.key)}>
                    {column.title}
                    {sortConfig?.key === column.key
                      ? sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'
                      : ' ↕'}
                  </button>
                ) : (
                  column.title
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleData.length === 0 ? (
            <tr><td colSpan={columns.length + 1}>No rows to display.</td></tr>
          ) : (
            visibleData.map((row) => (
              <tr key={row.id}>
                <td>
                  <input
                    type="checkbox"
                    aria-label={`Select row ${row.id}`}
                    checked={selectedIds.has(row.id)}
                    onChange={() => toggleRow(row.id)}
                  />
                </td>
                {columns.map((column) => (
                  <td key={String(column.key)}>
                    {column.render
                      ? column.render(row[column.key], row)
                      : String(row[column.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
