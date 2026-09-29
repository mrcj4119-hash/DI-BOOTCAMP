const db = require('../config/db');

// Get all books
const getAllBooks = () => {
  return db('books').select('*');
};

// Get a single book by ID
const getBookById = (id) => {
  return db('books').where({ id }).first();
};

// Create a new book
const createBook = (title, author, publishedYear) => {
  return db('books')
    .insert({ title, author, publishedYear })
    .returning('*');
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
};