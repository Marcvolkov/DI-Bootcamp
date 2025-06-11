import { SET_SELECTED_DATE, ADD_TASK, EDIT_TASK, DELETE_TASK, TOGGLE_TASK } from './actionTypes';

let nextTaskId = 1;

// Action creator for setting selected date
export const setSelectedDate = (date) => ({
  type: SET_SELECTED_DATE,
  payload: { date }
});

// Action creator for adding a task
export const addTask = (date, title, description = '') => ({
  type: ADD_TASK,
  payload: {
    date,
    task: {
      id: nextTaskId++,
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString()
    }
  }
});

// Action creator for editing a task
export const editTask = (date, taskId, updates) => ({
  type: EDIT_TASK,
  payload: {
    date,
    taskId,
    updates
  }
});

// Action creator for deleting a task
export const deleteTask = (date, taskId) => ({
  type: DELETE_TASK,
  payload: {
    date,
    taskId
  }
});

// Action creator for toggling task completion
export const toggleTask = (date, taskId) => ({
  type: TOGGLE_TASK,
  payload: {
    date,
    taskId
  }
});