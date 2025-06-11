import React from 'react'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import './App.css'

function App() {
  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>Redux Toolkit Todo List</h1>
          <p>Manage your tasks with Redux Toolkit</p>
        </header>
        <main className="app-main">
          <AddTodo />
          <TodoList />
        </main>
      </div>
    </div>
  )
}

export default App
