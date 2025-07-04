import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import storiesReducer from '../features/stories/storiesSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stories: storiesReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;