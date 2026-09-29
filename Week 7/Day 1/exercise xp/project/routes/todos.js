// routes/todos.js
const express = require('express');
const router = express.Router();

// Sample in-memory database
let todos = [
  { id: 1, title: 'Learn Express.js', completed: false },
  { id: 2, title: 'Build a To-Do API', completed: false }
];

// GET: Fetch all to-do items
router.get('/', (req, res) => {
  res.json(todos);
});

// POST: Add a new to-do item
router.post('/', (req, res) => {
  const { title } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    title,
    completed: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT: Update a to-do item by ID
router.put('/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const { title, completed } = req.body;

  const todo = todos.find((t) => t.id === todoId);

  if (!todo) {
    return res.status(404).json({ error: 'To-do item not found' });
  }

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json({ message: 'To-do updated successfully', todo });
});

// DELETE: Delete a to-do item by ID
router.delete('/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === todoId);

  if (index === -1) {
    return res.status(404).json({ error: 'To-do item not found' });
  }

  const deletedTodo = todos.splice(index, 1);
  res.json({ message: 'To-do deleted successfully', todo: deletedTodo[0] });
});

module.exports = router;