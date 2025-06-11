import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from './actionTypes';

let nextTodoId = 1;

// Action creator for adding a todo
export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: {
    id: nextTodoId++,
    text: text,
    completed: false
  }
});

// Action creator for toggling todo completion
export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id }
});

// Action creator for removing a todo
export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: { id }
});