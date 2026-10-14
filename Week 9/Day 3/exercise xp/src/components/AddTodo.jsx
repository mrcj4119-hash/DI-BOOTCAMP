import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todos/todosSlice.js'

function AddTodo() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault()
    const title = text.trim()

    if (!title) {
      return
    }

    dispatch(
      addTodo({
        id: crypto.randomUUID(),
        text: title,
        completed: false,
      }),
    )
    setText('')
  }

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="new-todo">
        What needs doing?
      </label>
      <input
        id="new-todo"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="What needs doing?"
        maxLength={120}
      />
      <button className="add-button" type="submit">
        <span aria-hidden="true">+</span>
        Add task
      </button>
    </form>
  )
}

export default AddTodo
