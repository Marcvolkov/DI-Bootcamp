// Exercise 3: Union Types
// Use union types to declare a variable that can hold either a string or a number

// Declare a variable id that can be either a string or a number
let id: string | number;

// Example usage with string
id = "ABC123";
console.log("ID as string:", id);

// Example usage with number
id = 12345;
console.log("ID as number:", id);

// Function that accepts union type parameter
function displayId(userId: string | number): void {
    console.log("User ID:", userId);
}

// Test the function with both types
displayId("USER001");
displayId(42);