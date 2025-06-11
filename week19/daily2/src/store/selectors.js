import { createSelector } from '@reduxjs/toolkit'

// Base selectors
export const selectTasks = (state) => state.tasks.tasks
export const selectCategories = (state) => state.categories.categories
export const selectSelectedCategoryId = (state) => state.tasks.selectedCategoryId

// Optimized selector to get tasks by category
export const selectTasksByCategory = createSelector(
  [selectTasks, (state, categoryId) => categoryId],
  (tasks, categoryId) => {
    if (!categoryId) return tasks
    return tasks.filter(task => task.categoryId === categoryId)
  }
)

// Selector for tasks in the currently selected category
export const selectTasksInSelectedCategory = createSelector(
  [selectTasks, selectSelectedCategoryId],
  (tasks, selectedCategoryId) => {
    if (!selectedCategoryId) return tasks
    return tasks.filter(task => task.categoryId === selectedCategoryId)
  }
)

// Selector to get completed tasks count
export const selectCompletedTasks = createSelector(
  [selectTasks],
  (tasks) => tasks.filter(task => task.completed).length
)

// Selector to get total tasks count
export const selectTotalTasks = createSelector(
  [selectTasks],
  (tasks) => tasks.length
)

// Selector to get completion percentage
export const selectCompletionPercentage = createSelector(
  [selectCompletedTasks, selectTotalTasks],
  (completed, total) => total > 0 ? Math.round((completed / total) * 100) : 0
)

// Selector to get category by ID
export const selectCategoryById = createSelector(
  [selectCategories, (state, categoryId) => categoryId],
  (categories, categoryId) => categories.find(category => category.id === categoryId)
)

// Selector to get tasks by priority
export const selectTasksByPriority = createSelector(
  [selectTasks],
  (tasks) => {
    const priorities = { high: [], medium: [], low: [] }
    tasks.forEach(task => {
      priorities[task.priority].push(task)
    })
    return priorities
  }
)

// Selector to get tasks with their category info
export const selectTasksWithCategories = createSelector(
  [selectTasks, selectCategories],
  (tasks, categories) => {
    return tasks.map(task => {
      const category = categories.find(cat => cat.id === task.categoryId)
      return { ...task, category }
    })
  }
)

// Selector for category statistics
export const selectCategoryStats = createSelector(
  [selectTasks, selectCategories],
  (tasks, categories) => {
    return categories.map(category => {
      const categoryTasks = tasks.filter(task => task.categoryId === category.id)
      const completedTasks = categoryTasks.filter(task => task.completed).length
      const totalTasks = categoryTasks.length
      const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
      
      return {
        ...category,
        totalTasks,
        completedTasks,
        completionRate
      }
    })
  }
)

// Selector for overdue tasks
export const selectOverdueTasks = createSelector(
  [selectTasks],
  (tasks) => {
    const today = new Date().toISOString().split('T')[0]
    return tasks.filter(task => 
      !task.completed && 
      task.dueDate && 
      task.dueDate < today
    )
  }
)