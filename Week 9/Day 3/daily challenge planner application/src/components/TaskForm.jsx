import { useState } from 'react'

function TaskForm({ initialTask, submitLabel, onSave, onCancel }) {
  const [title, setTitle] = useState(initialTask?.title || '')
  const [time, setTime] = useState(initialTask?.time || '')
  const [notes, setNotes] = useState(initialTask?.notes || '')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const cleanTitle = title.trim()

    if (!cleanTitle) {
      setError('Give your task a name before saving.')
      return
    }

    onSave({ title: cleanTitle, time, notes: notes.trim() })
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="form-field form-title" htmlFor="task-title">
        <span>Task name</span>
        <input
          id="task-title"
          autoFocus
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
            setError('')
          }}
          placeholder="What would you like to get done?"
          maxLength={100}
        />
      </label>
      {error && (
        <p className="form-validation" role="alert">
          {error}
        </p>
      )}
      <div className="form-row">
        <label className="form-field" htmlFor="task-time">
          <span>
            Time <small>OPTIONAL</small>
          </span>
          <input id="task-time" type="time" value={time} onChange={(event) => setTime(event.target.value)} />
        </label>
        <label className="form-field" htmlFor="task-notes">
          <span>
            Note <small>OPTIONAL</small>
          </span>
          <input
            id="task-notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="A little reminder..."
            maxLength={160}
          />
        </label>
      </div>
      <div className="form-actions">
        <button className="cancel-button" type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className="save-button" type="submit">
          {submitLabel} <span aria-hidden="true">↗</span>
        </button>
      </div>
    </form>
  )
}

export default TaskForm
