const db = require('../config/db');

// Get all todos
const getAllTodos = () => {
  return db('tasks').select('*');
};

// Get a single todo by ID
const getTodoById = (id) => {
  return db('tasks').where({ id }).first();
};

// Create a new todo
const createTodo = (title, completed = false) => {
  return db('tasks')
    .insert({ title, completed })
    .returning('*');
};

// Update an existing todo
const updateTodo = (id, title, completed) => {
  return db('tasks')
    .where({ id })
    .update({ title, completed })
    .returning('*');
};

// Delete a todo
const deleteTodo = (id) => {
  return db('tasks').where({ id }).del();
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};