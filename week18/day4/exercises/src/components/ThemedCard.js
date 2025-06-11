import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemedCard = ({ title, children }) => {
  const { theme } = useTheme();

  return (
    <div className={`themed-card ${theme}`}>
      <h3 className={`card-title ${theme}`}>{title}</h3>
      <div className={`card-content ${theme}`}>
        {children}
      </div>
    </div>
  );
};

export default ThemedCard;