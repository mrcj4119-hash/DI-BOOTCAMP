const todosModel = require('../models/todosModel');

// GET /api/todos
const getTodos = async (req, res, next) => {
  try {
    const todos = await todosModel.getAllTodos();
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

// GET /api/todos/:id
const getTodo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const todo = await todosModel.getTodoById(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

// POST /api/todos
const createTodo = async (req, res, next) => {
  const { title, completed } = req.body;
  
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const [newTodo] = await todosModel.createTodo(title, completed);
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

// PUT /api/todos/:id
const updateTodo = async (req, res, next) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  if (title === undefined || completed === undefined) {
    return res.status(400).json({ message: 'Title and completed status are required' });
  }

  try {
    const updated = await todosModel.updateTodo(id, title, completed);
    if (updated.length === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(updated[0]);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/todos/:id
const deleteTodo = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedCount = await todosModel.deleteTodo(id);
    if (!deletedCount) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};