// Exercise 4: Control Flow With If...Else
// Write a function that determines if a number is positive, negative, or zero

function checkNumber(num: number): string {
    if (num > 0) {
        return "positive";
    } else if (num < 0) {
        return "negative";
    } else {
        return "zero";
    }
}

// Test the function with different values
console.log("5 is", checkNumber(5));      // Output: 5 is positive
console.log("-3 is", checkNumber(-3));    // Output: -3 is negative
console.log("0 is", checkNumber(0));      // Output: 0 is zero
console.log("10.5 is", checkNumber(10.5)); // Output: 10.5 is positive
console.log("-7.2 is", checkNumber(-7.2)); // Output: -7.2 is negative