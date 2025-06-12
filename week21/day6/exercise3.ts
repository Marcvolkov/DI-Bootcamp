// Exercise 3: Type Casting
// Convert any type to string using type casting

console.log("=== Exercise 3: Type Casting ===");

// Basic type casting from any to string
function convertToString(value: any): string {
    return value as string;
}

// Test with different types
console.log("Testing basic type casting:");
const anyValue1: any = "Hello World";
const anyValue2: any = 42;
const anyValue3: any = true;
const anyValue4: any = { name: "John", age: 30 };

console.log(`String value: "${convertToString(anyValue1)}"`);
console.log(`Number as string: "${convertToString(anyValue2)}"`);
console.log(`Boolean as string: "${convertToString(anyValue3)}"`);
console.log(`Object as string: "${convertToString(anyValue4)}"`);

// Safe type casting with validation
function safeConvertToString(value: any): string {
    if (typeof value === "string") {
        return value;
    } else if (typeof value === "number" || typeof value === "boolean") {
        return String(value);
    } else if (value === null) {
        return "null";
    } else if (value === undefined) {
        return "undefined";
    } else if (typeof value === "object") {
        return JSON.stringify(value);
    } else {
        return String(value);
    }
}

console.log("\nTesting safe type casting:");
console.log(`Safe string: "${safeConvertToString("TypeScript")}"`);
console.log(`Safe number: "${safeConvertToString(123)}"`);
console.log(`Safe boolean: "${safeConvertToString(false)}"`);
console.log(`Safe null: "${safeConvertToString(null)}"`);
console.log(`Safe undefined: "${safeConvertToString(undefined)}"`);
console.log(`Safe object: "${safeConvertToString({ x: 1, y: 2 })}"`);

// Type casting with arrays
function convertArrayToString(values: any[]): string[] {
    return values.map(value => value as string);
}

console.log("\nTesting array type casting:");
const mixedArray: any[] = ["hello", 42, true, "world"];
const stringArray = convertArrayToString(mixedArray);
console.log("Original array:", mixedArray);
console.log("Cast to strings:", stringArray);

// More realistic type casting scenarios
interface ApiResponse {
    data: any;
    status: number;
    message: string;
}

function processApiResponse(response: ApiResponse): void {
    console.log(`\nProcessing API response (status: ${response.status}):`);
    console.log(`Message: ${response.message}`);
    
    // Cast the data to different types based on expected structure
    if (response.status === 200) {
        // Assume data is a user object
        const userData = response.data as { name: string; email: string; age: number };
        console.log(`User: ${userData.name} (${userData.email}), Age: ${userData.age}`);
    } else if (response.status === 404) {
        // Assume data is an error message
        const errorMessage = response.data as string;
        console.log(`Error: ${errorMessage}`);
    } else {
        // Fallback to string representation
        const dataAsString = response.data as string;
        console.log(`Data: ${dataAsString}`);
    }
}

// Test API response processing
const successResponse: ApiResponse = {
    data: { name: "Alice Johnson", email: "alice@example.com", age: 28 },
    status: 200,
    message: "Success"
};

const errorResponse: ApiResponse = {
    data: "User not found",
    status: 404,
    message: "Not Found"
};

processApiResponse(successResponse);
processApiResponse(errorResponse);

// Type casting with union types
function castToNumberOrString(value: any): number | string {
    if (typeof value === "number" || typeof value === "string") {
        return value;
    } else if (typeof value === "boolean") {
        return value ? "true" : "false";
    } else {
        return String(value);
    }
}

console.log("\nTesting casting to union types:");
console.log(`Number: ${castToNumberOrString(42)}`);
console.log(`String: ${castToNumberOrString("hello")}`);
console.log(`Boolean true: ${castToNumberOrString(true)}`);
console.log(`Boolean false: ${castToNumberOrString(false)}`);
console.log(`Object: ${castToNumberOrString({ x: 1 })}`);

// Advanced: Type casting with generics
function castTo<T>(value: any): T {
    return value as T;
}

console.log("\nTesting generic type casting:");
const castNumber = castTo<number>("123");
const castString = castTo<string>(456);
const castBoolean = castTo<boolean>("true");

console.log(`Cast to number: ${castNumber} (type: ${typeof castNumber})`);
console.log(`Cast to string: ${castString} (type: ${typeof castString})`);
console.log(`Cast to boolean: ${castBoolean} (type: ${typeof castBoolean})`);

// Type casting with interfaces
interface Product {
    id: number;
    name: string;
    price: number;
}

function processProductData(data: any): Product {
    return data as Product;
}

console.log("\nTesting interface type casting:");
const productData: any = {
    id: 1,
    name: "Laptop",
    price: 999.99,
    category: "Electronics" // Extra property
};

const product = processProductData(productData);
console.log(`Product: ${product.name} - $${product.price} (ID: ${product.id})`);

// Type casting with type guards for safety
function isValidProduct(data: any): data is Product {
    return (
        typeof data === "object" &&
        data !== null &&
        typeof data.id === "number" &&
        typeof data.name === "string" &&
        typeof data.price === "number"
    );
}

function safeProcessProductData(data: any): Product | null {
    if (isValidProduct(data)) {
        return data as Product;
    } else {
        console.log("Invalid product data provided");
        return null;
    }
}

console.log("\nTesting safe type casting with type guards:");
const validProduct = safeProcessProductData(productData);
const invalidProduct = safeProcessProductData({ id: "not-a-number", name: true });

if (validProduct) {
    console.log(`Valid product: ${validProduct.name}`);
}
if (!invalidProduct) {
    console.log("Invalid product was rejected");
}