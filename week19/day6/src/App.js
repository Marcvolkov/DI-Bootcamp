import React from 'react'
import BookList from './components/BookList'
import './App.css'

function App() {
  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>📚 Book Inventory Selector</h1>
          <p>Explore books by genre using Redux selectors</p>
        </header>
        <main className="app-main">
          <BookList />
        </main>
      </div>
    </div>
  )
}

export default App
