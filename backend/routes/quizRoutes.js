const express = require('express');
const axios = require('axios');
const QuizResult = require('../models/Quiz');
const router = express.Router();

// Fetch questions from OpenTDB API
router.get('/questions', async (req, res) => {
  try {
    const response = await axios.get('https://opentdb.com/api.php?amount=15');
    const questions = response.data.results.map((q, index) => ({
      id: index,
      question: q.question,
      correct_answer: q.correct_answer,
      incorrect_answers: q.incorrect_answers,
      all_answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
      user_answer: null,
      visited: false,
      attempted: false
    }));
    
    res.json({
      success: true,
      questions
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch questions'
    });
  }
});

// Start quiz session
router.post('/start', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Fetch questions from OpenTDB
    const response = await axios.get('https://opentdb.com/api.php?amount=15');
    const questions = response.data.results.map((q, index) => ({
      question: q.question,
      correct_answer: q.correct_answer,
      incorrect_answers: q.incorrect_answers,
      user_answer: null,
      visited: false,
      attempted: false
    }));

    const quizResult = new QuizResult({
      email,
      questions,
      start_time: new Date()
    });

    await quizResult.save();

    res.json({
      success: true,
      quiz_id: quizResult._id,
      questions: questions.map((q, index) => ({
        id: index,
        question: q.question,
        all_answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
        visited: false,
        attempted: false
      }))
    });
  } catch (error) {
    console.error('Error starting quiz:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to start quiz'
    });
  }
});

// Update question status
router.put('/question/:quizId/:questionId', async (req, res) => {
  try {
    const { quizId, questionId } = req.params;
    const { user_answer, visited, attempted } = req.body;

    const quiz = await QuizResult.findById(quizId);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    const question = quiz.questions[questionId];
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    // Update question data
    if (user_answer !== undefined) {
      question.user_answer = user_answer;
      question.is_correct = user_answer === question.correct_answer;
      question.attempted = true;
    }
    
    if (visited !== undefined) {
      question.visited = visited;
    }
    
    if (attempted !== undefined) {
      question.attempted = attempted;
    }

    await quiz.save();

    res.json({
      success: true,
      message: 'Question updated successfully'
    });
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update question'
    });
  }
});

// Submit quiz
router.post('/submit/:quizId', async (req, res) => {
  try {
    const { quizId } = req.params;
    const { time_taken } = req.body;

    const quiz = await QuizResult.findById(quizId);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Calculate score
    const score = quiz.questions.reduce((acc, q) => {
      return acc + (q.is_correct ? 1 : 0);
    }, 0);

    quiz.score = score;
    quiz.end_time = new Date();
    quiz.time_taken = time_taken;
    quiz.completed = true;

    await quiz.save();

    res.json({
      success: true,
      score,
      total_questions: quiz.total_questions,
      quiz_id: quizId
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit quiz'
    });
  }
});

// Get quiz results
router.get('/results/:quizId', async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await QuizResult.findById(quizId);
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    res.json({
      success: true,
      quiz: {
        email: quiz.email,
        questions: quiz.questions,
        score: quiz.score,
        total_questions: quiz.total_questions,
        time_taken: quiz.time_taken,
        completed: quiz.completed
      }
    });
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch results'
    });
  }
});

module.exports = router;
