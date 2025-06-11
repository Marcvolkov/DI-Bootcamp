import React from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher';
import ThemedCard from './components/ThemedCard';
import CharacterCounter from './components/CharacterCounter';
import './App.css';

function AppContent() {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <header className={`app-header ${theme}`}>
        <h1>Week 18 Day 4 - React Hooks Exercises</h1>
        <ThemeSwitcher />
      </header>
      
      <main className="app-main">
        <div className="exercises-container">
          <ThemedCard title="Exercise 1: Theme Switcher">
            <p>This application demonstrates the use of <strong>useContext</strong> hook for theme management.</p>
            <ul>
              <li>Click the theme toggle button to switch between light and dark modes</li>
              <li>The entire application responds to theme changes</li>
              <li>Theme state is managed using React Context</li>
            </ul>
          </ThemedCard>
          
          <ThemedCard title="Exercise 2: Character Counter">
            <CharacterCounter />
          </ThemedCard>
          
          <ThemedCard title="Features Demonstrated">
            <div className="features-list">
              <div className="feature-item">
                <h4>🎨 useContext Hook</h4>
                <p>Theme management across components without prop drilling</p>
              </div>
              <div className="feature-item">
                <h4>📝 useRef Hook</h4>
                <p>Direct DOM manipulation for real-time character counting</p>
              </div>
              <div className="feature-item">
                <h4>⚡ useState Hook</h4>
                <p>State management for counters and theme toggling</p>
              </div>
              <div className="feature-item">
                <h4>🔄 useEffect Hook</h4>
                <p>Event listener management and cleanup</p>
              </div>
            </div>
          </ThemedCard>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
