const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

// POST /register
const register = async (req, res, next) => {
  const { username, password, email, first_name, last_name } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Username, password, and email are required.' });
  }

  try {
    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save using transaction
    const newUser = await userModel.registerUserTransaction({
      email,
      username,
      first_name,
      last_name,
      hashedPassword,
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    next(error);
  }
};

// POST /login
const login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    // Retrieve hashed password from hashpwd table
    const userHash = await userModel.getHashByUsername(username);
    if (!userHash) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, userHash.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    next(error);
  }
};

// GET /users
const getUsers = async (req, res, next) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// GET /users/:id
const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// PUT /users/:id
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { email, first_name, last_name } = req.body;

  try {
    const updated = await userModel.updateUser(id, { email, first_name, last_name });
    if (updated.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(updated[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getUsers,
  getUser,
  updateUser,
};