interface ListProps<T> {
  items: T[]
  getKey: (item: T) => string
  renderItem: (item: T) => React.ReactNode
}

function List<T>({ items, getKey, renderItem }: ListProps<T>) {
  if (items.length === 0) {
    return <p className="empty-state">Your shelf is waiting for its first book.</p>
  }

  return (
    <ul className="book-list">
      {items.map((item) => (
        <li className="book-list-item" key={getKey(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}

export default List
