const db = require('../config/db');

// Register User using Database Transaction
const registerUserTransaction = async ({ email, username, first_name, last_name, hashedPassword }) => {
  return await db.transaction(async (trx) => {
    // Insert into 'users' table
    const [newUser] = await trx('users')
      .insert({ email, username, first_name, last_name })
      .returning('*');

    // Insert into 'hashpwd' table using transaction
    await trx('hashpwd').insert({
      username: newUser.username,
      password: hashedPassword,
    });

    return newUser;
  });
};

// Find user password hash by username
const getHashByUsername = (username) => {
  return db('hashpwd').where({ username }).first();
};

// Get all users
const getAllUsers = () => {
  return db('users').select('*');
};

// Get single user by ID
const getUserById = (id) => {
  return db('users').where({ id }).first();
};

// Update user details
const updateUser = (id, { email, first_name, last_name }) => {
  return db('users')
    .where({ id })
    .update({ email, first_name, last_name })
    .returning('*');
};

module.exports = {
  registerUserTransaction,
  getHashByUsername,
  getAllUsers,
  getUserById,
  updateUser,
};