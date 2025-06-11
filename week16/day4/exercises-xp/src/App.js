import React from 'react';
import Car from './Components/Car';
import Events from './Components/Events';
import Phone from './Components/Phone';
import Color from './Components/Color';
import './App.css';

const carinfo = {name: "Ford", model: "Mustang"};

function App() {
  return (
    <div className="App">
      <div style={{padding: '20px', textAlign: 'left'}}>
        <h1>Week 14 Day 4 - React Exercises</h1>
        
        <div style={{marginBottom: '30px'}}>
          <h2>Exercise 1: Car and Components</h2>
          <Car carInfo={carinfo} />
        </div>
        
        <hr />
        
        <div style={{marginBottom: '30px'}}>
          <Events />
        </div>
        
        <hr />
        
        <div style={{marginBottom: '30px'}}>
          <Phone />
        </div>
        
        <hr />
        
        <div style={{marginBottom: '30px'}}>
          <Color />
        </div>
      </div>
    </div>
  );
}

export default App;
