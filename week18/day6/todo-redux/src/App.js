import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>Redux Todo List</h1>
          <p>Simple todo management with React-Redux</p>
        </header>
        
        <main className="app-main">
          <TodoForm />
          <TodoStats />
          <TodoList />
        </main>
      </div>
    </div>
  );
}

export default App;
