import React, { useState } from 'react';
import quotes from './quotes';
import './App.css';

function App() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  return (
    <div className="App">
      <div className="quote-container">
        <h1 className="title">Random Quote Generator</h1>
        
        <div className="quote-box">
          <div className="quote-text">
            "{currentQuote.quote}"
          </div>
          
          <div className="quote-author">
            {currentQuote.author ? `- ${currentQuote.author}` : '- Unknown'}
          </div>
        </div>
        
        <button 
          className="new-quote-btn" 
          onClick={getRandomQuote}
        >
          New Quote
        </button>
      </div>
    </div>
  );
}

export default App;
