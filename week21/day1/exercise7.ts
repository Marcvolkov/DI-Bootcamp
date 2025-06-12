// Exercise 7: Type Assertions
// Use type assertions to cast an HTML element to a specific type

// Note: This code is meant to run in a browser environment with HTML elements
// For demonstration purposes, we'll show how type assertions work

// Example 1: Type assertion with HTMLInputElement
function setInputValue(): void {
    // Get an element from the DOM
    const element = document.getElementById("myInput");
    
    // Use type assertion to cast the element to HTMLInputElement
    const inputElement = element as HTMLInputElement;
    
    // Now we can safely access input-specific properties
    if (inputElement) {
        inputElement.value = "Hello, TypeScript!";
        inputElement.placeholder = "Enter your text here";
    }
}

// Example 2: Type assertion with HTMLButtonElement
function setupButton(): void {
    const buttonElement = document.getElementById("myButton") as HTMLButtonElement;
    
    if (buttonElement) {
        buttonElement.textContent = "Click me!";
        buttonElement.disabled = false;
        buttonElement.onclick = () => {
            console.log("Button clicked!");
        };
    }
}

// Example 3: Type assertion with HTMLDivElement
function updateDiv(): void {
    const divElement = document.getElementById("myDiv") as HTMLDivElement;
    
    if (divElement) {
        divElement.innerHTML = "<p>This content was set using TypeScript!</p>";
        divElement.style.backgroundColor = "lightblue";
        divElement.style.padding = "10px";
    }
}

// Example 4: Using angle-bracket syntax (alternative to 'as')
function alternativeSyntax(): void {
    const element = document.getElementById("mySpan");
    const spanElement = <HTMLSpanElement>element;
    
    if (spanElement) {
        spanElement.textContent = "Updated with angle-bracket syntax";
    }
}

// Example 5: Safe type assertion with type checking
function safeTypeAssertion(): void {
    const element = document.getElementById("myInput");
    
    // Check if element exists and is an input element
    if (element && element instanceof HTMLInputElement) {
        // Now TypeScript knows it's an HTMLInputElement
        element.value = "Safe type assertion";
    }
}

// To test these functions, you would need an HTML file with appropriate elements:
/*
<!DOCTYPE html>
<html>
<head>
    <title>Type Assertions Example</title>
</head>
<body>
    <input id="myInput" type="text">
    <button id="myButton">Original Button</button>
    <div id="myDiv">Original div content</div>
    <span id="mySpan">Original span</span>
    
    <script src="exercise7.js"></script>
    <script>
        setInputValue();
        setupButton();
        updateDiv();
        alternativeSyntax();
        safeTypeAssertion();
    </script>
</body>
</html>
*/

console.log("Type assertion functions defined. Run in browser with appropriate HTML elements.");