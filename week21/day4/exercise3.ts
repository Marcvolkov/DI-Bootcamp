// Exercise 3: Class Inheritance
// Create a base class Animal and extend it with a Dog subclass

// Base class Animal
class Animal {
    public name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    // Base method that can be overridden
    makeSound(): string {
        return `${this.name} makes a sound`;
    }
    
    // Method that can be inherited
    sleep(): string {
        return `${this.name} is sleeping`;
    }
    
    // Method to get animal info
    getInfo(): string {
        return `Animal name: ${this.name}`;
    }
}

// Subclass Dog that extends Animal
class Dog extends Animal {
    public breed: string;
    
    constructor(name: string, breed: string) {
        super(name); // Call parent constructor
        this.breed = breed;
    }
    
    // Override the makeSound method
    makeSound(): string {
        return `${this.name} barks: Woof! Woof!`;
    }
    
    // Additional method specific to Dog
    fetch(): string {
        return `${this.name} is fetching the ball`;
    }
    
    // Override getInfo to include breed
    getInfo(): string {
        return `Dog name: ${this.name}, Breed: ${this.breed}`;
    }
}

console.log("=== Exercise 3: Class Inheritance Demo ===");

// Create an instance of the base Animal class
const animal = new Animal("Generic Animal");
console.log("Base Animal:");
console.log("- Info:", animal.getInfo());
console.log("- Sound:", animal.makeSound());
console.log("- Sleep:", animal.sleep());

console.log("\n--- Dog Subclass ---");

// Create an instance of the Dog subclass
const dog = new Dog("Buddy", "Golden Retriever");
console.log("Dog Instance:");
console.log("- Info:", dog.getInfo());
console.log("- Sound:", dog.makeSound()); // Overridden method
console.log("- Sleep:", dog.sleep());     // Inherited method
console.log("- Fetch:", dog.fetch());     // Dog-specific method

// Additional inheritance examples
class Cat extends Animal {
    public isIndoor: boolean;
    
    constructor(name: string, isIndoor: boolean = true) {
        super(name);
        this.isIndoor = isIndoor;
    }
    
    // Override makeSound
    makeSound(): string {
        return `${this.name} meows: Meow! Meow!`;
    }
    
    // Cat-specific method
    climb(): string {
        return `${this.name} is climbing the cat tree`;
    }
    
    getInfo(): string {
        return `Cat name: ${this.name}, Indoor: ${this.isIndoor}`;
    }
}

class Bird extends Animal {
    public canFly: boolean;
    
    constructor(name: string, canFly: boolean = true) {
        super(name);
        this.canFly = canFly;
    }
    
    makeSound(): string {
        return `${this.name} chirps: Tweet! Tweet!`;
    }
    
    fly(): string {
        if (this.canFly) {
            return `${this.name} is flying high in the sky`;
        } else {
            return `${this.name} cannot fly`;
        }
    }
    
    getInfo(): string {
        return `Bird name: ${this.name}, Can fly: ${this.canFly}`;
    }
}

console.log("\n--- More Inheritance Examples ---");

const cat = new Cat("Whiskers", true);
console.log("Cat Instance:");
console.log("- Info:", cat.getInfo());
console.log("- Sound:", cat.makeSound());
console.log("- Climb:", cat.climb());

const bird = new Bird("Tweety", true);
console.log("\nBird Instance:");
console.log("- Info:", bird.getInfo());
console.log("- Sound:", bird.makeSound());
console.log("- Fly:", bird.fly());

const penguin = new Bird("Pingu", false);
console.log("\nPenguin Instance:");
console.log("- Info:", penguin.getInfo());
console.log("- Sound:", penguin.makeSound());
console.log("- Fly:", penguin.fly());

// Demonstrate polymorphism
console.log("\n--- Polymorphism Demo ---");
const animals: Animal[] = [animal, dog, cat, bird, penguin];

animals.forEach((animal, index) => {
    console.log(`Animal ${index + 1}: ${animal.makeSound()}`);
});