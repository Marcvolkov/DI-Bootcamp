import React, { useState } from 'react';
import './App.css';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);
    
    if (isNaN(number1) || isNaN(number2)) {
      alert('Please enter valid numbers');
      return;
    }

    let calculatedResult;
    
    switch (operation) {
      case 'add':
        calculatedResult = number1 + number2;
        break;
      case 'subtract':
        calculatedResult = number1 - number2;
        break;
      case 'multiply':
        calculatedResult = number1 * number2;
        break;
      case 'divide':
        if (number2 === 0) {
          alert('Cannot divide by zero');
          return;
        }
        calculatedResult = number1 / number2;
        break;
      default:
        calculatedResult = 0;
    }
    
    setResult(calculatedResult);
  };

  const reset = () => {
    setNum1('');
    setNum2('');
    setResult(null);
  };

  const getOperationSymbol = () => {
    switch (operation) {
      case 'add': return '+';
      case 'subtract': return '-';
      case 'multiply': return '×';
      case 'divide': return '÷';
      default: return '+';
    }
  };

  return (
    <div className="App">
      <div className="calculator">
        <h1>React Calculator</h1>
        
        <div className="inputs-section">
          <div className="input-group">
            <label>First Number:</label>
            <input
              type="number"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              placeholder="Enter first number"
            />
          </div>

          <div className="operation-group">
            <label>Operation:</label>
            <select 
              value={operation} 
              onChange={(e) => setOperation(e.target.value)}
            >
              <option value="add">Addition (+)</option>
              <option value="subtract">Subtraction (-)</option>
              <option value="multiply">Multiplication (×)</option>
              <option value="divide">Division (÷)</option>
            </select>
          </div>

          <div className="input-group">
            <label>Second Number:</label>
            <input
              type="number"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              placeholder="Enter second number"
            />
          </div>
        </div>

        <div className="buttons">
          <button className="calculate-btn" onClick={calculate}>
            Calculate
          </button>
          <button className="reset-btn" onClick={reset}>
            Reset
          </button>
        </div>

        {result !== null && (
          <div className="result-section">
            <h2>Result:</h2>
            <div className="calculation">
              {num1} {getOperationSymbol()} {num2} = <span className="result">{result}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
