const db = require('../config/db');

// Fetch all posts
const getAllPosts = () => {
  return db('posts').select('*');
};

// Fetch a single post by ID
const getPostById = (id) => {
  return db('posts').where({ id }).first();
};

// Insert a new post
const createPost = (title, content) => {
  return db('posts')
    .insert({ title, content })
    .returning('*');
};

// Update an existing post
const updatePost = (id, title, content) => {
  return db('posts')
    .where({ id })
    .update({ title, content })
    .returning('*');
};

// Delete a post
const deletePost = (id) => {
  return db('posts').where({ id }).del();
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};