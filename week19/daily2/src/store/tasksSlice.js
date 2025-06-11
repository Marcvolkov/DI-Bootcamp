import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasks: [
    { id: 1, title: 'Complete project proposal', description: 'Write and submit the Q4 project proposal', categoryId: 1, completed: false, priority: 'high', dueDate: '2024-01-15', progress: 75 },
    { id: 2, title: 'Team meeting', description: 'Weekly team sync meeting', categoryId: 1, completed: true, priority: 'medium', dueDate: '2024-01-10', progress: 100 },
    { id: 3, title: 'Grocery shopping', description: 'Buy groceries for the week', categoryId: 2, completed: false, priority: 'low', dueDate: '2024-01-12', progress: 0 },
    { id: 4, title: 'Learn Redux Toolkit', description: 'Complete Redux Toolkit tutorial', categoryId: 3, completed: false, priority: 'high', dueDate: '2024-01-20', progress: 60 },
    { id: 5, title: 'Morning workout', description: '30-minute cardio session', categoryId: 4, completed: true, priority: 'medium', dueDate: '2024-01-11', progress: 100 },
    { id: 6, title: 'Code review', description: 'Review team member code submissions', categoryId: 1, completed: false, priority: 'high', dueDate: '2024-01-13', progress: 30 }
  ],
  selectedCategoryId: null
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description || '',
        categoryId: action.payload.categoryId,
        completed: false,
        priority: action.payload.priority || 'medium',
        dueDate: action.payload.dueDate || '',
        progress: 0
      }
      state.tasks.push(newTask)
    },
    
    editTask: (state, action) => {
      const { id, updates } = action.payload
      const taskIndex = state.tasks.findIndex(task => task.id === id)
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updates }
      }
    },
    
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    },
    
    toggleTaskCompletion: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload)
      if (task) {
        task.completed = !task.completed
        task.progress = task.completed ? 100 : task.progress
      }
    },
    
    updateTaskProgress: (state, action) => {
      const { id, progress } = action.payload
      const task = state.tasks.find(task => task.id === id)
      if (task) {
        task.progress = progress
        task.completed = progress === 100
      }
    },
    
    setSelectedCategory: (state, action) => {
      state.selectedCategoryId = action.payload
    }
  }
})

export const { 
  addTask, 
  editTask, 
  deleteTask, 
  toggleTaskCompletion, 
  updateTaskProgress, 
  setSelectedCategory 
} = tasksSlice.actions

export default tasksSlice.reducer