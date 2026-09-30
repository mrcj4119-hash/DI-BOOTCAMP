const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const bcrypt = require('bcryptjs');

const router = express.Router();
const USERS_FILE = path.join(__dirname, 'users.json');

// Helper function: Read users from users.json safely
async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(USERS_FILE, JSON.stringify([], null, 2));
      return [];
    }
    throw new Error('Database read failure.');
  }
}

// Helper function: Write users to users.json safely
async function writeUsers(users) {
  try {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
  } catch (error) {
    throw new Error('Database write failure.');
  }
}

// 1. POST /register - Register a new user
router.post('/register', async (req, res, next) => {
  try {
    const { name, lastName, email, username, password } = req.body;

    if (!name || !lastName || !email || !username || !password) {
      return res.status(400).json({ error: 'All fields (name, lastName, email, username, password) are required.' });
    }

    const users = await readUsers();

    // Check if username already exists
    const usernameExists = users.some((u) => u.username.toLowerCase() === username.toLowerCase());
    if (usernameExists) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Check if password matches an existing password (comparing against stored bcrypt hashes)
    for (const u of users) {
      const isMatch = await bcrypt.compare(password, u.password);
      if (isMatch) {
        return res.status(400).json({ error: 'Password already exists' });
      }
    }

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      username: username.trim(),
      password: hashedPassword
    };

    users.push(newUser);
    await writeUsers(users);

    res.status(201).json({
      message: 'Hello Your account is created',
      user: {
        id: newUser.id,
        name: newUser.name,
        lastName: newUser.lastName,
        email: newUser.email,
        username: newUser.username
      }
    });
  } catch (err) {
    next(err);
  }
});

// 2. POST /login - Login an existing user
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const users = await readUsers();
    const user = users.find((u) => u.username.toLowerCase() === username.toLowerCase());

    if (!user) {
      return res.status(400).json({ error: 'Username is not registered' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    res.status(200).json({ message: `Hi ${user.username} welcome back again` });
  } catch (err) {
    next(err);
  }
});

// 3. GET /users - Retrieve all registered users
router.get('/users', async (req, res, next) => {
  try {
    const users = await readUsers();
    // Exclude hashed passwords from public display
    const sanitizedUsers = users.map(({ password, ...rest }) => rest);
    res.status(200).json(sanitizedUsers);
  } catch (err) {
    next(err);
  }
});

// 4. GET /users/:id - Retrieve a specific user by ID
router.get('/users/:id', async (req, res, next) => {
  try {
    const users = await readUsers();
    const user = users.find((u) => u.id === req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { password, ...sanitizedUser } = user;
    res.status(200).json(sanitizedUser);
  } catch (err) {
    next(err);
  }
});

// 5. PUT /users/:id - Update user details
router.put('/users/:id', async (req, res, next) => {
  try {
    const { name, lastName, email, username, password } = req.body;
    const users = await readUsers();
    const userIndex = users.findIndex((u) => u.id === req.params.id);

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    let updatedPassword = users[userIndex].password;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = {
      ...users[userIndex],
      ...(name && { name: name.trim() }),
      ...(lastName && { lastName: lastName.trim() }),
      ...(email && { email: email.trim() }),
      ...(username && { username: username.trim() }),
      password: updatedPassword
    };

    users[userIndex] = updatedUser;
    await writeUsers(users);

    const { password: _, ...sanitizedResult } = updatedUser;
    res.status(200).json({ message: 'User updated successfully', user: sanitizedResult });
  } catch (err) {
    next(err);
  }
});

module.exports = router;