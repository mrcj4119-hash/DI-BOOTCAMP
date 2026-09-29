const express = require('express');
const router = express.Router();

// In-memory data store
let posts = [];
let nextId = 1;

// Helper: Find post by ID
const findPost = (id) => posts.find((p) => p.id === parseInt(id));

// 1. GET /posts - Retrieve all blog posts
router.get('/', (req, res) => {
  res.status(200).json(posts);
});

// 2. GET /posts/:id - Retrieve a specific post by ID
router.get('/:id', (req, res) => {
  const post = findPost(req.params.id);
  if (!post) {
    return res.status(404).json({ error: 'Blog post not found' });
  }
  res.status(200).json(post);
});

// 3. POST /posts - Create a new post
router.post('/', (req, res) => {
  const { title, content } = req.body;

  // Validation
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
  }
  if (!content || typeof content !== 'string' || content.trim() === '') {
    return res.status(400).json({ error: 'Content is required and must be a non-empty string' });
  }

  const newPost = {
    id: nextId++,
    title: title.trim(),
    content: content.trim(),
    timestamp: new Date().toISOString()
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// 4. PUT /posts/:id - Update a blog post by ID
router.put('/:id', (req, res) => {
  const post = findPost(req.params.id);
  if (!post) {
    return res.status(404).json({ error: 'Blog post not found' });
  }

  const { title, content } = req.body;

  // Validation (ensure at least one field is updated and valid if provided)
  if (!title && !content) {
    return res.status(400).json({ error: 'At least one field (title or content) is required to update' });
  }
  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    return res.status(400).json({ error: 'Title must be a non-empty string' });
  }
  if (content !== undefined && (typeof content !== 'string' || content.trim() === '')) {
    return res.status(400).json({ error: 'Content must be a non-empty string' });
  }

  if (title) post.title = title.trim();
  if (content) post.content = content.trim();
  post.timestamp = new Date().toISOString(); // Update timestamp on modification

  res.status(200).json(post);
});

// 5. DELETE /posts/:id - Delete a blog post by ID
router.delete('/:id', (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Blog post not found' });
  }

  const deletedPost = posts.splice(index, 1)[0];
  res.status(200).json({ message: 'Post deleted successfully', post: deletedPost });
});

module.exports = router;