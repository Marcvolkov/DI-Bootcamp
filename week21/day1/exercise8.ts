// Exercise 8: Switch Statement With Complex Conditions
// Create a function that uses a switch statement to handle multiple user roles

function getAction(role: string): string {
    switch (role) {
        case "admin":
            return "Manage users and settings";
        
        case "editor":
            return "Edit content";
        
        case "viewer":
            return "View content";
        
        case "guest":
            return "Limited access";
        
        default:
            return "Invalid role";
    }
}

// Test the function with different roles
console.log(getAction("admin"));    // Output: Manage users and settings
console.log(getAction("editor"));   // Output: Edit content
console.log(getAction("viewer"));   // Output: View content
console.log(getAction("guest"));    // Output: Limited access
console.log(getAction("unknown"));  // Output: Invalid role

// Example with more complex conditions - handling multiple cases
function getPermissions(role: string): string {
    switch (role.toLowerCase()) {
        case "admin":
        case "administrator":
        case "root":
            return "Full access to all features and settings";
        
        case "editor":
        case "content-editor":
        case "writer":
            return "Can create, edit, and delete content";
        
        case "viewer":
        case "reader":
        case "user":
            return "Can view content only";
        
        case "guest":
        case "anonymous":
            return "Limited read-only access";
        
        case "moderator":
            return "Can moderate content and manage users";
        
        default:
            return "Access denied - invalid role";
    }
}

// Test the complex switch function
console.log("\n--- Complex Switch Examples ---");
console.log(getPermissions("ADMIN"));           // Full access (case insensitive)
console.log(getPermissions("content-editor"));  // Can create, edit, and delete content
console.log(getPermissions("reader"));          // Can view content only
console.log(getPermissions("moderator"));       // Can moderate content and manage users
console.log(getPermissions("invalid"));         // Access denied - invalid role