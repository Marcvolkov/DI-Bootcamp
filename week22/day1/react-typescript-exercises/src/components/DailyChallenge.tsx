// Daily Challenge: Building A TypeScript And React Todo List With Generic Components
import React, { useState } from 'react';

// Define the Book type with required properties
interface Book {
  id: number;
  title: string;
  author: string;
}

// Define props interface for the generic List component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  emptyMessage?: string;
}

// Generic List component that can handle any type of items
function List<T>({ items, renderItem, emptyMessage = "No items to display" }: ListProps<T>): React.ReactElement {
  if (items.length === 0) {
    return (
      <div className="empty-list">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="generic-list">
      {items.map((item, index) => (
        <div key={index} className="list-item">
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

// Props interface for BookApp component
interface BookAppProps {
  initialBooks?: Book[];
}

// Main BookApp component that manages the book list state
const BookApp: React.FC<BookAppProps> = ({ initialBooks = [] }) => {
  // State management for the book list using useState hook
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
    { id: 3, title: "1984", author: "George Orwell" },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen" },
    ...initialBooks
  ]);

  // State for the new book form
  const [newBookTitle, setNewBookTitle] = useState<string>("");
  const [newBookAuthor, setNewBookAuthor] = useState<string>("");

  // Function to generate unique ID for new books
  const generateId = (): number => {
    return books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
  };

  // Function to add a new book to the list
  const addBook = (): void => {
    if (newBookTitle.trim() && newBookAuthor.trim()) {
      const newBook: Book = {
        id: generateId(),
        title: newBookTitle.trim(),
        author: newBookAuthor.trim()
      };

      setBooks(prevBooks => [...prevBooks, newBook]);
      
      // Clear the form fields
      setNewBookTitle("");
      setNewBookAuthor("");
    }
  };

  // Function to remove a book from the list
  const removeBook = (id: number): void => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
  };

  // Function to clear all books
  const clearAllBooks = (): void => {
    setBooks([]);
  };

  // Custom render function for book items
  const renderBookItem = (book: Book): React.ReactNode => {
    return (
      <div className="book-item">
        <div className="book-content">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">by {book.author}</p>
          <span className="book-id">ID: {book.id}</span>
        </div>
        <div className="book-actions">
          <button 
            onClick={() => removeBook(book.id)}
            className="remove-btn"
            aria-label={`Remove ${book.title}`}
          >
            Remove
          </button>
        </div>
      </div>
    );
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    addBook();
  };

  return (
    <div className="book-app">
      <div className="book-app-header">
        <h1>📚 Book List Manager</h1>
        <p>A TypeScript & React application with generic components</p>
      </div>

      <div className="book-stats">
        <div className="stat">
          <span className="stat-number">{books.length}</span>
          <span className="stat-label">Total Books</span>
        </div>
        <div className="stat">
          <span className="stat-number">{new Set(books.map(book => book.author)).size}</span>
          <span className="stat-label">Authors</span>
        </div>
      </div>

      <div className="add-book-section">
        <h2>Add New Book</h2>
        <form onSubmit={handleSubmit} className="add-book-form">
          <div className="form-group">
            <label htmlFor="bookTitle">Book Title:</label>
            <input
              id="bookTitle"
              type="text"
              value={newBookTitle}
              onChange={(e) => setNewBookTitle(e.target.value)}
              placeholder="Enter book title..."
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="bookAuthor">Author:</label>
            <input
              id="bookAuthor"
              type="text"
              value={newBookAuthor}
              onChange={(e) => setNewBookAuthor(e.target.value)}
              placeholder="Enter author name..."
              className="form-input"
              required
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="submit" 
              className="add-btn"
              disabled={!newBookTitle.trim() || !newBookAuthor.trim()}
            >
              Add Book
            </button>
            
            {books.length > 0 && (
              <button 
                type="button" 
                onClick={clearAllBooks}
                className="clear-btn"
              >
                Clear All
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="book-list-section">
        <h2>Book Collection ({books.length} books)</h2>
        
        {/* Using the generic List component to render books */}
        <List<Book>
          items={books}
          renderItem={renderBookItem}
          emptyMessage="No books in your collection yet. Add some books above!"
        />
      </div>
    </div>
  );
};

// Additional demonstration: Generic List with different item types
interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
}

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
}

// Demo component showing the versatility of the generic List
const GenericListDemo: React.FC = () => {
  const [movies] = useState<Movie[]>([
    { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont", year: 1994 },
    { id: 2, title: "The Dark Knight", director: "Christopher Nolan", year: 2008 },
    { id: 3, title: "Pulp Fiction", director: "Quentin Tarantino", year: 1994 }
  ]);

  const [songs] = useState<Song[]>([
    { id: 1, title: "Bohemian Rhapsody", artist: "Queen", duration: "5:55" },
    { id: 2, title: "Stairway to Heaven", artist: "Led Zeppelin", duration: "8:02" },
    { id: 3, title: "Hotel California", artist: "Eagles", duration: "6:30" }
  ]);

  const renderMovieItem = (movie: Movie): React.ReactNode => (
    <div className="movie-item">
      <h4>{movie.title} ({movie.year})</h4>
      <p>Directed by {movie.director}</p>
    </div>
  );

  const renderSongItem = (song: Song): React.ReactNode => (
    <div className="song-item">
      <h4>{song.title}</h4>
      <p>{song.artist} • {song.duration}</p>
    </div>
  );

  return (
    <div className="generic-demo">
      <h2>🎬 Movies</h2>
      <List<Movie>
        items={movies}
        renderItem={renderMovieItem}
        emptyMessage="No movies available"
      />

      <h2>🎵 Songs</h2>
      <List<Song>
        items={songs}
        renderItem={renderSongItem}
        emptyMessage="No songs available"
      />
    </div>
  );
};

// Main Daily Challenge component
const DailyChallenge: React.FC = () => {
  const [showDemo, setShowDemo] = useState<boolean>(false);

  return (
    <div className="daily-challenge">
      <div className="challenge-header">
        <h1>Daily Challenge: TypeScript & React Generic Components</h1>
        <p>Building a flexible Book List with generic List component</p>
      </div>

      <div className="challenge-navigation">
        <button 
          onClick={() => setShowDemo(false)}
          className={!showDemo ? 'nav-btn active' : 'nav-btn'}
        >
          Book List App
        </button>
        <button 
          onClick={() => setShowDemo(true)}
          className={showDemo ? 'nav-btn active' : 'nav-btn'}
        >
          Generic List Demo
        </button>
      </div>

      <div className="challenge-content">
        {!showDemo ? (
          <BookApp />
        ) : (
          <GenericListDemo />
        )}
      </div>

      <div className="challenge-footer">
        <div className="learning-objectives">
          <h3>🎯 What You Learned:</h3>
          <ul>
            <li>✅ Defining types for list items using TypeScript</li>
            <li>✅ Creating a generic List component in React</li>
            <li>✅ Using TypeScript generics to customize item rendering</li>
            <li>✅ Managing state with React's useState hook</li>
            <li>✅ Adding new items and handling state updates</li>
          </ul>
        </div>
        
        <div className="typescript-features">
          <h3>🔧 TypeScript Features Used:</h3>
          <ul>
            <li>Generic functions and components</li>
            <li>Interface definitions</li>
            <li>Type-safe state management</li>
            <li>Function type annotations</li>
            <li>Optional properties</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DailyChallenge;