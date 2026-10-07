import AddTaskForm from './components/AddTaskForm.jsx'
import TaskFilters from './components/TaskFilters.jsx'
import TaskList from './components/TaskList.jsx'
import { useTasks } from './context/TaskContext.jsx'

function App() {
  const { tasks } = useTasks()
  const completedCount = tasks.filter((task) => task.completed).length

  return (
    <main className="app-shell">
      <header className="page-header">
        <div className="brand-mark" aria-hidden="true">✓</div>
        <p className="eyebrow">Week 8 · Day 3 · Daily Challenge</p>
        <h1>Task manager</h1>
        <p className="intro-copy">Make a plan, refine it, and focus on what’s next.</p>
      </header>

      <section className="task-panel" aria-labelledby="tasks-heading">
        <div className="panel-heading">
          <div>
            <p className="panel-kicker">Your workspace</p>
            <h2 id="tasks-heading">My tasks</h2>
          </div>
          <span className="task-summary" aria-live="polite">
            {completedCount} of {tasks.length} done
          </span>
        </div>
        <AddTaskForm />
        <TaskFilters />
        <TaskList />
      </section>

      <footer className="page-footer">
        Add, edit, complete, and filter tasks using shared context and a reducer.
      </footer>
    </main>
  )
}

export default App
