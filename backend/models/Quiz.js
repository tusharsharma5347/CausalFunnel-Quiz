const mongoose = require('mongoose');

const QuizResultSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  questions: [{
    question: String,
    correct_answer: String,
    incorrect_answers: [String],
    user_answer: String,
    is_correct: Boolean,
    visited: Boolean,
    attempted: Boolean
  }],
  score: {
    type: Number,
    default: 0
  },
  total_questions: {
    type: Number,
    default: 15
  },
  start_time: {
    type: Date,
    default: Date.now
  },
  end_time: Date,
  time_taken: Number, // in seconds
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('QuizResult', QuizResultSchema);
