import { SET_SELECTED_DATE, ADD_TASK, EDIT_TASK, DELETE_TASK, TOGGLE_TASK } from './actionTypes';

// Helper function to get today's date in YYYY-MM-DD format
const getTodayString = () => {
  return new Date().toISOString().split('T')[0];
};

// Initial state for the planner
const initialState = {
  selectedDate: getTodayString(),
  tasksByDate: {
    // Structure: { 'YYYY-MM-DD': [tasks...] }
  }
};

// Planner reducer
const plannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.payload.date
      };

    case ADD_TASK:
      const { date, task } = action.payload;
      return {
        ...state,
        tasksByDate: {
          ...state.tasksByDate,
          [date]: [
            ...(state.tasksByDate[date] || []),
            task
          ]
        }
      };

    case EDIT_TASK:
      const { date: editDate, taskId, updates } = action.payload;
      return {
        ...state,
        tasksByDate: {
          ...state.tasksByDate,
          [editDate]: (state.tasksByDate[editDate] || []).map(task =>
            task.id === taskId
              ? { ...task, ...updates }
              : task
          )
        }
      };

    case DELETE_TASK:
      const { date: deleteDate, taskId: deleteTaskId } = action.payload;
      return {
        ...state,
        tasksByDate: {
          ...state.tasksByDate,
          [deleteDate]: (state.tasksByDate[deleteDate] || []).filter(task =>
            task.id !== deleteTaskId
          )
        }
      };

    case TOGGLE_TASK:
      const { date: toggleDate, taskId: toggleTaskId } = action.payload;
      return {
        ...state,
        tasksByDate: {
          ...state.tasksByDate,
          [toggleDate]: (state.tasksByDate[toggleDate] || []).map(task =>
            task.id === toggleTaskId
              ? { ...task, completed: !task.completed }
              : task
          )
        }
      };

    default:
      return state;
  }
};

export default plannerReducer;