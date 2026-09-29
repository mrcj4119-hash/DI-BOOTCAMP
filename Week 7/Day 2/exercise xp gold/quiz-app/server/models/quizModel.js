const db = require('../config/db');

const getQuestionsByDifficulty = async (difficulty) => {
  const query = db('questions');
  if (difficulty) query.where({ difficulty });
  const questions = await query.select('*');

  for (let q of questions) {
    const opts = await db('questions_options')
      .join('options', 'questions_options.option_id', '=', 'options.id')
      .where({ question_id: q.id })
      .select('options.id', 'options.option_text');
    q.options = opts;
  }
  return questions;
};

const getQuestionById = (id) => {
  return db('questions').where({ id }).first();
};

module.exports = { getQuestionsByDifficulty, getQuestionById };