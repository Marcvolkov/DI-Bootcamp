// Exercise 5: Using useEffect Hook With TypeScript In React
import React, { useState, useEffect } from 'react';

// Define User interface for API data with proper TypeScript types
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// Define component state types
type LoadingState = boolean;
type ErrorState = string | null;

const UserList: React.FC = () => {
  // State management with proper TypeScript types
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<LoadingState>(true);
  const [error, setError] = useState<ErrorState>(null);

  // useEffect hook with TypeScript - fetch data on component mount
  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData: User[] = await response.json();
        setUsers(userData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this runs once on mount

  // Helper function to refresh data
  const refreshUsers = (): void => {
    setUsers([]);
    setLoading(true);
    setError(null);
    
    // Re-trigger the fetch
    const fetchUsers = async (): Promise<void> => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData: User[] = await response.json();
        setUsers(userData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  };

  // Render loading state
  if (loading) {
    return (
      <div className="user-list-container">
        <div className="loading-spinner">
          <h2>Loading users...</h2>
          <div className="spinner"></div>
          <p>Fetching data from API...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="user-list-container">
        <div className="error-message">
          <h2>Error Loading Users</h2>
          <p>Failed to fetch users: {error}</p>
          <button onClick={refreshUsers} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Render users list
  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h2>Users List ({users.length} users)</h2>
        <button onClick={refreshUsers} className="refresh-btn">
          Refresh Data
        </button>
      </div>

      <div className="users-grid">
        {users.map((user: User) => (
          <div key={user.id} className="user-item">
            <div className="user-header">
              <h3>{user.name}</h3>
              <span className="username">@{user.username}</span>
            </div>

            <div className="user-details">
              <div className="detail-row">
                <strong>Email:</strong> 
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </div>

              <div className="detail-row">
                <strong>Phone:</strong> {user.phone}
              </div>

              <div className="detail-row">
                <strong>Website:</strong> 
                <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">
                  {user.website}
                </a>
              </div>

              <div className="detail-row">
                <strong>City:</strong> {user.address.city}
              </div>

              <div className="detail-row">
                <strong>Company:</strong> {user.company.name}
              </div>

              <div className="company-details">
                <em>"{user.company.catchPhrase}"</em>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="user-list-footer">
        <p>Data fetched from JSONPlaceholder API</p>
        <p>Total users loaded: <strong>{users.length}</strong></p>
      </div>
    </div>
  );
};

export default UserList;