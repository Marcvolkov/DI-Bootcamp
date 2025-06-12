import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTheme } from './features/ui/uiSlice';
import { getCurrentUser } from './features/auth/authSlice';

// Layout Components
import Navbar from './app/components/Navbar';
import Sidebar from './app/components/Sidebar';
import Notifications from './app/components/Notifications';
import ProtectedRoute from './app/components/ProtectedRoute';

// Modal Components
import CreateStoryModal from './app/components/CreateStoryModal';
import EditStoryModal from './app/components/EditStoryModal';
import AddContributorModal from './app/components/AddContributorModal';

// Pages
import HomePage from './app/pages/HomePage';
import LoginPage from './app/pages/LoginPage';
import RegisterPage from './app/pages/RegisterPage';
import ProfilePage from './app/pages/ProfilePage';
import StoriesPage from './app/pages/StoriesPage';
import StoryDetailPage from './app/pages/StoryDetailPage';

function App() {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.ui);
  const { isAuthenticated, accessToken } = useAppSelector((state) => state.auth);

  // Initialize theme on app startup
  useEffect(() => {
    dispatch(setTheme(theme));
  }, [dispatch, theme]);

  // Attempt to get current user if we have a token
  useEffect(() => {
    if (accessToken && isAuthenticated) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, accessToken, isAuthenticated]);

  return (
    <Router>
      <div className="min-h-screen bg-base-100">
        {/* Global Notifications */}
        <Notifications />
        
        {/* Navigation */}
        <Navbar />
        
        <div className="flex">
          {/* Sidebar - only show when authenticated */}
          {isAuthenticated && <Sidebar />}
          
          {/* Main Content */}
          <main className={`flex-1 ${isAuthenticated ? 'ml-0 lg:ml-64' : ''}`}>
            <div className="container mx-auto px-4 py-8">
              <Routes>
                {/* Public Routes */}
                <Route 
                  path="/login" 
                  element={
                    isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
                  } 
                />
                <Route 
                  path="/register" 
                  element={
                    isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />
                  } 
                />
                
                {/* Protected Routes */}
                <Route 
                  path="/" 
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/stories" 
                  element={
                    <ProtectedRoute>
                      <StoriesPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/stories/:id" 
                  element={
                    <ProtectedRoute>
                      <StoryDetailPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Catch all - redirect to home or login */}
                <Route 
                  path="*" 
                  element={
                    <Navigate to={isAuthenticated ? "/" : "/login"} replace />
                  } 
                />
              </Routes>
            </div>
          </main>
        </div>
        
        {/* Global Modals */}
        <CreateStoryModal />
        <EditStoryModal />
        <AddContributorModal />
      </div>
    </Router>
  );
}

export default App;