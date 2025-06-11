import React, { useState, useEffect } from 'react';

function Color() {
  const [favoriteColor, setFavoriteColor] = useState("red");

  useEffect(() => {
    alert("useEffect reached");
  });

  const changeColor = () => {
    setFavoriteColor("blue");
  };

  return (
    <div>
      <h2>Exercise 4: UseEffect Hook</h2>
      <h1>My favorite color is {favoriteColor}</h1>
      <button onClick={changeColor}>Change color</button>
    </div>
  );
}

export default Color;