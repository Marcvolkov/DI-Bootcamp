import React from 'react';
import DatePicker from './components/DatePicker';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>Daily Planner</h1>
          <p>Organize your tasks by day</p>
        </header>
        
        <main className="app-main">
          <DatePicker />
          <TaskList />
        </main>
      </div>
    </div>
  );
}

export default App;
