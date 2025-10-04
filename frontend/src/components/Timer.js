import React, { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';

const Timer = ({ onTimeUp }) => {
  const { state, dispatch } = useQuiz();
  const { timeRemaining } = state;

  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      dispatch({ 
        type: 'UPDATE_TIMER', 
        payload: timeRemaining - 1 
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, dispatch, onTimeUp]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerClass = () => {
    if (timeRemaining <= 300) return 'timer critical'; // 5 minutes
    if (timeRemaining <= 600) return 'timer warning';  // 10 minutes
    return 'timer';
  };

  return (
    <div className={getTimerClass()}>
      <span className="font-mono">
        {formatTime(timeRemaining)}
      </span>
    </div>
  );
};

export default Timer;
