const db = require('../config/db');

const createUser = (username, hashedPassword) => {
  return db('users').insert({ username, password: hashedPassword }).returning(['id', 'username']);
};

const findUserByUsername = (username) => {
  return db('users').where({ username }).first();
};

const saveScore = (userId, score) => {
  return db('scores').insert({ user_id: userId, score }).returning('*');
};

const getLeaderboard = () => {
  return db('scores')
    .join('users', 'scores.user_id', '=', 'users.id')
    .select('users.username', 'scores.score', 'scores.created_at')
    .orderBy('scores.score', 'desc')
    .limit(10);
};

module.exports = { createUser, findUserByUsername, saveScore, getLeaderboard };