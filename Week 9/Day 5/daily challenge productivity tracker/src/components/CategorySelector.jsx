import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCategories,
  selectCategoryById,
} from '../features/productivity/productivitySelectors.js'
import {
  addCategory,
  deleteCategory,
  editCategory,
} from '../features/productivity/productivitySlice.js'

const categoryColors = ['blue', 'peach', 'sage', 'violet']

function CategorySelector({ selectedCategoryId, onSelectCategory }) {
  const dispatch = useDispatch()
  const categories = useSelector(selectCategories)
  const selectedCategory = useSelector((state) => selectCategoryById(state, selectedCategoryId))
  const [newCategory, setNewCategory] = useState('')
  const [editing, setEditing] = useState(false)
  const [categoryName, setCategoryName] = useState('')

  const handleAddCategory = useCallback((event) => {
    event.preventDefault()
    const name = newCategory.trim()

    if (name) {
      dispatch(addCategory(name))
      setNewCategory('')
    }
  }, [dispatch, newCategory])

  const handleSaveCategory = useCallback((event) => {
    event.preventDefault()
    const name = categoryName.trim()

    if (selectedCategory && name) {
      dispatch(editCategory({ id: selectedCategory.id, name }))
      setEditing(false)
    }
  }, [categoryName, dispatch, selectedCategory])

  const handleDeleteCategory = useCallback(() => {
    if (selectedCategory) {
      dispatch(deleteCategory(selectedCategory.id))
      onSelectCategory('all')
    }
  }, [dispatch, onSelectCategory, selectedCategory])

  return (
    <section className="category-panel" aria-labelledby="categories-heading">
      <div className="category-heading">
        <div>
          <p className="eyebrow">YOUR WORKSPACES</p>
          <h2 id="categories-heading">Categories</h2>
        </div>
        <span className="category-total">{categories.length}</span>
      </div>

      <div className="category-options" role="group" aria-label="Select a task category">
        <button
          aria-pressed={selectedCategoryId === 'all'}
          className={`category-option${selectedCategoryId === 'all' ? ' is-selected' : ''}`}
          onClick={() => onSelectCategory('all')}
          type="button"
        >
          <span className="category-icon all-icon" aria-hidden="true">⌘</span>
          <span>Everything</span>
        </button>
        {categories.map((category, index) => (
          <button
            aria-pressed={selectedCategoryId === category.id}
            className={`category-option${selectedCategoryId === category.id ? ' is-selected' : ''}`}
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            type="button"
          >
            <span className={`category-icon color-${category.color || categoryColors[index % categoryColors.length]}`} aria-hidden="true">
              {category.name.charAt(0).toUpperCase()}
            </span>
            <span>{category.name}</span>
          </button>
        ))}
        <button
          aria-pressed={selectedCategoryId === 'uncategorized'}
          className={`category-option${selectedCategoryId === 'uncategorized' ? ' is-selected' : ''}`}
          onClick={() => onSelectCategory('uncategorized')}
          type="button"
        >
          <span className="category-icon uncategorized-icon" aria-hidden="true">·</span>
          <span>Uncategorized</span>
        </button>
      </div>

      {selectedCategory && (
        <div className="category-actions">
          {editing ? (
            <form className="category-edit-form" onSubmit={handleSaveCategory}>
              <label className="visually-hidden" htmlFor="rename-category">Rename category</label>
              <input
                autoFocus
                id="rename-category"
                maxLength={28}
                onChange={(event) => setCategoryName(event.target.value)}
                value={categoryName}
              />
              <button disabled={!categoryName.trim()} type="submit">Save</button>
              <button onClick={() => setEditing(false)} type="button">Cancel</button>
            </form>
          ) : (
            <>
              <button
                className="text-action"
                onClick={() => {
                  setCategoryName(selectedCategory.name)
                  setEditing(true)
                }}
                type="button"
              >
                Rename
              </button>
              <button className="text-action delete-category" onClick={handleDeleteCategory} type="button">
                Delete category
              </button>
            </>
          )}
        </div>
      )}

      <form className="new-category-form" onSubmit={handleAddCategory}>
        <label className="visually-hidden" htmlFor="new-category">New category name</label>
        <input
          id="new-category"
          maxLength={28}
          onChange={(event) => setNewCategory(event.target.value)}
          placeholder="New category..."
          value={newCategory}
        />
        <button aria-label="Add category" disabled={!newCategory.trim()} type="submit">+</button>
      </form>
    </section>
  )
}

export default CategorySelector
