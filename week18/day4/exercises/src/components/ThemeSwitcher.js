import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, toggleTheme, isLight } = useTheme();

  return (
    <div className="theme-switcher">
      <button 
        className={`theme-toggle-btn ${theme}`}
        onClick={toggleTheme}
        aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      >
        <span className="theme-icon">
          {isLight ? '🌙' : '☀️'}
        </span>
        <span className="theme-text">
          {isLight ? 'Dark Mode' : 'Light Mode'}
        </span>
      </button>
      <div className="theme-info">
        <p>Current theme: <strong>{theme}</strong></p>
      </div>
    </div>
  );
};

export default ThemeSwitcher;