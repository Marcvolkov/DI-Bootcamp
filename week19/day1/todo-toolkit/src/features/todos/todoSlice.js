import { createSlice } from '@reduxjs/toolkit'

// Initial state for the todos
const initialState = {
  todos: []
}

// Create the todo slice
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Add a new todo
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(), // Simple ID generation
        text: action.payload,
        completed: false
      }
      state.todos.push(newTodo)
    },
    
    // Toggle todo completion status
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    
    // Remove a todo
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload)
    }
  }
})

// Export action creators
export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions

// Export the reducer
export default todoSlice.reducer