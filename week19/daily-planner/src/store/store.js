import { configureStore } from '@reduxjs/toolkit'
import plannerReducer from './plannerSlice'

export const store = configureStore({
  reducer: {
    planner: plannerReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})