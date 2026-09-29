const quizModel = require('../models/quizModel');

const getQuestions = async (req, res, next) => {
  try {
    const { difficulty } = req.query;
    const questions = await quizModel.getQuestionsByDifficulty(difficulty);
    // Exclude correct_answer from response to prevent cheating
    const sanitized = questions.map(q => ({
      id: q.id,
      question: q.question,
      difficulty: q.difficulty,
      type: q.type,
      options: q.options
    }));
    res.json(sanitized);
  } catch (err) { next(err); }
};

const verifyAnswer = async (req, res, next) => {
  try {
    const { id, selectedOption } = req.body;
    const question = await quizModel.getQuestionById(id);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    const isCorrect = question.correct_answer === selectedOption;
    res.json({ isCorrect, correctAnswer: question.correct_answer });
  } catch (err) { next(err); }
};

module.exports = { getQuestions, verifyAnswer };