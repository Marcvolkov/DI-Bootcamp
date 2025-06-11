import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasks: {},
  selectedDate: new Date().toISOString().split('T')[0]
}

const plannerSlice = createSlice({
  name: 'planner',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload
    },
    
    addTask: (state, action) => {
      const { date, task } = action.payload
      if (!state.tasks[date]) {
        state.tasks[date] = []
      }
      const newTask = {
        id: Date.now(),
        title: task.title,
        description: task.description || '',
        completed: false,
        createdAt: new Date().toISOString()
      }
      state.tasks[date].push(newTask)
    },
    
    editTask: (state, action) => {
      const { date, taskId, updatedTask } = action.payload
      if (state.tasks[date]) {
        const taskIndex = state.tasks[date].findIndex(task => task.id === taskId)
        if (taskIndex !== -1) {
          state.tasks[date][taskIndex] = {
            ...state.tasks[date][taskIndex],
            ...updatedTask
          }
        }
      }
    },
    
    deleteTask: (state, action) => {
      const { date, taskId } = action.payload
      if (state.tasks[date]) {
        state.tasks[date] = state.tasks[date].filter(task => task.id !== taskId)
      }
    },
    
    toggleTask: (state, action) => {
      const { date, taskId } = action.payload
      if (state.tasks[date]) {
        const task = state.tasks[date].find(task => task.id === taskId)
        if (task) {
          task.completed = !task.completed
        }
      }
    }
  }
})

export const { setSelectedDate, addTask, editTask, deleteTask, toggleTask } = plannerSlice.actions
export default plannerSlice.reducer