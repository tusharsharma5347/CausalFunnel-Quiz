import React, { useState } from 'react';
import { QuizProvider } from './context/QuizContext';
import { ThemeProvider } from './context/ThemeContext';
import StartPage from './components/StartPage';
import QuizPage from './components/QuizPage';
import ReportPage from './components/ReportPage';
import ThemeToggle from './components/ThemeToggle';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('start'); // 'start', 'quiz', 'report'

  const handleQuizStart = () => {
    setCurrentPage('quiz');
  };

  const handleQuizComplete = () => {
    setCurrentPage('report');
  };

  const handleRestart = () => {
    setCurrentPage('start');
    // Reset the page to start fresh
    window.location.reload();
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'start':
        return <StartPage onStart={handleQuizStart} />;
      case 'quiz':
        return <QuizPage onComplete={handleQuizComplete} />;
      case 'report':
        return <ReportPage onRestart={handleRestart} />;
      default:
        return <StartPage onStart={handleQuizStart} />;
    }
  };

  return (
    <ThemeProvider>
      <QuizProvider>
        <div className="app">
          <ThemeToggle />
          {renderCurrentPage()}
        </div>
      </QuizProvider>
    </ThemeProvider>
  );
}

export default App;
