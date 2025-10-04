import React, { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import { quizAPI } from '../utils/api';
import Timer from './Timer';
import QuestionNav from './QuestionNav';

const QuizPage = ({ onComplete }) => {
  const { state, dispatch } = useQuiz();
  const { 
    quizId, 
    questions, 
    currentQuestion, 
    answers, 
    timeRemaining 
  } = state;

  // Mark current question as visited on mount and question change
  useEffect(() => {
    const handleQuestionVisit = async (questionIndex) => {
      try {
        await quizAPI.updateQuestion(quizId, questionIndex, { 
          visited: true 
        });
      } catch (error) {
        console.error('Error updating question visit:', error);
      }
    };

    if (questions.length > 0) {
      handleQuestionVisit(currentQuestion);
    }
  }, [currentQuestion, questions.length, quizId]);

  const handleAnswerSelect = async (answer) => {
    dispatch({ type: 'SET_ANSWER', payload: answer });
    
    try {
      await quizAPI.updateQuestion(quizId, currentQuestion, { 
        user_answer: answer,
        attempted: true,
        visited: true
      });
    } catch (error) {
      console.error('Error updating answer:', error);
    }
  };

  const handleQuestionNavigation = (questionIndex) => {
    dispatch({ type: 'SET_CURRENT_QUESTION', payload: questionIndex });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      dispatch({ type: 'SET_CURRENT_QUESTION', payload: currentQuestion + 1 });
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      dispatch({ type: 'SET_CURRENT_QUESTION', payload: currentQuestion - 1 });
    }
  };

  const handleSubmitQuiz = async () => {
    try {
      const timeTaken = (30 * 60) - timeRemaining; // Calculate time taken
      const response = await quizAPI.submitQuiz(quizId, timeTaken);
      
      if (response.success) {
        dispatch({ type: 'COMPLETE_QUIZ', payload: response });
        onComplete();
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  const handleTimeUp = () => {
    handleSubmitQuiz();
  };

  if (!questions.length) {
    return <div className="loading">Loading quiz...</div>;
  }

  const currentQ = questions[currentQuestion];
  const currentAnswer = answers[currentQuestion];

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <div className="timer">
          <span className="font-mono">⏱️</span>
          <Timer onTimeUp={handleTimeUp} />
        </div>
        <div className="quiz-progress">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      <div className="quiz-content">
        <div className="quiz-main">
          <div className="question-container">
            <h2 className="question-header">
              Problem {currentQuestion + 1}
            </h2>
            
            <div className="question-text">
              <div dangerouslySetInnerHTML={{ __html: currentQ.question }} />
            </div>

            <div className="answer-options">
              {currentQ.all_answers.map((answer, index) => (
                <button
                  key={index}
                  className={`answer-option ${currentAnswer === answer ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelect(answer)}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span 
                    className="option-text"
                    dangerouslySetInnerHTML={{ __html: answer }}
                  />
                </button>
              ))}
            </div>

            <div className="question-navigation">
              <button 
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                className="nav-btn prev-btn"
              >
                ← Previous
              </button>
              
              {currentQuestion === questions.length - 1 ? (
                <button 
                  onClick={handleSubmitQuiz}
                  className="nav-btn submit-btn"
                >
                  Submit Solution
                </button>
              ) : (
                <button 
                  onClick={handleNextQuestion}
                  className="nav-btn next-btn"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="quiz-sidebar">
          <QuestionNav onQuestionSelect={handleQuestionNavigation} />
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
