import React, { createContext, useContext, useReducer } from 'react';

const TaskContext = createContext();

const initialState = {
  tasks: [],
  filter: 'all', // 'all', 'active', 'completed'
  nextId: 1
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: state.nextId,
            text: action.payload,
            completed: false
          }
        ],
        nextId: state.nextId + 1
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        )
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };

    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, text: action.payload.text }
            : task
        )
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };

    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const addTask = (text) => {
    if (text.trim()) {
      dispatch({ type: 'ADD_TASK', payload: text.trim() });
    }
  };

  const toggleTask = (id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  const deleteTask = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const editTask = (id, text) => {
    if (text.trim()) {
      dispatch({ type: 'EDIT_TASK', payload: { id, text: text.trim() } });
    }
  };

  const setFilter = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const getFilteredTasks = () => {
    switch (state.filter) {
      case 'active':
        return state.tasks.filter(task => !task.completed);
      case 'completed':
        return state.tasks.filter(task => task.completed);
      default:
        return state.tasks;
    }
  };

  const value = {
    tasks: state.tasks,
    filteredTasks: getFilteredTasks(),
    filter: state.filter,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    setFilter
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};