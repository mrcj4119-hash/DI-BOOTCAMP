const STORAGE_KEY = 'daybook-planner-tasks'

export function loadTasks() {
  const savedTasks = localStorage.getItem(STORAGE_KEY)
  if (savedTasks === null) return {}

  let parsedTasks
  try {
    parsedTasks = JSON.parse(savedTasks)
  } catch {
    throw new Error('Saved planner data could not be read. Clear this app’s site data and try again.')
  }

  if (!parsedTasks || typeof parsedTasks !== 'object' || Array.isArray(parsedTasks)) {
    throw new Error('Saved planner data is invalid. Clear this app’s site data and try again.')
  }
  return parsedTasks
}

export function saveTasks(tasksByDate) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksByDate))
  } catch {
    throw new Error('Your browser could not save the planner. Check available storage and try again.')
  }
}
