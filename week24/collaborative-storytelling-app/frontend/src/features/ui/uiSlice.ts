import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark' | 'system';
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  timestamp: number;
}

interface UiState {
  theme: Theme;
  sidebarOpen: boolean;
  notifications: Notification[];
  isLoading: boolean;
  loadingMessage: string;
  modals: {
    createStory: boolean;
    editStory: boolean;
    deleteStory: boolean;
    addContributor: boolean;
    userProfile: boolean;
  };
}

const initialState: UiState = {
  theme: (localStorage.getItem('theme') as Theme) || 'system',
  sidebarOpen: false,
  notifications: [],
  isLoading: false,
  loadingMessage: '',
  modals: {
    createStory: false,
    editStory: false,
    deleteStory: false,
    addContributor: false,
    userProfile: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
      
      // Apply theme to document
      const root = document.documentElement;
      if (action.payload === 'dark') {
        root.classList.add('dark');
      } else if (action.payload === 'light') {
        root.classList.remove('dark');
      } else {
        // System theme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    },
    
    toggleTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      state.theme = newTheme;
      localStorage.setItem('theme', newTheme);
      
      // Apply theme to document
      const root = document.documentElement;
      if (newTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    },
    
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        duration: action.payload.duration || 5000,
      };
      
      state.notifications.push(notification);
      
      // Limit to 5 notifications
      if (state.notifications.length > 5) {
        state.notifications.shift();
      }
    },
    
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    
    clearNotifications: (state) => {
      state.notifications = [];
    },
    
    setLoading: (state, action: PayloadAction<{ isLoading: boolean; message?: string }>) => {
      state.isLoading = action.payload.isLoading;
      state.loadingMessage = action.payload.message || '';
    },
    
    openModal: (state, action: PayloadAction<keyof UiState['modals']>) => {
      state.modals[action.payload] = true;
    },
    
    closeModal: (state, action: PayloadAction<keyof UiState['modals']>) => {
      state.modals[action.payload] = false;
    },
    
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(key => {
        state.modals[key as keyof UiState['modals']] = false;
      });
    },
  },
});

export const {
  setTheme,
  toggleTheme,
  setSidebarOpen,
  toggleSidebar,
  addNotification,
  removeNotification,
  clearNotifications,
  setLoading,
  openModal,
  closeModal,
  closeAllModals,
} = uiSlice.actions;

export default uiSlice.reducer;

// Helper action creators for common notifications
export const showSuccessNotification = (title: string, message: string) =>
  addNotification({ type: 'success', title, message });

export const showErrorNotification = (title: string, message: string) =>
  addNotification({ type: 'error', title, message });

export const showWarningNotification = (title: string, message: string) =>
  addNotification({ type: 'warning', title, message });

export const showInfoNotification = (title: string, message: string) =>
  addNotification({ type: 'info', title, message });