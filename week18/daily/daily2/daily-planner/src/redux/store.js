import { createStore } from 'redux';
import plannerReducer from './reducers';

// Create Redux store with planner reducer
const store = createStore(
  plannerReducer,
  // Enable Redux DevTools Extension if available
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;