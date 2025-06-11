// app.js
import { people } from './data.js';

/**
 * Calculate the average age of an array of person‐objects.
 * @param {Array<{name:string,age:number,location:string}>} arr
 * @returns {number}
 */
function averageAge(arr) {
  if (arr.length === 0) return 0;
  const sum = arr.reduce((acc, { age }) => acc + age, 0);
  return sum / arr.length;
}

const avg = averageAge(people);
console.log(`Average age is ${avg}`);  // → Average age is 29.25
