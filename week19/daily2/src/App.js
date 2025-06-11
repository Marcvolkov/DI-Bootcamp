import React from 'react'
import Dashboard from './components/Dashboard'
import CategorySelector from './components/CategorySelector'
import AddTaskForm from './components/AddTaskForm'
import TaskList from './components/TaskList'
import './App.css'

function App() {
  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>📊 Productivity Tracker</h1>
          <p>Track your daily tasks and boost your productivity</p>
        </header>
        
        <main className="app-main">
          <div className="sidebar">
            <Dashboard />
            <CategorySelector />
          </div>
          
          <div className="content">
            <AddTaskForm />
            <TaskList />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
