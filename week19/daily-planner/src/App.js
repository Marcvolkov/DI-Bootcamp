import React from 'react'
import Calendar from './components/Calendar'
import AddTask from './components/AddTask'
import TaskList from './components/TaskList'
import './App.css'

function App() {
  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>Daily Planner</h1>
          <p>Organize your tasks day by day</p>
        </header>
        <main className="app-main">
          <div className="sidebar">
            <Calendar />
          </div>
          <div className="content">
            <AddTask />
            <TaskList />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
