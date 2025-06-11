import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: [
    { id: 1, name: 'Work', color: '#3498db', description: 'Work-related tasks' },
    { id: 2, name: 'Personal', color: '#e74c3c', description: 'Personal tasks and goals' },
    { id: 3, name: 'Learning', color: '#f39c12', description: 'Educational and skill development' },
    { id: 4, name: 'Health', color: '#27ae60', description: 'Health and fitness activities' }
  ]
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      const newCategory = {
        id: Date.now(),
        name: action.payload.name,
        color: action.payload.color || '#95a5a6',
        description: action.payload.description || ''
      }
      state.categories.push(newCategory)
    },
    
    editCategory: (state, action) => {
      const { id, updates } = action.payload
      const categoryIndex = state.categories.findIndex(cat => cat.id === id)
      if (categoryIndex !== -1) {
        state.categories[categoryIndex] = { ...state.categories[categoryIndex], ...updates }
      }
    },
    
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(cat => cat.id !== action.payload)
    }
  }
})

export const { addCategory, editCategory, deleteCategory } = categoriesSlice.actions
export default categoriesSlice.reducer