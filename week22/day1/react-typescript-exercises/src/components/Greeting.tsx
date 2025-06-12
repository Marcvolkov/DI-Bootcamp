// Exercise 2: Creating A React Component With TypeScript
import React from 'react';

// Define interface for props with proper TypeScript types
interface GreetingProps {
  name: string;
  messageCount: number;
}

// Functional component using TypeScript props interface
const Greeting: React.FC<GreetingProps> = ({ name, messageCount }) => {
  return (
    <div className="greeting-container">
      <h2>Hello, {name}!</h2>
      <p>You have {messageCount} message{messageCount !== 1 ? 's' : ''}</p>
      <div className="greeting-info">
        <p>Welcome to our React TypeScript application!</p>
        {messageCount > 0 && (
          <p className="message-notification">
            {messageCount > 5 
              ? `Wow! You have ${messageCount} messages to read!` 
              : `Don't forget to check your ${messageCount} message${messageCount !== 1 ? 's' : ''}!`
            }
          </p>
        )}
      </div>
    </div>
  );
};

export default Greeting;