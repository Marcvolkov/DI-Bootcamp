import React from 'react';
import UserFavoriteAnimals from './UserFavoriteAnimals';
import Exercise from './Exercise3';
import './App.css';

const myelement = <h1>I Love JSX!</h1>;

const user = {
  firstName: 'Bob',
  lastName: 'Dylan',
  favAnimals : ['Horse','Turtle','Elephant','Monkey']
};

function App() {
  const sum = 5 + 5;
  
  return (
    <div className="App">
      <div style={{padding: '20px'}}>
        <h2>Exercise 1: JSX</h2>
        <p>Hello World!</p>
        {myelement}
        <p>React is {sum} times better with JSX</p>
        
        <hr />
        
        <h2>Exercise 2: Object</h2>
        <h3>{user.firstName}</h3>
        <h3>{user.lastName}</h3>
        <UserFavoriteAnimals favAnimals={user.favAnimals} />
        
        <hr />
        
        <h2>Exercise 3: HTML Tags In React</h2>
        <Exercise />
      </div>
    </div>
  );
}

export default App;
