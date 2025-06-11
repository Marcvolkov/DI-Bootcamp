import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const CharacterCounter = () => {
  const inputRef = useRef(null);
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const { theme } = useTheme();
  
  const maxLength = 200;

  useEffect(() => {
    const inputElement = inputRef.current;
    
    const handleInput = () => {
      const text = inputElement.value;
      const length = text.length;
      const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
      
      setCharCount(length);
      setWordCount(words);
    };

    if (inputElement) {
      inputElement.addEventListener('input', handleInput);
      
      return () => {
        inputElement.removeEventListener('input', handleInput);
      };
    }
  }, []);

  const clearText = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setCharCount(0);
      setWordCount(0);
      inputRef.current.focus();
    }
  };

  const getCounterColor = () => {
    const percentage = (charCount / maxLength) * 100;
    if (percentage >= 90) return 'danger';
    if (percentage >= 75) return 'warning';
    return 'normal';
  };

  return (
    <div className={`character-counter ${theme}`}>
      <div className="input-section">
        <label htmlFor="text-input" className={`input-label ${theme}`}>
          Enter your text:
        </label>
        <textarea
          ref={inputRef}
          id="text-input"
          className={`text-input ${theme}`}
          placeholder="Start typing to see the character count..."
          maxLength={maxLength}
          rows={6}
        />
        <button 
          className={`clear-btn ${theme}`}
          onClick={clearText}
          type="button"
        >
          Clear Text
        </button>
      </div>
      
      <div className={`counter-display ${theme}`}>
        <div className={`counter-item ${getCounterColor()}`}>
          <span className="counter-number">{charCount}</span>
          <span className="counter-label">/ {maxLength} characters</span>
        </div>
        
        <div className="counter-item">
          <span className="counter-number">{wordCount}</span>
          <span className="counter-label">words</span>
        </div>
        
        <div className="progress-bar">
          <div 
            className={`progress-fill ${getCounterColor()}`}
            style={{ width: `${(charCount / maxLength) * 100}%` }}
          />
        </div>
        
        <div className="counter-stats">
          <span className={`remaining ${getCounterColor()}`}>
            {maxLength - charCount} characters remaining
          </span>
        </div>
      </div>
    </div>
  );
};

export default CharacterCounter;