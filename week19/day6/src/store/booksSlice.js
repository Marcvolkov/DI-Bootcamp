import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  books: [
    { id: 1, title: "The Shining", author: "Stephen King", genre: "Horror" },
    { id: 2, title: "IT", author: "Stephen King", genre: "Horror" },
    { id: 3, title: "Dracula", author: "Bram Stoker", genre: "Horror" },
    { id: 4, title: "The Lord of the Rings", author: "J.R.R. Tolkien", genre: "Fantasy" },
    { id: 5, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", genre: "Fantasy" },
    { id: 6, title: "Game of Thrones", author: "George R.R. Martin", genre: "Fantasy" },
    { id: 7, title: "Dune", author: "Frank Herbert", genre: "Science Fiction" },
    { id: 8, title: "Foundation", author: "Isaac Asimov", genre: "Science Fiction" },
    { id: 9, title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", genre: "Science Fiction" },
    { id: 10, title: "1984", author: "George Orwell", genre: "Science Fiction" },
    { id: 11, title: "The Stand", author: "Stephen King", genre: "Horror" },
    { id: 12, title: "The Name of the Wind", author: "Patrick Rothfuss", genre: "Fantasy" },
    { id: 13, title: "Ender's Game", author: "Orson Scott Card", genre: "Science Fiction" },
    { id: 14, title: "Pet Sematary", author: "Stephen King", genre: "Horror" },
    { id: 15, title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy" }
  ]
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {}
})

export default booksSlice.reducer