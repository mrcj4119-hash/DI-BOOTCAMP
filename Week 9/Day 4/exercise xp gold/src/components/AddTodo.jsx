import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todos/todosSlice.js'

function AddTodo() {
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      return
    }

    dispatch(addTodo(trimmedTitle))
    setTitle('')
  }

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Add a task to your list</label>
      <div className="add-controls">
        <input
          id="new-todo"
          name="todo"
          type="text"
          placeholder="What would you like to get done?"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={160}
          required
        />
        <button type="submit">
          Add to list <span aria-hidden="true">+</span>
        </button>
      </div>
    </form>
  )
}

export default AddTodo
