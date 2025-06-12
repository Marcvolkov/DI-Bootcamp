// Exercise 4: Creating A React Component With Optional Props
import React from 'react';

// Define interface with optional props using ? syntax
interface UserCardProps {
  name?: string;
  age?: number;
  role?: string;
}

const UserCard: React.FC<UserCardProps> = ({ 
  name = 'Anonymous User', 
  age = 0, 
  role = 'Guest' 
}) => {
  // Helper function to determine age category
  const getAgeCategory = (userAge: number): string => {
    if (userAge < 18) return 'Minor';
    if (userAge < 65) return 'Adult';
    return 'Senior';
  };

  // Helper function to get role color
  const getRoleColor = (userRole: string): string => {
    const roleColors: { [key: string]: string } = {
      'Admin': '#e74c3c',
      'Manager': '#f39c12',
      'Developer': '#3498db',
      'Designer': '#9b59b6',
      'Guest': '#95a5a6'
    };
    return roleColors[userRole] || '#34495e';
  };

  return (
    <div className="user-card">
      <div className="user-card-header">
        <h3 className="user-name">{name}</h3>
        <span 
          className="user-role"
          style={{ backgroundColor: getRoleColor(role) }}
        >
          {role}
        </span>
      </div>
      
      <div className="user-card-body">
        <div className="user-detail">
          <span className="detail-label">Age:</span>
          <span className="detail-value">
            {age > 0 ? `${age} years old` : 'Age not specified'}
          </span>
        </div>

        {age > 0 && (
          <div className="user-detail">
            <span className="detail-label">Category:</span>
            <span className="detail-value">{getAgeCategory(age)}</span>
          </div>
        )}

        <div className="user-detail">
          <span className="detail-label">Status:</span>
          <span className="detail-value">
            {name !== 'Anonymous User' ? 'Registered' : 'Anonymous'}
          </span>
        </div>
      </div>

      <div className="user-card-footer">
        <small className="user-id">
          ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
        </small>
      </div>
    </div>
  );
};

export default UserCard;