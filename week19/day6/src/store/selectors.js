import { createSelector } from '@reduxjs/toolkit'

// Base selector to get all books
export const selectBooks = (state) => state.books.books

// Selector for Horror books
export const selectHorrorBooks = createSelector(
  [selectBooks],
  (books) => books.filter(book => book.genre === 'Horror')
)

// Selector for Fantasy books
export const selectFantasyBooks = createSelector(
  [selectBooks],
  (books) => books.filter(book => book.genre === 'Fantasy')
)

// Selector for Science Fiction books
export const selectScienceFictionBooks = createSelector(
  [selectBooks],
  (books) => books.filter(book => book.genre === 'Science Fiction')
)

// Selector for books by genre (reusable)
export const selectBooksByGenre = createSelector(
  [selectBooks, (state, genre) => genre],
  (books, genre) => books.filter(book => book.genre === genre)
)

// Selector to get unique genres
export const selectGenres = createSelector(
  [selectBooks],
  (books) => [...new Set(books.map(book => book.genre))]
)

// Selector to get book count by genre
export const selectBookCountByGenre = createSelector(
  [selectBooks],
  (books) => {
    const counts = {}
    books.forEach(book => {
      counts[book.genre] = (counts[book.genre] || 0) + 1
    })
    return counts
  }
)