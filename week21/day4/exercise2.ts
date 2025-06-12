// Exercise 2: Readonly Properties In A Class
// Create a class Product with readonly properties

class Product {
    // Readonly property - cannot be modified after initialization
    readonly id: number;
    
    // Public properties that can be modified
    public name: string;
    public price: number;
    
    // Constructor to initialize properties
    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    
    // Method to get product information
    getProductInfo(): string {
        return `Product: ${this.name}, Price: $${this.price.toFixed(2)}`;
    }
    
    // Method to update price (allowed since it's not readonly)
    updatePrice(newPrice: number): void {
        this.price = newPrice;
        console.log(`Price updated to $${newPrice.toFixed(2)}`);
    }
    
    // Method to get full product details including readonly id
    getFullDetails(): string {
        return `ID: ${this.id}, ${this.getProductInfo()}`;
    }
}

console.log("=== Exercise 2: Readonly Properties Demo ===");

// Create a new product instance
const product = new Product(1, "Laptop", 999.99);

// Display initial product information
console.log("Initial Product Info:", product.getProductInfo());
console.log("Full Details:", product.getFullDetails());

// Modify public properties (allowed)
product.name = "Gaming Laptop";
product.updatePrice(1299.99);

console.log("\nAfter Updates:");
console.log("Updated Product Info:", product.getProductInfo());
console.log("Full Details:", product.getFullDetails());

// Attempt to modify readonly property (this would cause a compilation error)
// product.id = 2; // Error: Cannot assign to 'id' because it is a read-only property

console.log("\nDemonstrating readonly behavior:");
console.log("Product ID remains unchanged:", product.id);

// Additional examples with readonly
class ImmutableBook {
    readonly isbn: string;
    readonly publicationDate: Date;
    public title: string;
    public author: string;
    
    constructor(isbn: string, title: string, author: string, publicationDate: Date) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.publicationDate = publicationDate;
    }
    
    getBookInfo(): string {
        return `"${this.title}" by ${this.author} (ISBN: ${this.isbn})`;
    }
    
    // Method to create a new edition (since we can't modify readonly properties)
    createNewEdition(newIsbn: string): ImmutableBook {
        return new ImmutableBook(newIsbn, this.title, this.author, new Date());
    }
}

console.log("\n--- Additional Readonly Example ---");
const book = new ImmutableBook("978-0123456789", "TypeScript Guide", "John Doe", new Date("2023-01-01"));
console.log("Original Book:", book.getBookInfo());

// Create new edition instead of modifying readonly properties
const newEdition = book.createNewEdition("978-0987654321");
console.log("New Edition:", newEdition.getBookInfo());

// Demonstrate that original book's readonly properties remain unchanged
console.log("Original ISBN:", book.isbn);
console.log("New Edition ISBN:", newEdition.isbn);