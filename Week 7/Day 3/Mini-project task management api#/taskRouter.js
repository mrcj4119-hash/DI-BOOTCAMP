const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const router = express.Router();
const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Helper function to read tasks safely from tasks.json
async function readTasks() {
  try {
    const data = await fs.readFile(TASKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // If tasks.json doesn't exist yet, create it with an empty array
      await fs.writeFile(TASKS_FILE, JSON.stringify([], null, 2));
      return [];
    }
    throw new Error('Failed to read task database.');
  }
}

// Helper function to write tasks back to tasks.json
async function writeTasks(tasks) {
  try {
    await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf8');
  } catch (error) {
    throw new Error('Failed to save task database.');
  }
}

// 1. GET /tasks - Retrieve a list of all tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await readTasks();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
});

// 2. GET /tasks/:id - Retrieve a specific task by ID
router.get('/:id', async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const task = tasks.find((t) => t.id === req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
});

// 3. POST /tasks - Create a new task
router.post('/', async (req, res, next) => {
  try {
    const { title, description } = req.body;

    // Validation
    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Title is required and must be a non-empty string.' });
    }

    const tasks = await readTasks();

    const newTask = {
      id: Date.now().toString(), // Simple unique string ID
      title: title.trim(),
      description: description ? String(description).trim() : '',
      completed: false
    };

    tasks.push(newTask);
    await writeTasks(tasks);

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
});

// 4. PUT /tasks/:id - Update a task by ID
router.put('/:id', async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;

    // Validation: ensure at least one field is provided for update
    if (title === undefined && description === undefined && completed === undefined) {
      return res.status(400).json({
        error: 'Please provide at least one field (title, description, or completed) to update.'
      });
    }

    if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
      return res.status(400).json({ error: 'Title must be a non-empty string.' });
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'Completed must be a boolean value (true or false).' });
    }

    const tasks = await readTasks();
    const taskIndex = tasks.findIndex((t) => t.id === req.params.id);

    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Apply updates
    const updatedTask = {
      ...tasks[taskIndex],
      ...(title !== undefined && { title: title.trim() }),
      ...(description !== undefined && { description: description.trim() }),
      ...(completed !== undefined && { completed })
    };

    tasks[taskIndex] = updatedTask;
    await writeTasks(tasks);

    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
});

// 5. DELETE /tasks/:id - Delete a task by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex((t) => t.id === req.params.id);

    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const [deletedTask] = tasks.splice(taskIndex, 1);
    await writeTasks(tasks);

    res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    next(error);
  }
});

module.exports = router;