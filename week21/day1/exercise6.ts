// Exercise 6: Object Type Annotations
// Define the structure of an object using TypeScript's type annotations

// Define the Person object type annotation
type Person = {
    name: string;
    age: number;
};

// Create a function that returns an object matching the Person structure
function createPerson(name: string, age: number): Person {
    return {
        name: name,
        age: age
    };
}

// Test the createPerson function
const person1 = createPerson("Alice", 25);
console.log(person1); // Output: { name: 'Alice', age: 25 }

const person2 = createPerson("Bob", 30);
console.log(person2); // Output: { name: 'Bob', age: 30 }

// Access individual properties
console.log("Person 1 name:", person1.name);
console.log("Person 1 age:", person1.age);

// Alternative syntax using interface
interface PersonInterface {
    name: string;
    age: number;
}

function createPersonWithInterface(name: string, age: number): PersonInterface {
    return { name, age }; // Shorthand property syntax
}

const person3 = createPersonWithInterface("Charlie", 35);
console.log(person3); // Output: { name: 'Charlie', age: 35 }