import React, { createContext, useContext, useReducer } from 'react';

const QuizContext = createContext();

const initialState = {
  quizId: null,
  email: '',
  questions: [],
  currentQuestion: 0,
  answers: {},
  visitedQuestions: new Set(),
  attemptedQuestions: new Set(),
  timeRemaining: 30 * 60, // 30 minutes in seconds
  quizStarted: false,
  quizCompleted: false,
  quizResults: null,
  loading: false,
  error: null
};

const quizReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'START_QUIZ':
      return {
        ...state,
        quizId: action.payload.quiz_id,
        email: action.payload.email,
        questions: action.payload.questions,
        quizStarted: true,
        loading: false,
        error: null
      };
    
    case 'SET_CURRENT_QUESTION':
      const newVisited = new Set(state.visitedQuestions);
      newVisited.add(action.payload);
      return {
        ...state,
        currentQuestion: action.payload,
        visitedQuestions: newVisited
      };
    
    case 'SET_ANSWER':
      const newAttempted = new Set(state.attemptedQuestions);
      newAttempted.add(state.currentQuestion);
      return {
        ...state,
        answers: {
          ...state.answers,
          [state.currentQuestion]: action.payload
        },
        attemptedQuestions: newAttempted
      };
    
    case 'UPDATE_TIMER':
      return {
        ...state,
        timeRemaining: action.payload
      };
    
    case 'COMPLETE_QUIZ':
      return {
        ...state,
        quizCompleted: true,
        quizResults: action.payload
      };
    
    case 'RESET_QUIZ':
      return initialState;
    
    default:
      return state;
  }
};

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
