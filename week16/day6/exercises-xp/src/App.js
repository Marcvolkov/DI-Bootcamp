import React, { Component } from 'react';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

class BuggyCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }

  handleClick = () => {
    this.setState(prevState => {
      if (prevState.counter === 4) {
        throw new Error('I crashed!');
      }
      return { counter: prevState.counter + 1 };
    });
  }

  render() {
    return (
      <div>
        <h2 onClick={this.handleClick}>Counter: {this.state.counter}</h2>
        <p>Click on the counter to increase it. It will crash at 5!</p>
      </div>
    );
  }
}

class Color extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteColor: "red",
      show: true
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ favoriteColor: "yellow" });
    }, 1000);
  }

  shouldComponentUpdate() {
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("in getSnapshotBeforeUpdate");
    return null;
  }

  componentDidUpdate() {
    console.log("after update");
  }

  changeColor = () => {
    this.setState({ favoriteColor: "blue" });
  }

  deleteChild = () => {
    this.setState({ show: false });
  }

  render() {
    return (
      <div>
        <h1>My favorite color is {this.state.favoriteColor}</h1>
        <button onClick={this.changeColor}>Change color</button>
        <br /><br />
        {this.state.show && <Child />}
        <button onClick={this.deleteChild}>Delete Child</button>
      </div>
    );
  }
}

class Child extends Component {
  componentWillUnmount() {
    alert("The component named Child is about to be unmounted.");
  }

  render() {
    return (
      <div>
        <h2>Hello World!</h2>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App" style={{padding: '20px', textAlign: 'left'}}>
      <h1>Week 14 Day 6 - React Exercises</h1>
      
      <div style={{marginBottom: '40px'}}>
        <h2>Exercise 1: Error Boundary Simulation</h2>
        
        <h3>Simulation 1: Two BuggyCounters in one ErrorBoundary</h3>
        <ErrorBoundary>
          <BuggyCounter />
          <BuggyCounter />
        </ErrorBoundary>
        
        <h3>Simulation 2: Each BuggyCounter in its own ErrorBoundary</h3>
        <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary>
        <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary>
        
        <h3>Simulation 3: BuggyCounter without ErrorBoundary</h3>
        <BuggyCounter />
      </div>
      
      <hr />
      
      <div style={{marginBottom: '40px'}}>
        <h2>Exercise 2 & 3: Lifecycle Methods</h2>
        <Color />
      </div>
    </div>
  );
}

export default App;
