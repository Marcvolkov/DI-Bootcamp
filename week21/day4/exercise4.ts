// Exercise 4: Static Properties And Methods
// Create a class Calculator with static methods

class Calculator {
    // Static property to keep track of operations performed
    static operationsCount: number = 0;
    
    // Static method to add two numbers
    static add(a: number, b: number): number {
        Calculator.operationsCount++;
        return a + b;
    }
    
    // Static method to subtract two numbers
    static subtract(a: number, b: number): number {
        Calculator.operationsCount++;
        return a - b;
    }
    
    // Additional static methods
    static multiply(a: number, b: number): number {
        Calculator.operationsCount++;
        return a * b;
    }
    
    static divide(a: number, b: number): number {
        Calculator.operationsCount++;
        if (b === 0) {
            throw new Error("Division by zero is not allowed");
        }
        return a / b;
    }
    
    // Static method to get operations count
    static getOperationsCount(): number {
        return Calculator.operationsCount;
    }
    
    // Static method to reset operations count
    static resetOperationsCount(): void {
        Calculator.operationsCount = 0;
    }
    
    // Static method for power calculation
    static power(base: number, exponent: number): number {
        Calculator.operationsCount++;
        return Math.pow(base, exponent);
    }
    
    // Static method to calculate square root
    static sqrt(value: number): number {
        Calculator.operationsCount++;
        if (value < 0) {
            throw new Error("Cannot calculate square root of negative number");
        }
        return Math.sqrt(value);
    }
}

console.log("=== Exercise 4: Static Properties And Methods Demo ===");

// Call static methods without creating an instance
console.log("Initial operations count:", Calculator.getOperationsCount());

// Perform calculations using static methods
console.log("Addition: 10 + 5 =", Calculator.add(10, 5));
console.log("Subtraction: 10 - 5 =", Calculator.subtract(10, 5));
console.log("Multiplication: 10 * 5 =", Calculator.multiply(10, 5));
console.log("Division: 10 / 5 =", Calculator.divide(10, 5));

console.log("Operations performed so far:", Calculator.getOperationsCount());

// More calculations
console.log("Power: 2^3 =", Calculator.power(2, 3));
console.log("Square root: √16 =", Calculator.sqrt(16));

console.log("Total operations performed:", Calculator.getOperationsCount());

// Access static property directly
console.log("Direct access to operationsCount:", Calculator.operationsCount);

// Reset counter
Calculator.resetOperationsCount();
console.log("After reset:", Calculator.getOperationsCount());

// Advanced static class example
class MathUtils {
    // Static constants
    static readonly PI: number = 3.14159;
    static readonly E: number = 2.71828;
    
    // Static methods for common math operations
    static circleArea(radius: number): number {
        return MathUtils.PI * radius * radius;
    }
    
    static circleCircumference(radius: number): number {
        return 2 * MathUtils.PI * radius;
    }
    
    static factorial(n: number): number {
        if (n < 0) throw new Error("Factorial of negative number is undefined");
        if (n === 0 || n === 1) return 1;
        return n * MathUtils.factorial(n - 1);
    }
    
    static fibonacci(n: number): number {
        if (n < 0) throw new Error("Fibonacci of negative number is undefined");
        if (n === 0) return 0;
        if (n === 1) return 1;
        return MathUtils.fibonacci(n - 1) + MathUtils.fibonacci(n - 2);
    }
    
    static isPrime(num: number): boolean {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    }
}

console.log("\n--- Advanced Static Class Example ---");

// Use static constants
console.log("PI constant:", MathUtils.PI);
console.log("E constant:", MathUtils.E);

// Calculate circle properties
const radius = 5;
console.log(`Circle with radius ${radius}:`);
console.log("- Area:", MathUtils.circleArea(radius).toFixed(2));
console.log("- Circumference:", MathUtils.circleCircumference(radius).toFixed(2));

// Mathematical calculations
console.log("Factorial of 5:", MathUtils.factorial(5));
console.log("Fibonacci of 8:", MathUtils.fibonacci(8));
console.log("Is 17 prime?", MathUtils.isPrime(17));
console.log("Is 15 prime?", MathUtils.isPrime(15));

// Utility class for string operations
class StringUtils {
    static capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    
    static reverse(str: string): string {
        return str.split('').reverse().join('');
    }
    
    static isPalindrome(str: string): boolean {
        const cleaned = str.toLowerCase().replace(/[^a-z]/g, '');
        return cleaned === StringUtils.reverse(cleaned);
    }
    
    static wordCount(str: string): number {
        return str.trim().split(/\s+/).length;
    }
}

console.log("\n--- String Utility Static Methods ---");
const testString = "hello world";
console.log(`Original: "${testString}"`);
console.log("Capitalized:", StringUtils.capitalize(testString));
console.log("Reversed:", StringUtils.reverse(testString));
console.log("Word count:", StringUtils.wordCount(testString));
console.log("Is 'racecar' a palindrome?", StringUtils.isPalindrome("racecar"));
console.log("Is 'hello' a palindrome?", StringUtils.isPalindrome("hello"));