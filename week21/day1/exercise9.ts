// Exercise 9: Function Overloading With Default Parameters
// Create an overloaded function greet that can handle different parameter combinations

// Function overload signatures
function greet(): string;
function greet(name: string): string;
function greet(name: string, age: number): string;

// Function implementation
function greet(name?: string, age?: number): string {
    if (name === undefined) {
        return "Hello, welcome!";
    } else if (age === undefined) {
        return `Hello, ${name}!`;
    } else {
        return `Hello, ${name}! You are ${age} years old.`;
    }
}

// Test the overloaded function
console.log(greet());                    // Output: Hello, welcome!
console.log(greet("Alice"));             // Output: Hello, Alice!
console.log(greet("Bob", 25));           // Output: Hello, Bob! You are 25 years old.

// Alternative approach using default parameters (simpler but less strict)
function greetWithDefaults(name: string = "Guest", greeting: string = "Hello"): string {
    return `${greeting}, ${name}!`;
}

// Test the function with default parameters
console.log("\n--- Function with Default Parameters ---");
console.log(greetWithDefaults());                           // Output: Hello, Guest!
console.log(greetWithDefaults("Alice"));                    // Output: Hello, Alice!
console.log(greetWithDefaults("Bob", "Welcome"));           // Output: Welcome, Bob!

// More complex overloading example
interface GreetingOptions {
    formal?: boolean;
    timeOfDay?: "morning" | "afternoon" | "evening";
}

// Overloaded function with options
function advancedGreet(name: string): string;
function advancedGreet(name: string, options: GreetingOptions): string;
function advancedGreet(name: string, options?: GreetingOptions): string {
    const { formal = false, timeOfDay } = options || {};
    
    let greeting = "Hello";
    
    if (timeOfDay) {
        switch (timeOfDay) {
            case "morning":
                greeting = "Good morning";
                break;
            case "afternoon":
                greeting = "Good afternoon";
                break;
            case "evening":
                greeting = "Good evening";
                break;
        }
    }
    
    const title = formal ? "Mr./Ms." : "";
    return `${greeting}, ${title}${name}!`;
}

// Test advanced greeting function
console.log("\n--- Advanced Greeting Function ---");
console.log(advancedGreet("Alice"));                                          // Hello, Alice!
console.log(advancedGreet("Bob", { formal: true }));                         // Hello, Mr./Ms.Bob!
console.log(advancedGreet("Charlie", { timeOfDay: "morning" }));              // Good morning, Charlie!
console.log(advancedGreet("Diana", { formal: true, timeOfDay: "evening" })); // Good evening, Mr./Ms.Diana!