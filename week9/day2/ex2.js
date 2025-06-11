// 1. Transform winBattle into an arrow function
const winBattle = () => true;

// 2. Use a ternary operator to set experiencePoints
const experiencePoints = winBattle() ? 10 : 1;

// 3. Log the result
console.log(experiencePoints);  // → 10
