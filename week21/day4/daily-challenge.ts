// Daily Challenge: Building A Library System With TypeScript Classes And Interfaces
// Create a comprehensive library management system

// Interface Book with required and optional properties
interface Book {
    title: string;
    author: string;
    isbn: string;
    publishedYear: number;
    genre?: string; // Optional property
}

// Base Library class with private books array
class Library {
    // Private property - only accessible within this class
    private books: Book[] = [];
    
    // Public method to add a new book to the library
    public addBook(book: Book): void {
        // Check if book with same ISBN already exists
        const existingBook = this.books.find(b => b.isbn === book.isbn);
        if (existingBook) {
            console.log(`Book with ISBN ${book.isbn} already exists in the library.`);
            return;
        }
        
        this.books.push(book);
        console.log(`Added "${book.title}" by ${book.author} to the library.`);
    }
    
    // Public method to get book details by ISBN
    public getBookDetails(isbn: string): Book | undefined {
        const book = this.books.find(b => b.isbn === isbn);
        if (book) {
            return book;
        } else {
            console.log(`Book with ISBN ${isbn} not found in the library.`);
            return undefined;
        }
    }
    
    // Protected method - accessible by subclasses
    protected getAllBooks(): Book[] {
        return [...this.books]; // Return a copy to prevent external modification
    }
    
    // Public method to get total number of books
    public getTotalBooks(): number {
        return this.books.length;
    }
    
    // Public method to remove a book by ISBN
    public removeBook(isbn: string): boolean {
        const initialLength = this.books.length;
        this.books = this.books.filter(book => book.isbn !== isbn);
        
        if (this.books.length < initialLength) {
            console.log(`Book with ISBN ${isbn} removed from the library.`);
            return true;
        } else {
            console.log(`Book with ISBN ${isbn} not found for removal.`);
            return false;
        }
    }
}

// DigitalLibrary class extending Library
class DigitalLibrary extends Library {
    // Readonly property - cannot be modified after initialization
    readonly website: string;
    
    constructor(website: string) {
        super(); // Call parent constructor
        this.website = website;
    }
    
    // Public method to list all book titles
    public listBooks(): string[] {
        const books = this.getAllBooks(); // Use protected method from parent
        return books.map(book => book.title);
    }
    
    // Additional method to get books by genre
    public getBooksByGenre(genre: string): Book[] {
        const books = this.getAllBooks();
        return books.filter(book => book.genre?.toLowerCase() === genre.toLowerCase());
    }
    
    // Method to get library statistics
    public getLibraryStats(): { totalBooks: number; genres: string[]; website: string } {
        const books = this.getAllBooks();
        const genres = [...new Set(books.map(book => book.genre).filter(Boolean))];
        
        return {
            totalBooks: this.getTotalBooks(),
            genres: genres as string[],
            website: this.website
        };
    }
    
    // Method to search books by title or author
    public searchBooks(query: string): Book[] {
        const books = this.getAllBooks();
        const lowercaseQuery = query.toLowerCase();
        
        return books.filter(book => 
            book.title.toLowerCase().includes(lowercaseQuery) ||
            book.author.toLowerCase().includes(lowercaseQuery)
        );
    }
    
    // Method to get books published in a specific year range
    public getBooksByYearRange(startYear: number, endYear: number): Book[] {
        const books = this.getAllBooks();
        return books.filter(book => 
            book.publishedYear >= startYear && book.publishedYear <= endYear
        );
    }
}

// Helper function to display book details nicely
function displayBookDetails(book: Book): void {
    console.log("=== Book Details ===");
    console.log(`Title: ${book.title}`);
    console.log(`Author: ${book.author}`);
    console.log(`ISBN: ${book.isbn}`);
    console.log(`Published Year: ${book.publishedYear}`);
    console.log(`Genre: ${book.genre || 'Not specified'}`);
    console.log("==================\n");
}

// Helper function to display multiple books
function displayBooks(books: Book[], title: string): void {
    console.log(`\n=== ${title} ===`);
    if (books.length === 0) {
        console.log("No books found.");
    } else {
        books.forEach((book, index) => {
            console.log(`${index + 1}. "${book.title}" by ${book.author} (${book.publishedYear})`);
        });
    }
    console.log("=".repeat(title.length + 8) + "\n");
}

console.log("=== Daily Challenge: Library System Demo ===\n");

// Create an instance of DigitalLibrary
const digitalLibrary = new DigitalLibrary("https://mylibrary.com");

console.log(`Digital Library created with website: ${digitalLibrary.website}\n`);

// Create some book objects
const books: Book[] = [
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "978-0-7432-7356-5",
        publishedYear: 1925,
        genre: "Fiction"
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        isbn: "978-0-06-112008-4",
        publishedYear: 1960,
        genre: "Fiction"
    },
    {
        title: "1984",
        author: "George Orwell",
        isbn: "978-0-452-28423-4",
        publishedYear: 1949,
        genre: "Dystopian Fiction"
    },
    {
        title: "Clean Code",
        author: "Robert C. Martin",
        isbn: "978-0-13-235088-4",
        publishedYear: 2008,
        genre: "Programming"
    },
    {
        title: "The Art of War",
        author: "Sun Tzu",
        isbn: "978-1-59030-963-7",
        publishedYear: -500, // Ancient text
        // No genre specified (optional property)
    },
    {
        title: "JavaScript: The Good Parts",
        author: "Douglas Crockford",
        isbn: "978-0-596-51774-8",
        publishedYear: 2008,
        genre: "Programming"
    }
];

console.log("--- Adding Books to Library ---");
// Add books to the digital library
books.forEach(book => {
    digitalLibrary.addBook(book);
});

console.log("\n--- Library Statistics ---");
const stats = digitalLibrary.getLibraryStats();
console.log(`Total Books: ${stats.totalBooks}`);
console.log(`Available Genres: ${stats.genres.join(", ")}`);
console.log(`Website: ${stats.website}`);

console.log("\n--- List of All Book Titles ---");
const bookTitles = digitalLibrary.listBooks();
bookTitles.forEach((title, index) => {
    console.log(`${index + 1}. ${title}`);
});

console.log("\n--- Getting Book Details by ISBN ---");
// Get details of specific books
const gatsby = digitalLibrary.getBookDetails("978-0-7432-7356-5");
if (gatsby) {
    displayBookDetails(gatsby);
}

const cleanCode = digitalLibrary.getBookDetails("978-0-13-235088-4");
if (cleanCode) {
    displayBookDetails(cleanCode);
}

// Try to get a non-existent book
const nonExistent = digitalLibrary.getBookDetails("978-0-00-000000-0");

console.log("\n--- Books by Genre ---");
const fictionBooks = digitalLibrary.getBooksByGenre("Fiction");
displayBooks(fictionBooks, "Fiction Books");

const programmingBooks = digitalLibrary.getBooksByGenre("Programming");
displayBooks(programmingBooks, "Programming Books");

console.log("\n--- Search Functionality ---");
const searchResults = digitalLibrary.searchBooks("George");
displayBooks(searchResults, "Search Results for 'George'");

const jsSearchResults = digitalLibrary.searchBooks("JavaScript");
displayBooks(jsSearchResults, "Search Results for 'JavaScript'");

console.log("\n--- Books by Year Range ---");
const modernBooks = digitalLibrary.getBooksByYearRange(2000, 2023);
displayBooks(modernBooks, "Books Published 2000-2023");

const classicBooks = digitalLibrary.getBooksByYearRange(1900, 1970);
displayBooks(classicBooks, "Classic Books (1900-1970)");

console.log("\n--- Testing Error Handling ---");
// Try to add a duplicate book
digitalLibrary.addBook({
    title: "Another Great Gatsby",
    author: "Someone Else",
    isbn: "978-0-7432-7356-5", // Same ISBN as existing book
    publishedYear: 2023,
    genre: "Fiction"
});

console.log("\n--- Testing Book Removal ---");
console.log(`Books before removal: ${digitalLibrary.getTotalBooks()}`);
digitalLibrary.removeBook("978-0-452-28423-4"); // Remove 1984
console.log(`Books after removal: ${digitalLibrary.getTotalBooks()}`);

// Try to remove non-existent book
digitalLibrary.removeBook("978-0-00-000000-0");

console.log("\n--- Final Library State ---");
const finalTitles = digitalLibrary.listBooks();
console.log("Remaining books:");
finalTitles.forEach((title, index) => {
    console.log(`${index + 1}. ${title}`);
});

// Demonstrate readonly property behavior
console.log("\n--- Readonly Property Demo ---");
console.log(`Library website: ${digitalLibrary.website}`);
// The following would cause a compilation error:
// digitalLibrary.website = "https://newwebsite.com"; // Error: Cannot assign to 'website' because it is a read-only property

// Advanced: Interface for library management
interface LibraryManager {
    name: string;
    employeeId: string;
    canAddBooks: boolean;
    canRemoveBooks: boolean;
}

// Class implementing the LibraryManager interface
class LibraryStaff implements LibraryManager {
    name: string;
    employeeId: string;
    canAddBooks: boolean;
    canRemoveBooks: boolean;
    
    constructor(name: string, employeeId: string, canAddBooks: boolean = true, canRemoveBooks: boolean = false) {
        this.name = name;
        this.employeeId = employeeId;
        this.canAddBooks = canAddBooks;
        this.canRemoveBooks = canRemoveBooks;
    }
    
    performAction(action: 'add' | 'remove', library: DigitalLibrary, book?: Book, isbn?: string): void {
        if (action === 'add' && this.canAddBooks && book) {
            console.log(`${this.name} is adding a book to the library.`);
            library.addBook(book);
        } else if (action === 'remove' && this.canRemoveBooks && isbn) {
            console.log(`${this.name} is removing a book from the library.`);
            library.removeBook(isbn);
        } else {
            console.log(`${this.name} does not have permission to ${action} books.`);
        }
    }
}

console.log("\n--- Library Staff Management Demo ---");
const librarian = new LibraryStaff("Alice Johnson", "LIB001", true, true);
const assistant = new LibraryStaff("Bob Smith", "LIB002", true, false);

// Librarian adds a book
librarian.performAction('add', digitalLibrary, {
    title: "TypeScript Handbook",
    author: "Microsoft",
    isbn: "978-0-123-45678-9",
    publishedYear: 2023,
    genre: "Programming"
});

// Assistant tries to remove a book (should fail)
assistant.performAction('remove', digitalLibrary, undefined, "978-0-596-51774-8");

// Librarian removes a book (should succeed)
librarian.performAction('remove', digitalLibrary, undefined, "978-0-596-51774-8");

console.log("\n=== Library System Demo Complete ===");