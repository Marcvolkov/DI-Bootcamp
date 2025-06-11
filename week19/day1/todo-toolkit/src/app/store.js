import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../features/todos/todoSlice'

// Configure the Redux store
export const store = configureStore({
  reducer: {
    todos: todoReducer
  },
  // Redux Toolkit includes Redux DevTools Extension by default
  devTools: process.env.NODE_ENV !== 'production'
})