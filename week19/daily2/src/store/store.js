import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './tasksSlice'
import categoriesReducer from './categoriesSlice'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    categories: categoriesReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})