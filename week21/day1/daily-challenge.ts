// Daily Challenge: Union Type Validator
// Create a function that validates if a value matches one of the allowed types

/**
 * Validates if a value is of one of the allowed types
 * @param value - The value to validate
 * @param allowedTypes - Array of allowed type strings
 * @returns true if value matches one of the allowed types, false otherwise
 */
function validateUnionType(value: any, allowedTypes: string[]): boolean {
    // Get the actual type of the value using typeof operator
    const actualType = typeof value;
    
    // Special handling for null (typeof null returns "object")
    if (value === null && allowedTypes.includes("null")) {
        return true;
    }
    
    // Special handling for arrays (typeof array returns "object")
    if (Array.isArray(value) && allowedTypes.includes("array")) {
        return true;
    }
    
    // Loop through allowed types to check if actual type matches
    for (let i = 0; i < allowedTypes.length; i++) {
        if (actualType === allowedTypes[i]) {
            return true;
        }
    }
    
    // Return false if no match found
    return false;
}

// Alternative implementation using array methods
function validateUnionTypeAlt(value: any, allowedTypes: string[]): boolean {
    const actualType = typeof value;
    
    // Handle special cases
    if (value === null) {
        return allowedTypes.includes("null");
    }
    
    if (Array.isArray(value)) {
        return allowedTypes.includes("array");
    }
    
    // Use includes method to check if actual type is in allowed types
    return allowedTypes.includes(actualType);
}

// Test variables with different types
const testString: string = "Hello, TypeScript!";
const testNumber: number = 42;
const testBoolean: boolean = true;
const testObject: object = { name: "Alice", age: 25 };
const testArray: number[] = [1, 2, 3, 4, 5];
const testNull: null = null;
const testUndefined: undefined = undefined;
const testFunction: Function = () => console.log("Hello");

console.log("=== Union Type Validator Demo ===\n");

// Test Case 1: String validation
console.log("1. String Validation:");
console.log(`Value: "${testString}"`);
console.log(`Allowed types: ["string", "number"]`);
console.log(`Result: ${validateUnionType(testString, ["string", "number"])}`); // true
console.log(`Alternative: ${validateUnionTypeAlt(testString, ["string", "number"])}`); // true
console.log();

// Test Case 2: Number validation (should fail)
console.log("2. Number Validation (should fail):");
console.log(`Value: ${testNumber}`);
console.log(`Allowed types: ["string", "boolean"]`);
console.log(`Result: ${validateUnionType(testNumber, ["string", "boolean"])}`); // false
console.log();

// Test Case 3: Boolean validation
console.log("3. Boolean Validation:");
console.log(`Value: ${testBoolean}`);
console.log(`Allowed types: ["boolean", "string"]`);
console.log(`Result: ${validateUnionType(testBoolean, ["boolean", "string"])}`); // true
console.log();

// Test Case 4: Object validation
console.log("4. Object Validation:");
console.log(`Value: ${JSON.stringify(testObject)}`);
console.log(`Allowed types: ["object", "string"]`);
console.log(`Result: ${validateUnionType(testObject, ["object", "string"])}`); // true
console.log();

// Test Case 5: Array validation (special case)
console.log("5. Array Validation (special case):");
console.log(`Value: [${testArray.join(", ")}]`);
console.log(`Allowed types: ["array", "string"]`);
console.log(`Result: ${validateUnionType(testArray, ["array", "string"])}`); // true
console.log(`Without array support: ${validateUnionType(testArray, ["object", "string"])}`); // true (arrays are objects)
console.log();

// Test Case 6: Null validation (special case)
console.log("6. Null Validation (special case):");
console.log(`Value: ${testNull}`);
console.log(`Allowed types: ["null", "undefined"]`);
console.log(`Result: ${validateUnionType(testNull, ["null", "undefined"])}`); // true
console.log();

// Test Case 7: Undefined validation
console.log("7. Undefined Validation:");
console.log(`Value: ${testUndefined}`);
console.log(`Allowed types: ["undefined", "string"]`);
console.log(`Result: ${validateUnionType(testUndefined, ["undefined", "string"])}`); // true
console.log();

// Test Case 8: Function validation
console.log("8. Function Validation:");
console.log(`Value: [Function]`);
console.log(`Allowed types: ["function", "object"]`);
console.log(`Result: ${validateUnionType(testFunction, ["function", "object"])}`); // true
console.log();

// Test Case 9: Multiple valid types
console.log("9. Multiple Valid Types Test:");
const mixedValues: any[] = [42, "hello", true, { id: 1 }, [1, 2, 3]];
const allowedTypes = ["number", "string", "boolean"];

mixedValues.forEach((value, index) => {
    const isValid = validateUnionType(value, allowedTypes);
    console.log(`Value ${index + 1}: ${JSON.stringify(value)} - Valid: ${isValid}`);
});
console.log();

// Test Case 10: Comprehensive validation function
function validateUserInput(input: any): { isValid: boolean; type: string; message: string } {
    const allowedInputTypes = ["string", "number", "boolean"];
    const actualType = typeof input;
    const isValid = validateUnionType(input, allowedInputTypes);
    
    return {
        isValid,
        type: actualType,
        message: isValid 
            ? `Valid input of type '${actualType}'` 
            : `Invalid input: '${actualType}' is not allowed. Expected: ${allowedInputTypes.join(", ")}`
    };
}

console.log("10. User Input Validation:");
const inputs: any[] = ["Alice", 25, true, { name: "Bob" }, null, undefined];

inputs.forEach((input, index) => {
    const result = validateUserInput(input);
    console.log(`Input ${index + 1}: ${JSON.stringify(input)}`);
    console.log(`  ${result.message}`);
    console.log();
});

// Advanced: Generic type validator with better type safety
function createTypeValidator<T extends string>(allowedTypes: readonly T[]) {
    return function validate(value: any): value is any {
        return validateUnionType(value, [...allowedTypes]);
    };
}

// Usage example with type safety
const stringOrNumberValidator = createTypeValidator(["string", "number"] as const);
const booleanOrObjectValidator = createTypeValidator(["boolean", "object"] as const);

console.log("11. Advanced Type Validators:");
console.log(`String/Number validator for "hello": ${stringOrNumberValidator("hello")}`); // true
console.log(`String/Number validator for true: ${stringOrNumberValidator(true)}`); // false
console.log(`Boolean/Object validator for false: ${booleanOrObjectValidator(false)}`); // true
console.log(`Boolean/Object validator for "test": ${booleanOrObjectValidator("test")}`); // false