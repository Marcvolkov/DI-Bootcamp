import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User, LoginRequest, RegisterRequest } from '@storytelling/types';
import { api } from '../../app/utils/api';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { user, access_token } = response.data;
      
      // Store token in API client
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      return { user, accessToken: access_token };
    } catch (error: unknown) {
      const apiError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        apiError.response?.data?.message || 'Login failed'
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { user, access_token } = response.data;
      
      // Store token in API client
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      return { user, accessToken: access_token };
    } catch (error: unknown) {
      const apiError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        apiError.response?.data?.message || 'Registration failed'
      );
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/refresh');
      const { access_token } = response.data;
      
      // Update token in API client
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      return { accessToken: access_token };
    } catch (error: unknown) {
      const apiError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        apiError.response?.data?.message || 'Token refresh failed'
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      await api.post('/auth/logout');
      
      // Clear token from API client
      delete api.defaults.headers.common['Authorization'];
      
      return {};
    } catch {
      // Even if logout fails on server, clear local state
      delete api.defaults.headers.common['Authorization'];
      return {};
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/auth/profile');
      return { user: response.data };
    } catch (error: unknown) {
      const apiError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        apiError.response?.data?.message || 'Failed to get user profile'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
      api.defaults.headers.common['Authorization'] = `Bearer ${action.payload}`;
    },
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.error = null;
      delete api.defaults.headers.common['Authorization'];
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      
      // Refresh Token
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        delete api.defaults.headers.common['Authorization'];
      })
      
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      
      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setAccessToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;