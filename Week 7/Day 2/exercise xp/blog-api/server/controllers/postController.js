const postsModel = require('../models/postsModel');

// GET /posts
const getPosts = async (req, res, next) => {
  try {
    const posts = await postsModel.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// GET /posts/:id
const getPost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await postsModel.getPostById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

// POST /posts
const createPost = async (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const [newPost] = await postsModel.createPost(title, content);
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

// PUT /posts/:id
const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const updated = await postsModel.updatePost(id, title, content);
    if (updated.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(updated[0]);
  } catch (error) {
    next(error);
  }
};

// DELETE /posts/:id
const deletePost = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedCount = await postsModel.deletePost(id);
    if (!deletedCount) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};