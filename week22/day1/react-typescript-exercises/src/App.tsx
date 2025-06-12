// Week 22 Day 1: React with TypeScript Exercises
import { useState } from 'react';
import './App.css';

// Import all exercise components
import Greeting from './components/Greeting';
import Counter from './components/Counter';
import UserCard from './components/UserCard';
import UserList from './components/UserList';
import DailyChallenge from './components/DailyChallenge';

// Define type for active exercise
type ExerciseType = 'greeting' | 'counter' | 'usercard' | 'userlist' | 'daily' | 'all';

function App() {
  const [activeExercise, setActiveExercise] = useState<ExerciseType>('all');

  const renderExercise = () => {
    switch (activeExercise) {
      case 'greeting':
        return (
          <div className="exercise-section">
            <h2>Exercise 2: React Component with TypeScript Props</h2>
            <Greeting name="Alice Johnson" messageCount={3} />
            <Greeting name="Bob Smith" messageCount={1} />
            <Greeting name="Charlie Brown" messageCount={0} />
            <Greeting name="Diana Prince" messageCount={7} />
          </div>
        );

      case 'counter':
        return (
          <div className="exercise-section">
            <h2>Exercise 3: useState Hook with TypeScript</h2>
            <Counter />
          </div>
        );

      case 'usercard':
        return (
          <div className="exercise-section">
            <h2>Exercise 4: Component with Optional Props</h2>
            <div className="user-cards-grid">
              {/* Test with all props provided */}
              <UserCard name="John Doe" age={30} role="Developer" />
              
              {/* Test with some props omitted */}
              <UserCard name="Jane Smith" age={25} />
              
              {/* Test with different prop combinations */}
              <UserCard name="Mike Johnson" role="Manager" />
              
              {/* Test with only age */}
              <UserCard age={45} />
              
              {/* Test with no props (all defaults) */}
              <UserCard />
              
              {/* Test with different roles */}
              <UserCard name="Sarah Wilson" age={28} role="Designer" />
              <UserCard name="David Brown" age={35} role="Admin" />
              <UserCard name="Lisa Garcia" age={22} role="Intern" />
            </div>
          </div>
        );

      case 'userlist':
        return (
          <div className="exercise-section">
            <h2>Exercise 5: useEffect Hook with API Data Fetching</h2>
            <UserList />
          </div>
        );

      case 'daily':
        return <DailyChallenge />;

      case 'all':
      default:
        return (
          <div className="all-exercises">
            <div className="exercise-section">
              <h2>Exercise 2: React Component with TypeScript Props</h2>
              <div className="greeting-examples">
                <Greeting name="Alice Johnson" messageCount={3} />
                <Greeting name="Bob Smith" messageCount={1} />
              </div>
            </div>

            <div className="exercise-section">
              <h2>Exercise 3: useState Hook with TypeScript</h2>
              <Counter />
            </div>

            <div className="exercise-section">
              <h2>Exercise 4: Component with Optional Props</h2>
              <div className="user-cards-preview">
                <UserCard name="John Doe" age={30} role="Developer" />
                <UserCard name="Jane Smith" age={25} />
                <UserCard />
              </div>
            </div>

            <div className="exercise-section">
              <h2>Exercise 5: useEffect Hook with API Data Fetching</h2>
              <UserList />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Week 22 Day 1: React with TypeScript</h1>
        <p>Learning React components, hooks, and TypeScript integration</p>
      </header>

      <nav className="exercise-nav">
        <button 
          onClick={() => setActiveExercise('all')}
          className={activeExercise === 'all' ? 'active' : ''}
        >
          All Exercises
        </button>
        <button 
          onClick={() => setActiveExercise('greeting')}
          className={activeExercise === 'greeting' ? 'active' : ''}
        >
          Exercise 2: Props
        </button>
        <button 
          onClick={() => setActiveExercise('counter')}
          className={activeExercise === 'counter' ? 'active' : ''}
        >
          Exercise 3: useState
        </button>
        <button 
          onClick={() => setActiveExercise('usercard')}
          className={activeExercise === 'usercard' ? 'active' : ''}
        >
          Exercise 4: Optional Props
        </button>
        <button 
          onClick={() => setActiveExercise('userlist')}
          className={activeExercise === 'userlist' ? 'active' : ''}
        >
          Exercise 5: useEffect
        </button>
        <button 
          onClick={() => setActiveExercise('daily')}
          className={activeExercise === 'daily' ? 'active' : ''}
        >
          Daily Challenge
        </button>
      </nav>

      <main className="app-main">
        {renderExercise()}
      </main>

      <footer className="app-footer">
        <p>React + TypeScript + Vite</p>
        <p>Exercise Status: ✅ All exercises + Daily Challenge implemented with TypeScript</p>
        <p>🎯 Features: Generic Components | useState/useEffect Hooks | API Integration | Type Safety</p>
      </footer>
    </div>
  );
}

export default App;