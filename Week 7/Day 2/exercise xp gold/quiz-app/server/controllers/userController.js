const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const existing = await userModel.findUserByUsername(username);
    if (existing) return res.status(400).json({ message: 'Username already taken' });

    const hash = await bcrypt.hash(password, 10);
    const [user] = await userModel.createUser(username, hash);
    res.status(201).json({ message: 'User registered', user });
  } catch (err) { next(err); }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findUserByUsername(username);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, username: user.username });
  } catch (err) { next(err); }
};

const saveUserScore = async (req, res, next) => {
  try {
    const { score } = req.body;
    await userModel.saveScore(req.user.id, score);
    res.status(201).json({ message: 'Score saved successfully' });
  } catch (err) { next(err); }
};

const getLeaderboard = async (req, res, next) => {
  try {
    const leaderboard = await userModel.getLeaderboard();
    res.json(leaderboard);
  } catch (err) { next(err); }
};

module.exports = { register, login, saveUserScore, getLeaderboard };