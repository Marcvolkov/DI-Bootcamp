// Arrow function that checks if a value is a string
const isString = (value) => typeof value === 'string' || value instanceof String;

// Examples
console.log(isString('hello'));        // true
console.log(isString([1, 2, 4, 0]));   // false

// Bonus: works with String objects too
console.log(isString(new String('hi'))); // true
