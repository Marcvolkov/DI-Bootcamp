// Exercise 1: Class With Access Modifiers
// Create a class Employee with different access modifiers

class Employee {
    // Private properties - only accessible within this class
    private name: string;
    private salary: number;
    
    // Public property - accessible from anywhere
    public position: string;
    
    // Protected property - accessible within this class and subclasses
    protected department: string;
    
    // Constructor to initialize all properties
    constructor(name: string, salary: number, position: string, department: string) {
        this.name = name;
        this.salary = salary;
        this.position = position;
        this.department = department;
    }
    
    // Public method that can access private properties
    public getEmployeeInfo(): string {
        return `Name: ${this.name}, Position: ${this.position}`;
    }
    
    // Public method to get salary (controlled access to private property)
    public getSalary(): number {
        return this.salary;
    }
    
    // Protected method - can be used by subclasses
    protected getDepartment(): string {
        return this.department;
    }
    
    // Private method - only accessible within this class
    private calculateYearlySalary(): number {
        return this.salary * 12;
    }
    
    // Public method that uses private method
    public getYearlySalary(): number {
        return this.calculateYearlySalary();
    }
}

// Create an instance of Employee
const employee = new Employee("Alice Johnson", 5000, "Software Engineer", "IT");

console.log("=== Exercise 1: Access Modifiers Demo ===");

// Access public property directly
console.log("Position (public):", employee.position);

// Access private properties through public methods
console.log("Employee Info:", employee.getEmployeeInfo());
console.log("Monthly Salary:", employee.getSalary());
console.log("Yearly Salary:", employee.getYearlySalary());

// Modify public property
employee.position = "Senior Software Engineer";
console.log("Updated Position:", employee.position);

// The following would cause compilation errors:
// console.log(employee.name);        // Error: 'name' is private
// console.log(employee.salary);      // Error: 'salary' is private
// console.log(employee.department);  // Error: 'department' is protected

// Subclass to demonstrate protected access
class Manager extends Employee {
    private teamSize: number;
    
    constructor(name: string, salary: number, position: string, department: string, teamSize: number) {
        super(name, salary, position, department);
        this.teamSize = teamSize;
    }
    
    // Can access protected property from parent class
    public getManagerInfo(): string {
        return `${this.getEmployeeInfo()}, Department: ${this.getDepartment()}, Team Size: ${this.teamSize}`;
    }
    
    // Can access protected method from parent class
    public getDepartmentInfo(): string {
        return `Managing ${this.teamSize} people in ${this.getDepartment()} department`;
    }
}

console.log("\n--- Subclass (Manager) Demo ---");
const manager = new Manager("Bob Smith", 8000, "Engineering Manager", "IT", 5);
console.log("Manager Info:", manager.getManagerInfo());
console.log("Department Info:", manager.getDepartmentInfo());