import React, { useState } from 'react';
import Garage from './Garage';

function Car({ carInfo }) {
  const [color, setColor] = useState('red');

  return (
    <div>
      <h1>This car is a {color} {carInfo.model}</h1>
      <Garage size="small" />
    </div>
  );
}

export default Car;