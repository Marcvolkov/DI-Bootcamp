import React, { useState } from 'react';

function Events() {
  const [isToggleOn, setIsToggleOn] = useState(true);

  const clickMe = () => {
    alert('I was clicked');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      alert(`The text entered was: ${event.target.value}`);
    }
  };

  const toggleState = () => {
    setIsToggleOn(!isToggleOn);
  };

  return (
    <div>
      <h2>Exercise 2: Events</h2>
      <button onClick={clickMe}>Click Me</button>
      <br /><br />
      <input 
        type="text" 
        onKeyDown={handleKeyDown} 
        placeholder="Press Enter after typing"
      />
      <br /><br />
      <button onClick={toggleState}>
        {isToggleOn ? 'ON' : 'OFF'}
      </button>
    </div>
  );
}

export default Events;