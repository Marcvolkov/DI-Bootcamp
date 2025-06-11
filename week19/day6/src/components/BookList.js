import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { 
  selectBooks, 
  selectHorrorBooks, 
  selectFantasyBooks, 
  selectScienceFictionBooks,
  selectGenres,
  selectBookCountByGenre
} from '../store/selectors'
import BookItem from './BookItem'

const BookList = () => {
  const [selectedGenre, setSelectedGenre] = useState('All')
  
  const allBooks = useSelector(selectBooks)
  const horrorBooks = useSelector(selectHorrorBooks)
  const fantasyBooks = useSelector(selectFantasyBooks)
  const scienceFictionBooks = useSelector(selectScienceFictionBooks)
  const genres = useSelector(selectGenres)
  const bookCounts = useSelector(selectBookCountByGenre)

  const getDisplayedBooks = () => {
    switch (selectedGenre) {
      case 'Horror':
        return horrorBooks
      case 'Fantasy':
        return fantasyBooks
      case 'Science Fiction':
        return scienceFictionBooks
      case 'All':
      default:
        return allBooks
    }
  }

  const displayedBooks = getDisplayedBooks()

  return (
    <div className="book-list">
      <div className="book-list-header">
        <h2>Book Inventory</h2>
        <p>Manage your book collection by genre</p>
      </div>

      <div className="genre-stats">
        <div className="stat-card">
          <span className="stat-number">{allBooks.length}</span>
          <span className="stat-label">Total Books</span>
        </div>
        {genres.map(genre => (
          <div key={genre} className="stat-card">
            <span className="stat-number">{bookCounts[genre]}</span>
            <span className="stat-label">{genre}</span>
          </div>
        ))}
      </div>

      <div className="genre-filters">
        <h3>Filter by Genre</h3>
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${selectedGenre === 'All' ? 'active' : ''}`}
            onClick={() => setSelectedGenre('All')}
          >
            All Books ({allBooks.length})
          </button>
          <button 
            className={`filter-btn ${selectedGenre === 'Horror' ? 'active' : ''}`}
            onClick={() => setSelectedGenre('Horror')}
          >
            Horror ({horrorBooks.length})
          </button>
          <button 
            className={`filter-btn ${selectedGenre === 'Fantasy' ? 'active' : ''}`}
            onClick={() => setSelectedGenre('Fantasy')}
          >
            Fantasy ({fantasyBooks.length})
          </button>
          <button 
            className={`filter-btn ${selectedGenre === 'Science Fiction' ? 'active' : ''}`}
            onClick={() => setSelectedGenre('Science Fiction')}
          >
            Science Fiction ({scienceFictionBooks.length})
          </button>
        </div>
      </div>

      <div className="books-section">
        <h3>
          {selectedGenre === 'All' ? 'All Books' : `${selectedGenre} Books`} 
          ({displayedBooks.length})
        </h3>
        
        {displayedBooks.length === 0 ? (
          <div className="empty-state">
            <p>No books found in this genre.</p>
          </div>
        ) : (
          <div className="books-grid">
            {displayedBooks.map(book => (
              <BookItem key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BookList