// Exercise 2: Type Guards with Union Types
// Create a function that accepts number | string and uses type guards

console.log("=== Exercise 2: Type Guards with Union Types ===");

// Function that accepts union type and uses type guards
function describeValue(value: number | string): string {
    if (typeof value === "number") {
        return "This is a number";
    } else {
        return "This is a string";
    }
}

// Test cases
console.log("Testing describeValue function:");
console.log(`describeValue(42): ${describeValue(42)}`);
console.log(`describeValue("hello"): ${describeValue("hello")}`);
console.log(`describeValue(3.14): ${describeValue(3.14)}`);
console.log(`describeValue("TypeScript"): ${describeValue("TypeScript")}`);

// More advanced type guard examples
function processValue(value: number | string): void {
    if (typeof value === "number") {
        // TypeScript now knows value is a number
        console.log(`Number value: ${value.toFixed(2)}`);
        console.log(`Square: ${value * value}`);
    } else {
        // TypeScript now knows value is a string
        console.log(`String value: "${value}"`);
        console.log(`Length: ${value.length}`);
        console.log(`Uppercase: ${value.toUpperCase()}`);
    }
}

console.log("\nTesting processValue function:");
processValue(25);
processValue("Hello World");

// Type guard function for more complex scenarios
function isNumber(value: number | string): value is number {
    return typeof value === "number";
}

function isString(value: number | string): value is string {
    return typeof value === "string";
}

// Using custom type guard functions
function analyzeValue(value: number | string): string {
    if (isNumber(value)) {
        return `Analyzed number: ${value} (even: ${value % 2 === 0})`;
    } else if (isString(value)) {
        return `Analyzed string: "${value}" (palindrome: ${value === value.split('').reverse().join('')})`;
    } else {
        return "Unknown value type";
    }
}

console.log("\nTesting analyzeValue with custom type guards:");
console.log(analyzeValue(10));
console.log(analyzeValue("radar"));
console.log(analyzeValue("hello"));
console.log(analyzeValue(7));

// Array of mixed types with type guards
const mixedValues: (number | string)[] = [1, "hello", 2, "world", 3.14, "TypeScript"];

console.log("\nProcessing mixed array with type guards:");
mixedValues.forEach((value, index) => {
    if (typeof value === "number") {
        console.log(`Index ${index}: Number ${value} -> doubled = ${value * 2}`);
    } else {
        console.log(`Index ${index}: String "${value}" -> reversed = "${value.split('').reverse().join('')}"`);
    }
});

// Type guard with null/undefined handling
function safeDescribeValue(value: number | string | null | undefined): string {
    if (value === null) {
        return "This is null";
    } else if (value === undefined) {
        return "This is undefined";
    } else if (typeof value === "number") {
        return "This is a number";
    } else {
        return "This is a string";
    }
}

console.log("\nTesting safeDescribeValue with null/undefined:");
console.log(safeDescribeValue(42));
console.log(safeDescribeValue("test"));
console.log(safeDescribeValue(null));
console.log(safeDescribeValue(undefined));

// Advanced: Discriminated Union with type guards
type Shape = 
    | { kind: "circle"; radius: number }
    | { kind: "rectangle"; width: number; height: number }
    | { kind: "square"; sideLength: number };

function calculateArea(shape: Shape): number {
    if (shape.kind === "circle") {
        return Math.PI * shape.radius * shape.radius;
    } else if (shape.kind === "rectangle") {
        return shape.width * shape.height;
    } else {
        return shape.sideLength * shape.sideLength;
    }
}

console.log("\nTesting discriminated union with type guards:");
const circle: Shape = { kind: "circle", radius: 5 };
const rectangle: Shape = { kind: "rectangle", width: 4, height: 6 };
const square: Shape = { kind: "square", sideLength: 3 };

console.log(`Circle area: ${calculateArea(circle).toFixed(2)}`);
console.log(`Rectangle area: ${calculateArea(rectangle)}`);
console.log(`Square area: ${calculateArea(square)}`);