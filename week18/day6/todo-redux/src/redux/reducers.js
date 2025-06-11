import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from './actionTypes';

// Initial state for the todo application
const initialState = {
  todos: []
};

// Todo reducer to handle state changes
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.payload.id,
            text: action.payload.text,
            completed: action.payload.completed
          }
        ]
      };

    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };

    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      };

    default:
      return state;
  }
};

export default todoReducer;