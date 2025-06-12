// Exercise 3: Using useState Hook With TypeScript In React
import React, { useState } from 'react';

// Define types for the action
type ActionType = 'increment' | 'decrement' | 'reset' | null;

const Counter: React.FC = () => {
  // State for counter value with explicit TypeScript typing
  const [count, setCount] = useState<number>(0);
  
  // State for tracking last action performed
  const [lastAction, setLastAction] = useState<ActionType>(null);

  // Function to increment counter with proper TypeScript types
  const increment = (): void => {
    setCount(prevCount => prevCount + 1);
    setLastAction('increment');
  };

  // Function to decrement counter with proper TypeScript types
  const decrement = (): void => {
    setCount(prevCount => prevCount - 1);
    setLastAction('decrement');
  };

  // Function to reset counter
  const reset = (): void => {
    setCount(0);
    setLastAction('reset');
  };

  // Helper function to get action message
  const getActionMessage = (): string => {
    switch (lastAction) {
      case 'increment':
        return 'Last action: Incremented';
      case 'decrement':
        return 'Last action: Decremented';
      case 'reset':
        return 'Last action: Reset';
      default:
        return 'No actions performed yet';
    }
  };

  return (
    <div className="counter-container">
      <h2>TypeScript Counter</h2>
      <div className="counter-display">
        <h3 className="counter-value">Count: {count}</h3>
        <p className="last-action">{getActionMessage()}</p>
      </div>
      
      <div className="counter-controls">
        <button 
          onClick={increment}
          className="counter-btn increment-btn"
        >
          Increment (+1)
        </button>
        
        <button 
          onClick={decrement}
          className="counter-btn decrement-btn"
        >
          Decrement (-1)
        </button>
        
        <button 
          onClick={reset}
          className="counter-btn reset-btn"
        >
          Reset
        </button>
      </div>

      <div className="counter-stats">
        <p>Current value: <strong>{count}</strong></p>
        <p>Is positive: <strong>{count > 0 ? 'Yes' : 'No'}</strong></p>
        <p>Is even: <strong>{count % 2 === 0 ? 'Yes' : 'No'}</strong></p>
        <p>Actions taken: <strong>{lastAction ? 'Yes' : 'No'}</strong></p>
      </div>
    </div>
  );
};

export default Counter;