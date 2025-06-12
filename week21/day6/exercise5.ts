// Exercise 5: Generic Constraints
// Create a function that works with types that have a length property

console.log("=== Exercise 5: Generic Constraints ===");

// Basic generic constraint - types must have length property
function logLength<T extends { length: number }>(item: T): T {
    console.log(`Item length: ${item.length}`);
    return item;
}

// Test with different types that have length property
console.log("Testing logLength function:");
logLength("Hello World");
logLength([1, 2, 3, 4, 5]);
logLength({ length: 10, name: "custom object" });

// Enhanced function with more detailed logging
function analyzeLength<T extends { length: number }>(item: T): { item: T; length: number; isEmpty: boolean } {
    const length = item.length;
    const isEmpty = length === 0;
    
    console.log(`Analyzing item with length ${length} (${isEmpty ? "empty" : "not empty"})`);
    
    return {
        item,
        length,
        isEmpty
    };
}

console.log("\nTesting analyzeLength function:");
console.log(analyzeLength(""));
console.log(analyzeLength("TypeScript"));
console.log(analyzeLength([]));
console.log(analyzeLength([1, 2, 3]));

// Generic constraint with multiple requirements
interface Measurable {
    length: number;
    width?: number;
}

function calculateArea<T extends Measurable>(item: T): number {
    if (item.width !== undefined) {
        return item.length * item.width;
    } else {
        // Treat as linear measurement
        return item.length;
    }
}

console.log("\nTesting calculateArea with constrained generics:");
const rectangle = { length: 10, width: 5 };
const line = { length: 15 };

console.log(`Rectangle area: ${calculateArea(rectangle)}`);
console.log(`Line length: ${calculateArea(line)}`);

// Generic constraint with array operations
function getFirstAndLast<T extends { length: number } & ArrayLike<any>>(
    items: T
): { first: any; last: any; length: number } | null {
    if (items.length === 0) {
        return null;
    }
    
    return {
        first: items[0],
        last: items[items.length - 1],
        length: items.length
    };
}

console.log("\nTesting getFirstAndLast function:");
const numbers = [1, 2, 3, 4, 5];
const letters = "ABCDE";
const result1 = getFirstAndLast(numbers);
const result2 = getFirstAndLast(letters);

if (result1) {
    console.log(`Numbers: first=${result1.first}, last=${result1.last}, length=${result1.length}`);
}
if (result2) {
    console.log(`Letters: first=${result2.first}, last=${result2.last}, length=${result2.length}`);
}

// Multiple generic constraints
interface Named {
    name: string;
}

interface Sized {
    length: number;
}

function processNamedItem<T extends Named & Sized>(item: T): string {
    return `${item.name} has length ${item.length}`;
}

console.log("\nTesting multiple generic constraints:");
const namedArray = { name: "Numbers", length: 5, data: [1, 2, 3, 4, 5] };
const namedString = { name: "Greeting", length: 11, value: "Hello World" };

console.log(processNamedItem(namedArray));
console.log(processNamedItem(namedString));

// Generic constraints with keyof operator
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

console.log("\nTesting keyof constraints:");
const person = { name: "Alice", age: 30, city: "New York" };
const personName = getProperty(person, "name");
const personAge = getProperty(person, "age");

console.log(`Person name: ${personName}`);
console.log(`Person age: ${personAge}`);

// Generic constraint with function types
interface Callable {
    (): any;
}

function executeAndMeasure<T extends Callable>(fn: T): { result: any; executionTime: number } {
    const start = Date.now();
    const result = fn();
    const executionTime = Date.now() - start;
    
    return { result, executionTime };
}

console.log("\nTesting function constraints:");
const slowFunction = () => {
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
        sum += i;
    }
    return sum;
};

const fastFunction = () => "Hello World";

const slowResult = executeAndMeasure(slowFunction);
const fastResult = executeAndMeasure(fastFunction);

console.log(`Slow function result: ${slowResult.result} (${slowResult.executionTime}ms)`);
console.log(`Fast function result: ${fastResult.result} (${fastResult.executionTime}ms)`);

// Advanced: Conditional types with constraints
type HasLength<T> = T extends { length: number } ? T : never;

function processLengthyItem<T>(item: HasLength<T>): number {
    return item.length;
}

console.log("\nTesting conditional type constraints:");
console.log(`String length: ${processLengthyItem("Hello")}`);
console.log(`Array length: ${processLengthyItem([1, 2, 3])}`);

// Generic constraint with return type inference
function createArray<T extends { length: number }>(template: T, size: number): T[] {
    const result: T[] = [];
    for (let i = 0; i < size; i++) {
        result.push(template);
    }
    return result;
}

console.log("\nTesting array creation with constraints:");
const stringArray = createArray("Hello", 3);
const numberArray = createArray([1, 2], 2);

console.log("String array:", stringArray);
console.log("Number array:", numberArray);

// Constraint with utility types
function cloneWithLength<T extends Record<string, any> & { length: number }>(obj: T): T {
    return { ...obj };
}

console.log("\nTesting utility type constraints:");
const complexObject = { 
    name: "Complex", 
    length: 7, 
    data: [1, 2, 3], 
    active: true 
};

const cloned = cloneWithLength(complexObject);
console.log("Original:", complexObject);
console.log("Cloned:", cloned);
console.log("Are they equal?", complexObject === cloned);

// Generic constraint with method requirements
interface Serializable {
    toString(): string;
    length: number;
}

function serializeItem<T extends Serializable>(item: T): { serialized: string; length: number } {
    return {
        serialized: item.toString(),
        length: item.length
    };
}

console.log("\nTesting serialization constraints:");
const serializableArray = [1, 2, 3, 4, 5];
const serializableString = "Serialize me!";

console.log(serializeItem(serializableArray));
console.log(serializeItem(serializableString));