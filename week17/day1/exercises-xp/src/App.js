import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorBoundary from './ErrorBoundary';
import PostList from './components/PostList';
import Example1 from './components/Example1';
import Example2 from './components/Example2';
import Example3 from './components/Example3';
import './App.css';

function HomeScreen() {
  return <h1>Home Screen</h1>;
}

function ProfileScreen() {
  return <h1>Profile Screen</h1>;
}

function ShopScreen() {
  throw new Error('Shop component crashed!');
}

function PostJson() {
  const handlePostData = async () => {
    try {
      const data = {
        key1: 'myusername',
        email: 'mymail@gmail.com',
        name: 'Isaac',
        lastname: 'Doe',
        age: 27
      };

      const response = await fetch('https://webhook.site/your-unique-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log('Response:', result);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Exercise 4: Post JSON Data</h3>
      <button 
        className="btn btn-primary" 
        onClick={handlePostData}
      >
        Post Data to Webhook
      </button>
      <p className="mt-2">Check the console for response after clicking the button.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <NavLink className="navbar-brand" to="/">React Router App</NavLink>
            <div className="navbar-nav">
              <NavLink className="nav-link" to="/">Home</NavLink>
              <NavLink className="nav-link" to="/profile">Profile</NavLink>
              <NavLink className="nav-link" to="/shop">Shop</NavLink>
            </div>
          </div>
        </nav>

        <Routes>
          <Route 
            path="/" 
            element={
              <ErrorBoundary>
                <HomeScreen />
                <PostList />
                <Example1 />
                <Example2 />
                <Example3 />
                <PostJson />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ErrorBoundary>
                <ProfileScreen />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/shop" 
            element={
              <ErrorBoundary>
                <ShopScreen />
              </ErrorBoundary>
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
