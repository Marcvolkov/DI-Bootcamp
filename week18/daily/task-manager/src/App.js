import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <div className="app">
        <div className="container">
          <header className="app-header">
            <h1>Task Manager</h1>
            <p>Manage your tasks efficiently</p>
          </header>
          
          <main className="app-main">
            <TaskForm />
            <TaskFilter />
            <TaskList />
          </main>
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
