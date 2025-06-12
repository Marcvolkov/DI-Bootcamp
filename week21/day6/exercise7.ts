// Exercise 7: Type Assertions and Generic Constraints
// Create a function that works with types having toString method and uses type assertions

console.log("=== Exercise 7: Type Assertions and Generic Constraints ===");

// Generic constraint requiring toString method
function formatInput<T extends { toString(): string }>(input: T): string {
    return `Formatted: ${input.toString()}`;
}

// Test with various types that have toString method
console.log("Testing formatInput function:");
console.log(formatInput(42));
console.log(formatInput("Hello World"));
console.log(formatInput(true));
console.log(formatInput([1, 2, 3]));
console.log(formatInput(new Date()));

// Enhanced function with type assertions and additional formatting
function smartFormat<T extends { toString(): string }>(
    input: T, 
    options: { uppercase?: boolean; prefix?: string; suffix?: string } = {}
): { original: T; formatted: string; type: string } {
    let formatted = input.toString();
    
    // Type assertions to handle specific types differently
    if (typeof input === "number") {
        const num = input as number;
        formatted = num.toFixed(2);
    } else if (typeof input === "string") {
        const str = input as string;
        formatted = options.uppercase ? str.toUpperCase() : str;
    } else if (typeof input === "boolean") {
        const bool = input as boolean;
        formatted = bool ? "TRUE" : "FALSE";
    } else if (Array.isArray(input)) {
        const arr = input as any[];
        formatted = `[${arr.join(', ')}]`;
    } else if (input instanceof Date) {
        const date = input as Date;
        formatted = date.toLocaleDateString();
    }
    
    // Apply prefix and suffix
    if (options.prefix) formatted = options.prefix + formatted;
    if (options.suffix) formatted = formatted + options.suffix;
    
    return {
        original: input,
        formatted,
        type: typeof input
    };
}

console.log("\nTesting smartFormat function:");
console.log(smartFormat(3.14159));
console.log(smartFormat("hello", { uppercase: true, prefix: ">>> ", suffix: " <<<" }));
console.log(smartFormat(false));
console.log(smartFormat([1, 2, 3, 4], { prefix: "Array: " }));
console.log(smartFormat(new Date(), { suffix: " (today)" }));

// Generic function with multiple constraints and type assertions
interface Printable {
    toString(): string;
}

interface Measurable {
    length?: number;
    size?: number;
}

function analyzeObject<T extends Printable & Measurable>(obj: T): {
    stringRepresentation: string;
    hasLength: boolean;
    hasSize: boolean;
    measurement: number | null;
} {
    const stringRep = obj.toString();
    const hasLength = typeof obj === 'object' && obj !== null && 'length' in obj && typeof obj.length === 'number';
    const hasSize = typeof obj === 'object' && obj !== null && 'size' in obj && typeof obj.size === 'number';
    
    let measurement: number | null = null;
    
    // Type assertions to access specific properties
    if (hasLength) {
        const withLength = obj as T & { length: number };
        measurement = withLength.length;
    } else if (hasSize) {
        const withSize = obj as T & { size: number };
        measurement = withSize.size;
    }
    
    return {
        stringRepresentation: stringRep,
        hasLength,
        hasSize,
        measurement
    };
}

console.log("\nTesting analyzeObject function:");
const stringObj = "Hello World";
const arrayObj = [1, 2, 3, 4, 5];
const customObj = {
    toString() { return "Custom Object"; },
    size: 42
};

console.log("String analysis:", analyzeObject(stringObj));
console.log("Array analysis:", analyzeObject(arrayObj));
console.log("Custom object analysis:", analyzeObject(customObj));

// Function with generic constraints and conditional type assertions
function processToString<T extends { toString(): string }>(
    items: T[],
    processor?: (item: T) => string
): string[] {
    return items.map(item => {
        if (processor) {
            return processor(item);
        }
        
        // Default processing with type assertions
        if (typeof item === "number") {
            const num = item as number;
            return `Number: ${num.toFixed(2)}`;
        } else if (typeof item === "string") {
            const str = item as string;
            return `String: "${str}"`;
        } else if (typeof item === "boolean") {
            const bool = item as boolean;
            return `Boolean: ${bool ? "Yes" : "No"}`;
        } else if (Array.isArray(item)) {
            const arr = item as any[];
            return `Array[${arr.length}]: ${arr.join(', ')}`;
        } else {
            return `Object: ${item.toString()}`;
        }
    });
}

console.log("\nTesting processToString function:");
const mixedItems = [42, "hello", true, [1, 2, 3], new Date()];
const processed = processToString(mixedItems);
processed.forEach(result => console.log(result));

// Custom processor function
const customProcessor = <T extends { toString(): string }>(item: T): string => {
    return `CUSTOM: ${item.toString().toUpperCase()}`;
};

console.log("\nWith custom processor:");
const customProcessed = processToString(mixedItems, customProcessor);
customProcessed.forEach(result => console.log(result));

// Advanced: Type assertions with class instances
class Person {
    constructor(public name: string, public age: number) {}
    
    toString(): string {
        return `${this.name} (${this.age} years old)`;
    }
}

class Product {
    constructor(public name: string, public price: number) {}
    
    toString(): string {
        return `${this.name} - $${this.price}`;
    }
}

function formatEntity<T extends { toString(): string; name?: string }>(entity: T): string {
    const baseString = entity.toString();
    
    // Type assertion to check for name property
    if ('name' in entity && typeof entity.name === 'string') {
        const named = entity as T & { name: string };
        return `Entity "${named.name}": ${baseString}`;
    }
    
    return `Anonymous Entity: ${baseString}`;
}

console.log("\nTesting formatEntity function:");
const person = new Person("Alice", 30);
const product = new Product("Laptop", 999);
const anonymous = { toString: () => "Unknown object" };

console.log(formatEntity(person));
console.log(formatEntity(product));
console.log(formatEntity(anonymous));

// Generic utility function with complex type assertions
function serialize<T extends { toString(): string }>(
    data: T,
    format: 'json' | 'string' | 'debug' = 'string'
): string {
    switch (format) {
        case 'json':
            // Try to serialize as JSON, fallback to string
            try {
                if (typeof data === 'object' && data !== null) {
                    const obj = data as object;
                    return JSON.stringify(obj);
                } else {
                    const stringValue = (data as any).toString();
                    return JSON.stringify({ value: stringValue });
                }
            } catch {
                const stringValue = (data as any).toString();
                return `"${stringValue}"`;
            }
            
        case 'debug':
            // Type assertion for detailed debug info
            const debugInfo: any = {
                type: typeof data,
                constructor: data.constructor?.name || 'Unknown',
                stringValue: data.toString(),
                isArray: Array.isArray(data)
            };
            
            if (typeof data === 'object' && data !== null) {
                const obj = data as Record<string, any>;
                debugInfo.keys = Object.keys(obj);
                debugInfo.hasLength = 'length' in obj;
            }
            
            return JSON.stringify(debugInfo, null, 2);
            
        default:
            return data.toString();
    }
}

console.log("\nTesting serialize function:");
const testData = [
    "Hello",
    42,
    { name: "Test", value: 123 },
    [1, 2, 3],
    new Date()
];

testData.forEach(item => {
    console.log(`\n--- Serializing: ${item} ---`);
    console.log("String:", serialize(item, 'string'));
    console.log("JSON:", serialize(item, 'json'));
    console.log("Debug:", serialize(item, 'debug'));
});

// Function that combines all concepts
function ultimateFormatter<T extends { toString(): string }>(
    input: T,
    options: {
        format?: 'simple' | 'detailed' | 'json';
        transform?: (str: string) => string;
        includeType?: boolean;
    } = {}
): { formatted: string; metadata: { type: string; originalLength: number } } {
    const { format = 'simple', transform, includeType = false } = options;
    
    let formatted = input.toString();
    
    // Type-specific formatting with assertions
    if (typeof input === 'number') {
        const num = input as number;
        formatted = format === 'detailed' ? `${num} (${num.toFixed(2)})` : formatted;
    } else if (typeof input === 'string') {
        const str = input as string;
        formatted = format === 'detailed' ? `"${str}" (${str.length} chars)` : formatted;
    } else if (Array.isArray(input)) {
        const arr = input as any[];
        formatted = format === 'detailed' ? `Array[${arr.length}]: ${arr.join(', ')}` : formatted;
    }
    
    if (transform) {
        formatted = transform(formatted);
    }
    
    if (includeType) {
        formatted = `[${typeof input}] ${formatted}`;
    }
    
    if (format === 'json') {
        formatted = JSON.stringify({ value: formatted });
    }
    
    return {
        formatted,
        metadata: {
            type: typeof input,
            originalLength: input.toString().length
        }
    };
}

console.log("\n=== Ultimate Formatter Test ===");
const testItems = [42, "TypeScript", [1, 2, 3], true];

testItems.forEach(item => {
    const result = ultimateFormatter(item, {
        format: 'detailed',
        transform: (str) => str.toUpperCase(),
        includeType: true
    });
    console.log(`Result: ${result.formatted}`);
    console.log(`Metadata:`, result.metadata);
});