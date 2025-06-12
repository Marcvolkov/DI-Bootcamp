import axios, { AxiosError } from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { store } from '../store';
import { logoutUser, refreshToken } from '../../features/auth/authSlice';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Send cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
interface ApiError {
  message: string;
  status?: number;
}

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: ApiError) => void;
}> = [];

const processQueue = (error: ApiError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return api(originalRequest);
        }).catch((err) => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const result = await store.dispatch(refreshToken()).unwrap();
        
        if (result.accessToken) {
          processQueue(null, result.accessToken);
          return api(originalRequest);
        }
      } catch (refreshError) {
        const apiError: ApiError = refreshError instanceof Error 
          ? { message: refreshError.message, status: 401 }
          : { message: 'Token refresh failed', status: 401 };
        processQueue(apiError, null);
        store.dispatch(logoutUser());
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// API helper functions
export const apiCall = {
  get: <T>(url: string, config?: AxiosRequestConfig) => 
    api.get<T>(url, config).then(res => res.data),
    
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => 
    api.post<T>(url, data, config).then(res => res.data),
    
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => 
    api.patch<T>(url, data, config).then(res => res.data),
    
  delete: <T>(url: string, config?: AxiosRequestConfig) => 
    api.delete<T>(url, config).then(res => res.data),
};

export default api;