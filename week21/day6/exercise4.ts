// Exercise 4: Type Assertions with Union Types
// Create a function that accepts union type arrays and uses type assertions

console.log("=== Exercise 4: Type Assertions with Union Types ===");

// Function that gets the first element of a union type array
function getFirstElement(arr: (number | string)[]): number | string | undefined {
    if (arr.length === 0) {
        return undefined;
    }
    return arr[0];
}

// Test the basic function
console.log("Testing getFirstElement function:");
const numberArray: (number | string)[] = [1, 2, 3];
const stringArray: (number | string)[] = ["hello", "world"];
const mixedArray: (number | string)[] = [42, "typescript", 3.14, "javascript"];
const emptyArray: (number | string)[] = [];

console.log(`First from numbers: ${getFirstElement(numberArray)}`);
console.log(`First from strings: ${getFirstElement(stringArray)}`);
console.log(`First from mixed: ${getFirstElement(mixedArray)}`);
console.log(`First from empty: ${getFirstElement(emptyArray)}`);

// Enhanced function with type assertions
function getFirstElementAsNumber(arr: (number | string)[]): number | undefined {
    const first = getFirstElement(arr);
    if (typeof first === "number") {
        return first;
    } else if (typeof first === "string") {
        // Type assertion: treat string as potential number
        const parsed = parseFloat(first);
        return isNaN(parsed) ? undefined : parsed;
    }
    return undefined;
}

function getFirstElementAsString(arr: (number | string)[]): string | undefined {
    const first = getFirstElement(arr);
    if (typeof first === "string") {
        return first;
    } else if (typeof first === "number") {
        // Type assertion: convert number to string
        return first.toString();
    }
    return undefined;
}

console.log("\nTesting type assertion functions:");
console.log(`First as number from [1, 2, 3]: ${getFirstElementAsNumber([1, 2, 3])}`);
console.log(`First as number from ["42", "hello"]: ${getFirstElementAsNumber(["42", "hello"])}`);
console.log(`First as number from ["hello", "world"]: ${getFirstElementAsNumber(["hello", "world"])}`);

console.log(`First as string from [42, 100]: ${getFirstElementAsString([42, 100])}`);
console.log(`First as string from ["hello", "world"]: ${getFirstElementAsString(["hello", "world"])}`);

// Advanced: Type assertions with object arrays
interface Person {
    name: string;
    age: number;
}

interface Car {
    brand: string;
    year: number;
}

type PersonOrCar = Person | Car;

function getFirstPerson(arr: PersonOrCar[]): Person | undefined {
    const first = arr[0];
    if (!first) return undefined;
    
    // Type assertion with type guard
    if ("name" in first && "age" in first) {
        return first as Person;
    }
    return undefined;
}

function getFirstCar(arr: PersonOrCar[]): Car | undefined {
    const first = arr[0];
    if (!first) return undefined;
    
    // Type assertion with type guard
    if ("brand" in first && "year" in first) {
        return first as Car;
    }
    return undefined;
}

console.log("\nTesting object type assertions:");
const people: PersonOrCar[] = [
    { name: "Alice", age: 30 },
    { brand: "Toyota", year: 2020 },
    { name: "Bob", age: 25 }
];

const cars: PersonOrCar[] = [
    { brand: "Honda", year: 2019 },
    { name: "Charlie", age: 35 },
    { brand: "Ford", year: 2021 }
];

const firstPerson = getFirstPerson(people);
const firstCar = getFirstCar(cars);

if (firstPerson) {
    console.log(`First person: ${firstPerson.name}, age ${firstPerson.age}`);
}

if (firstCar) {
    console.log(`First car: ${firstCar.brand} ${firstCar.year}`);
}

// Type assertions with arrays of different types
function processFirstElement<T>(
    arr: T[], 
    processor: (item: T) => string
): string | undefined {
    if (arr.length === 0) return undefined;
    return processor(arr[0]);
}

console.log("\nTesting generic type assertions:");
const numbers = [1, 2, 3, 4, 5];
const words = ["hello", "world", "typescript"];

const firstNumberResult = processFirstElement(numbers, (num) => `Number: ${num * 2}`);
const firstWordResult = processFirstElement(words, (word) => `Word: ${word.toUpperCase()}`);

console.log(firstNumberResult);
console.log(firstWordResult);

// Complex type assertions with nested unions
type DataValue = number | string | boolean | null;
type DataArray = DataValue[];

function getFirstNonNull(arr: DataArray): DataValue {
    for (const item of arr) {
        if (item !== null) {
            return item;
        }
    }
    return null;
}

function assertAsString(value: DataValue): string {
    if (value === null) return "null";
    return value as string; // Type assertion
}

function assertAsNumber(value: DataValue): number {
    if (typeof value === "number") return value;
    if (typeof value === "string") {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? 0 : parsed;
    }
    if (typeof value === "boolean") return value ? 1 : 0;
    return 0; // null case
}

console.log("\nTesting complex type assertions:");
const dataArray: DataArray = [null, null, "42", true, 100];
const firstNonNull = getFirstNonNull(dataArray);

console.log(`First non-null: ${firstNonNull}`);
console.log(`As string: "${assertAsString(firstNonNull)}"`);
console.log(`As number: ${assertAsNumber(firstNonNull)}`);

// Type assertions with function return types
function createUnknownValue(): unknown {
    return Math.random() > 0.5 ? "Hello" : 42;
}

function handleUnknownValue(): void {
    const value = createUnknownValue();
    
    // Type assertion after type checking
    if (typeof value === "string") {
        const str = value as string;
        console.log(`String value: ${str.toUpperCase()}`);
    } else if (typeof value === "number") {
        const num = value as number;
        console.log(`Number value: ${num.toFixed(2)}`);
    }
}

console.log("\nTesting unknown type assertions:");
handleUnknownValue();
handleUnknownValue();
handleUnknownValue();

// Safe type assertion helper
function safeAssertion<T>(value: unknown, predicate: (val: unknown) => val is T): T | null {
    return predicate(value) ? (value as T) : null;
}

function isString(value: unknown): value is string {
    return typeof value === "string";
}

function isNumber(value: unknown): value is number {
    return typeof value === "number";
}

console.log("\nTesting safe type assertions:");
const unknownValues: unknown[] = ["hello", 42, true, null, "world", 3.14];

unknownValues.forEach((value, index) => {
    const asString = safeAssertion(value, isString);
    const asNumber = safeAssertion(value, isNumber);
    
    console.log(`Value ${index}: ${value}`);
    if (asString) console.log(`  As string: "${asString}"`);
    if (asNumber) console.log(`  As number: ${asNumber}`);
});