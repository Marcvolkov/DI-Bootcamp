// Exercise 5: Tuple Types
// Create a function that returns a tuple containing multiple values of different types

function getDetails(name: string, age: number): [string, number, string] {
    const greeting = `Hello, ${name}! You are ${age} years old.`;
    return [name, age, greeting];
}

// Call the function and log the tuple
const details = getDetails("Alice", 25);
console.log(details); // Output: ['Alice', 25, 'Hello, Alice! You are 25 years old.']

// Destructuring the tuple
const [personName, personAge, greetingMessage] = getDetails("Bob", 30);
console.log("Name:", personName);
console.log("Age:", personAge);
console.log("Greeting:", greetingMessage);

// Another example with different data
const details2 = getDetails("Charlie", 28);
console.log(details2); // Output: ['Charlie', 28, 'Hello, Charlie! You are 28 years old.']