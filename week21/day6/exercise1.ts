// Exercise 1: Intersection Types
// Combine multiple types into one using intersection types

// Define the Person type
type Person = {
    name: string;
    age: number;
};

// Define the Address type
type Address = {
    street: string;
    city: string;
};

// Create intersection type that combines Person and Address
type PersonWithAddress = Person & Address;

console.log("=== Exercise 1: Intersection Types ===");

// Create a variable of PersonWithAddress type
const personWithAddress: PersonWithAddress = {
    // Properties from Person type
    name: "Alice Johnson",
    age: 30,
    
    // Properties from Address type
    street: "123 Main Street",
    city: "New York"
};

console.log("Person with Address:", personWithAddress);

// Function that accepts PersonWithAddress
function displayPersonInfo(person: PersonWithAddress): string {
    return `${person.name}, age ${person.age}, lives at ${person.street}, ${person.city}`;
}

console.log("Display Info:", displayPersonInfo(personWithAddress));

// More complex intersection types
type ContactInfo = {
    email: string;
    phone: string;
};

type WorkInfo = {
    company: string;
    position: string;
};

// Triple intersection type
type FullProfile = Person & Address & ContactInfo & WorkInfo;

const fullProfile: FullProfile = {
    // Person properties
    name: "Bob Smith",
    age: 35,
    
    // Address properties
    street: "456 Oak Avenue",
    city: "Los Angeles",
    
    // ContactInfo properties
    email: "bob.smith@example.com",
    phone: "+1-555-0123",
    
    // WorkInfo properties
    company: "Tech Corp",
    position: "Software Engineer"
};

console.log("Full Profile:", fullProfile);

// Function demonstrating intersection type usage
function createPersonCard(profile: FullProfile): string {
    return `
=== Person Card ===
Name: ${profile.name}
Age: ${profile.age}
Address: ${profile.street}, ${profile.city}
Email: ${profile.email}
Phone: ${profile.phone}
Work: ${profile.position} at ${profile.company}
==================`;
}

console.log(createPersonCard(fullProfile));

// Intersection with optional properties
type PersonalPreferences = {
    favoriteColor?: string;
    hobbies?: string[];
};

type ExtendedProfile = PersonWithAddress & PersonalPreferences;

const extendedProfile: ExtendedProfile = {
    name: "Charlie Brown",
    age: 25,
    street: "789 Pine Road",
    city: "Chicago",
    favoriteColor: "blue",
    hobbies: ["reading", "gaming", "cooking"]
};

console.log("Extended Profile:", extendedProfile);

// Intersection types with methods
type PersonMethods = {
    greet(): string;
    getAge(): number;
};

type PersonWithMethods = Person & PersonMethods;

const personWithMethods: PersonWithMethods = {
    name: "Diana Prince",
    age: 28,
    
    greet() {
        return `Hello, I'm ${this.name}`;
    },
    
    getAge() {
        return this.age;
    }
};

console.log("Person with methods:");
console.log("- Greeting:", personWithMethods.greet());
console.log("- Age:", personWithMethods.getAge());