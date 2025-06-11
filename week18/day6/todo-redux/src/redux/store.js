import { createStore } from 'redux';
import todoReducer from './reducers';

// Create Redux store with todo reducer
const store = createStore(
  todoReducer,
  // Enable Redux DevTools Extension if available
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;