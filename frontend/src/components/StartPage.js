import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { quizAPI } from '../utils/api';

const StartPage = ({ onStart }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useQuiz();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await quizAPI.startQuiz(email);
      
      if (response.success) {
        dispatch({ 
          type: 'START_QUIZ', 
          payload: { 
            ...response, 
            email 
          } 
        });
        onStart();
      } else {
        setError(response.message || 'Failed to start quiz');
      }
    } catch (error) {
      console.error('Error starting quiz:', error);
      setError('Failed to start quiz. Please try again.');
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <div className="start-page flex-center">
      <div className="start-container card">
        <div className="header-section">
          <h1 className="header-title">CausalFunnel Quiz</h1>
          <p className="header-subtitle">Test your knowledge with our competitive programming-style quiz</p>
        </div>

        <div className="info-section">
          <h2 className="info-title">Rules & Instructions</h2>
          <ul className="info-list">
            <li className="info-item">15 challenging questions to solve</li>
            <li className="info-item">30 minutes time constraint</li>
            <li className="info-item">Navigate between questions freely</li>
            <li className="info-item">Receive detailed performance report</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="form-section">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="developer@example.com"
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="btn btn-primary">
            Start Challenge
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartPage;
