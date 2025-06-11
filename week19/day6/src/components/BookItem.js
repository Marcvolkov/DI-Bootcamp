import React from 'react'

const BookItem = ({ book }) => {
  const getGenreColor = (genre) => {
    switch (genre) {
      case 'Horror':
        return '#e74c3c'
      case 'Fantasy':
        return '#9b59b6'
      case 'Science Fiction':
        return '#3498db'
      default:
        return '#95a5a6'
    }
  }

  return (
    <div className="book-item">
      <div className="book-content">
        <h4 className="book-title">{book.title}</h4>
        <p className="book-author">by {book.author}</p>
        <span 
          className="book-genre"
          style={{ backgroundColor: getGenreColor(book.genre) }}
        >
          {book.genre}
        </span>
      </div>
    </div>
  )
}

export default BookItem