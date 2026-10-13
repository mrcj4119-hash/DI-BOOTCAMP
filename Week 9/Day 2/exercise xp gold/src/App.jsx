import { useState } from 'react'
import { connect } from 'react-redux'
import { addCategory, addTodo, clearError, removeTodo, toggleTodo } from './redux/actions.js'
import './App.css'

function CategoryItem({ category, count, selected, onSelect }) {
  return (
    <button
      className={`category-item${selected ? ' is-selected' : ''}`}
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(category.id)}
    >
      <span className={`category-icon tone-${category.tone}`} aria-hidden="true">{category.name.slice(0, 1).toUpperCase()}</span>
      <span className="category-name">{category.name}</span>
      <span className="category-count">{count}</span>
      <span className="category-chevron" aria-hidden="true">›</span>
    </button>
  )
}

function TodoRow({ todo, categoryId, onToggleTodo, onRemoveTodo }) {
  return (
    <li className={todo.completed ? 'todo-row is-complete' : 'todo-row'}>
      <button
        className="toggle-button"
        type="button"
        aria-label={todo.completed ? `Mark ${todo.text} as active` : `Complete ${todo.text}`}
        aria-pressed={todo.completed}
        onClick={() => onToggleTodo(categoryId, todo.id)}
      >
        {todo.completed && <span aria-hidden="true">✓</span>}
      </button>
      <span className="todo-text">{todo.text}</span>
      <button
        className="remove-button"
        type="button"
        aria-label={`Remove ${todo.text}`}
        onClick={() => onRemoveTodo(categoryId, todo.id)}
      >
        <span aria-hidden="true">×</span>
      </button>
    </li>
  )
}

function TodoApp({
  categories,
  todosByCategory,
  error,
  onAddCategory,
  onAddTodo,
  onToggleTodo,
  onRemoveTodo,
  onClearError,
}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.id || '')
  const [categoryFormOpen, setCategoryFormOpen] = useState(false)
  const selectedCategory = categories.find((category) => category.id === selectedCategoryId) || categories[0]
  const selectedTodos = selectedCategory ? todosByCategory[selectedCategory.id] || [] : []
  const totalTodos = Object.values(todosByCategory).reduce((total, todos) => total + todos.length, 0)
  const completedTodos = Object.values(todosByCategory).flat().filter((todo) => todo.completed).length
  const activeTodos = selectedTodos.filter((todo) => !todo.completed).length

  function handleAddTodo(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const text = formData.get('todo')
    if (typeof text === 'string' && text.trim() && selectedCategory) {
      onAddTodo(selectedCategory.id, text.trim())
      event.currentTarget.reset()
    }
  }

  function handleAddCategory(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('category')
    if (typeof name === 'string' && name.trim()) {
      onAddCategory(name.trim())
      event.currentTarget.reset()
      setCategoryFormOpen(false)
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Little List home">
          <span className="brand-mark" aria-hidden="true">l.</span>
          <span>little list</span>
        </a>
        <span className="course-label">WEEK 9 <span aria-hidden="true">/</span> DAY 2 <span aria-hidden="true">/</span> XP GOLD</span>
      </header>

      <section className="page-intro">
        <div>
          <p className="eyebrow">A place for everything</p>
          <h1>Make space for<br /><span>what matters.</span></h1>
        </div>
        <div className="day-summary" aria-label={`${completedTodos} of ${totalTodos} tasks complete`}>
          <span className="summary-check" aria-hidden="true">✓</span>
          <span><strong>{completedTodos}</strong> <i>/</i> {totalTodos}<small>DONE TODAY</small></span>
        </div>
      </section>

      {error && (
        <p className="notice" role="alert">
          <span>{error}</span>
          <button type="button" aria-label="Dismiss message" onClick={onClearError}>×</button>
        </p>
      )}

      <div className="workspace">
        <aside className="sidebar" aria-label="Todo categories">
          <div className="sidebar-heading">
            <div>
              <p className="eyebrow">YOUR SPACES</p>
              <h2>Categories</h2>
            </div>
            <span className="category-total">{categories.length}</span>
          </div>

          <nav className="category-list" aria-label="Select a category">
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                count={(todosByCategory[category.id] || []).length}
                selected={selectedCategory?.id === category.id}
                onSelect={setSelectedCategoryId}
              />
            ))}
          </nav>

          {categoryFormOpen ? (
            <form className="category-form" onSubmit={handleAddCategory}>
              <label className="visually-hidden" htmlFor="new-category">Category name</label>
              <input id="new-category" name="category" placeholder="e.g. Home" maxLength={30} autoFocus />
              <button type="submit" aria-label="Save category">↗</button>
              <button className="cancel-category" type="button" aria-label="Cancel" onClick={() => setCategoryFormOpen(false)}>×</button>
            </form>
          ) : (
            <button className="add-category-button" type="button" onClick={() => setCategoryFormOpen(true)}>
              <span aria-hidden="true">+</span> New category
            </button>
          )}

          <div className="sidebar-note">
            <span className="note-sparkle" aria-hidden="true">✳</span>
            <p>Little by little<br />adds up to a lot.</p>
          </div>
        </aside>

        <section className="todo-panel" aria-labelledby="category-title">
          {selectedCategory ? (
            <>
              <header className="panel-heading">
                <div className="panel-title">
                  <span className={`category-icon category-icon-large tone-${selectedCategory.tone}`} aria-hidden="true">
                    {selectedCategory.name.slice(0, 1).toUpperCase()}
                  </span>
                  <div>
                    <p className="eyebrow">YOUR CATEGORY</p>
                    <h2 id="category-title">{selectedCategory.name}</h2>
                  </div>
                </div>
                <span className="task-count">{selectedTodos.length} {selectedTodos.length === 1 ? 'task' : 'tasks'}</span>
              </header>

              <form className="add-form" onSubmit={handleAddTodo}>
                <label className="visually-hidden" htmlFor="new-todo">Add a task to {selectedCategory.name}</label>
                <span className="add-icon" aria-hidden="true">+</span>
                <input id="new-todo" name="todo" placeholder={`Add a ${selectedCategory.name.toLowerCase()} task...`} maxLength={120} />
                <button type="submit">Add task <span aria-hidden="true">↗</span></button>
              </form>

              <div className="list-toolbar">
                <h3>On your mind <span>{activeTodos} active</span></h3>
                <span className="category-progress">{selectedTodos.length === 0 ? 'A fresh start' : `${selectedTodos.length - activeTodos} of ${selectedTodos.length} done`}</span>
              </div>

              {selectedTodos.length > 0 ? (
                <ul className="todo-list">
                  {selectedTodos.map((todo) => (
                    <TodoRow
                      key={todo.id}
                      todo={todo}
                      categoryId={selectedCategory.id}
                      onToggleTodo={onToggleTodo}
                      onRemoveTodo={onRemoveTodo}
                    />
                  ))}
                </ul>
              ) : (
                <div className="empty-state" role="status">
                  <span className={`empty-illustration tone-${selectedCategory.tone}`} aria-hidden="true">
                    <span>✓</span>
                  </span>
                  <p>This category is ready for you.</p>
                  <span>Add a task above and take it one step at a time.</span>
                </div>
              )}

              <footer className="panel-footer">
                <span>ONE THING AT A TIME</span>
                <span>{totalTodos === 0 ? 'START SMALL, GO FAR' : `${totalTodos} TASKS ACROSS ${categories.length} SPACES`}</span>
              </footer>
            </>
          ) : (
            <div className="empty-state">
              <p>Create a category to get started.</p>
              <button type="button" onClick={() => setCategoryFormOpen(true)}>Add your first category</button>
            </div>
          )}
        </section>
      </div>

      <p className="page-note">A little more organized. A little more at ease.</p>
    </main>
  )
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  todosByCategory: state.todosByCategory,
  error: state.error,
})

const mapDispatchToProps = {
  onAddCategory: addCategory,
  onAddTodo: addTodo,
  onToggleTodo: toggleTodo,
  onRemoveTodo: removeTodo,
  onClearError: clearError,
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
