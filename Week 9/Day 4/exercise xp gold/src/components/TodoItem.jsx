import RemoveTodo from './RemoveTodo.jsx'
import ToggleTodo from './ToggleTodo.jsx'

function TodoItem({ todo }) {
  return (
    <li className={`todo-item${todo.completed ? ' is-complete' : ''}`}>
      <ToggleTodo id={todo.id} completed={todo.completed} title={todo.title} />
      <span className="todo-text">{todo.title}</span>
      <RemoveTodo id={todo.id} title={todo.title} />
    </li>
  )
}

export default TodoItem
