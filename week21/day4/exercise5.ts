// Exercise 5: Extending Interfaces With Optional And Readonly Properties
// Create interfaces with optional and readonly properties

// Base interface User with readonly id
interface User {
    readonly id: number;
    name: string;
    email: string;
}

// Extended interface PremiumUser with optional property
interface PremiumUser extends User {
    membershipLevel?: string; // Optional property
    joinDate?: Date;          // Additional optional property
    benefits?: string[];      // Optional array of benefits
}

// Function that accepts a PremiumUser and logs details
function printUserDetails(user: PremiumUser): void {
    console.log("=== User Details ===");
    console.log(`ID: ${user.id}`);
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
    
    // Handle optional properties with proper checks
    if (user.membershipLevel) {
        console.log(`Membership Level: ${user.membershipLevel}`);
    } else {
        console.log("Membership Level: Not specified");
    }
    
    if (user.joinDate) {
        console.log(`Join Date: ${user.joinDate.toDateString()}`);
    }
    
    if (user.benefits && user.benefits.length > 0) {
        console.log(`Benefits: ${user.benefits.join(", ")}`);
    }
    
    console.log("===================\n");
}

console.log("=== Exercise 5: Extending Interfaces Demo ===");

// Create a basic user (satisfies User interface)
const basicUser: User = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com"
};

// Create a premium user with optional properties
const premiumUser: PremiumUser = {
    id: 2,
    name: "Alice Smith",
    email: "alice.smith@example.com",
    membershipLevel: "Gold",
    joinDate: new Date("2023-01-15"),
    benefits: ["Priority Support", "Free Shipping", "Exclusive Content"]
};

// Create a premium user without optional properties
const premiumUserBasic: PremiumUser = {
    id: 3,
    name: "Bob Wilson",
    email: "bob.wilson@example.com"
    // membershipLevel is optional, so we can omit it
};

// Print details for all users
printUserDetails(basicUser);        // Basic user treated as PremiumUser
printUserDetails(premiumUser);      // Full premium user
printUserDetails(premiumUserBasic); // Premium user without optional props

// Demonstrate readonly property behavior
console.log("--- Readonly Property Demo ---");
console.log("Original user ID:", basicUser.id);

// The following would cause a compilation error:
// basicUser.id = 999; // Error: Cannot assign to 'id' because it is a read-only property

// But we can modify other properties
basicUser.name = "John Updated";
basicUser.email = "john.updated@example.com";
console.log("Updated user name:", basicUser.name);

// More complex interface examples
interface Admin extends PremiumUser {
    readonly adminLevel: number;
    permissions: string[];
    lastLogin?: Date;
}

interface SuperUser extends Admin {
    canDeleteUsers?: boolean;
    systemAccess?: boolean;
}

// Interface with function types
interface UserActions {
    readonly userId: number;
    login: (password: string) => boolean;
    logout: () => void;
    updateProfile?: (profile: Partial<User>) => void;
    deleteAccount?: () => Promise<boolean>;
}

// Implementation of UserActions interface
class UserManager implements UserActions {
    readonly userId: number;
    private isLoggedIn: boolean = false;
    
    constructor(userId: number) {
        this.userId = userId;
    }
    
    login(password: string): boolean {
        // Simple password check (in real app, this would be more secure)
        if (password.length >= 6) {
            this.isLoggedIn = true;
            console.log(`User ${this.userId} logged in successfully`);
            return true;
        }
        console.log("Login failed: Invalid password");
        return false;
    }
    
    logout(): void {
        this.isLoggedIn = false;
        console.log(`User ${this.userId} logged out`);
    }
    
    updateProfile(profile: Partial<User>): void {
        if (!this.isLoggedIn) {
            console.log("Must be logged in to update profile");
            return;
        }
        console.log(`Updating profile for user ${this.userId}:`, profile);
    }
    
    async deleteAccount(): Promise<boolean> {
        if (!this.isLoggedIn) {
            console.log("Must be logged in to delete account");
            return false;
        }
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`Account ${this.userId} deleted successfully`);
        return true;
    }
}

console.log("--- Advanced Interface Examples ---");

// Create admin user
const adminUser: Admin = {
    id: 4,
    name: "Admin User",
    email: "admin@example.com",
    membershipLevel: "Platinum",
    adminLevel: 5,
    permissions: ["read", "write", "delete", "admin"],
    lastLogin: new Date()
};

console.log("Admin User:");
console.log(`Name: ${adminUser.name}`);
console.log(`Admin Level: ${adminUser.adminLevel}`);
console.log(`Permissions: ${adminUser.permissions.join(", ")}`);

// Create super user
const superUser: SuperUser = {
    id: 5,
    name: "Super Admin",
    email: "super@example.com",
    membershipLevel: "Ultimate",
    adminLevel: 10,
    permissions: ["*"], // All permissions
    canDeleteUsers: true,
    systemAccess: true
};

console.log("\nSuper User:");
console.log(`Name: ${superUser.name}`);
console.log(`Can Delete Users: ${superUser.canDeleteUsers}`);
console.log(`System Access: ${superUser.systemAccess}`);

// Test UserActions implementation
console.log("\n--- UserActions Implementation Demo ---");
const userManager = new UserManager(123);

userManager.login("password123");
userManager.updateProfile({ name: "Updated Name" });
userManager.logout();

// Function that works with any User type
function processUser(user: User): string {
    return `Processing user: ${user.name} (${user.email})`;
}

console.log("\n--- Polymorphic User Processing ---");
console.log(processUser(basicUser));
console.log(processUser(premiumUser));
console.log(processUser(adminUser));
console.log(processUser(superUser));