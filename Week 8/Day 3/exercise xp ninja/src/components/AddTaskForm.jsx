import { useState } from 'react'
import { useTasks } from '../context/TaskContext.jsx'

function AddTaskForm() {
  const [text, setText] = useState('')
  const { dispatch } = useTasks()

  function handleSubmit(event) {
    event.preventDefault()
    const taskText = text.trim()

    if (!taskText) {
      return
    }

    dispatch({
      type: 'added',
      task: {
        id: crypto.randomUUID(),
        text: taskText,
        completed: false,
      },
    })
    setText('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="task-input">New task</label>
      <input
        id="task-input"
        className="task-input"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Add a task to your list..."
        autoComplete="off"
      />
      <button className="add-button" type="submit" disabled={!text.trim()}>
        <span aria-hidden="true">+</span>
        Add task
      </button>
    </form>
  )
}

export default AddTaskForm
