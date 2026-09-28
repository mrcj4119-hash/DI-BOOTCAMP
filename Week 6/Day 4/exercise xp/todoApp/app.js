import { TodoList } from './todo.js';

const myTodoList = new TodoList();

// 1. Add tasks
myTodoList.addTask('Buy groceries');
myTodoList.addTask('Finish Node.js exercise');
myTodoList.addTask('Go for a run');

// 2. List tasks before completing any
myTodoList.listTasks();

// 3. Mark a task as complete
myTodoList.markComplete(2);

// 4. List tasks again to see updated status
myTodoList.listTasks();