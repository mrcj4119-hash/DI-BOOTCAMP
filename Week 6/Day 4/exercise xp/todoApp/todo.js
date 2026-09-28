export class TodoList {
  constructor() {
    this.tasks = [];
  }

  // Method to add a new task
  addTask(taskText) {
    const newTask = {
      id: this.tasks.length + 1,
      text: taskText,
      completed: false
    };
    this.tasks.push(newTask);
    console.log(`Added task: "${taskText}"`);
  }

  // Method to mark a task as complete by ID
  markComplete(taskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = true;
      console.log(`Marked task #${taskId} ("${task.text}") as complete.`);
    } else {
      console.log(`Task #${taskId} not found.`);
    }
  }

  // Method to list all tasks
  listTasks() {
    console.log('\n--- TODO LIST ---');
    if (this.tasks.length === 0) {
      console.log('No tasks available.');
      return;
    }
    this.tasks.forEach(task => {
      const status = task.completed ? '[✓] Completed' : '[ ] Pending';
      console.log(`${task.id}. ${status} - ${task.text}`);
    });
    console.log('-----------------\n');
  }
}