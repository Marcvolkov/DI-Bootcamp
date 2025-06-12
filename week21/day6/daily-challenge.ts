// Week 21 Day 6 Daily Challenge: Advanced Type Guards with Union Types
// Handling nested structures and complex types with conditional logic

console.log("=== Week 21 Day 6 Daily Challenge: Advanced Type Guards ===\n");

// Define the required types with discriminated union pattern
type User = {
    type: 'user';
    name: string;
    age: number;
};

type Product = {
    type: 'product';
    id: number;
    price: number;
};

type Order = {
    type: 'order';
    orderId: string;
    amount: number;
};

// Union type for all possible data types
type DataItem = User | Product | Order;

// Type guard functions for each type
function isUser(item: DataItem): item is User {
    return item.type === 'user';
}

function isProduct(item: DataItem): item is Product {
    return item.type === 'product';
}

function isOrder(item: DataItem): item is Order {
    return item.type === 'order';
}

// Main function to handle data with type guards
function handleData(data: DataItem[]): string[] {
    const results: string[] = [];
    
    for (const item of data) {
        try {
            if (isUser(item)) {
                // Handle User objects - greeting message with name and age
                const greeting = `Hello ${item.name}! You are ${item.age} years old.`;
                results.push(greeting);
                console.log(`🧑 User: ${greeting}`);
            } else if (isProduct(item)) {
                // Handle Product objects - message with ID and price
                const productInfo = `Product #${item.id} is priced at $${item.price.toFixed(2)}`;
                results.push(productInfo);
                console.log(`📦 Product: ${productInfo}`);
            } else if (isOrder(item)) {
                // Handle Order objects - summary with ID and amount
                const orderSummary = `Order ${item.orderId} has a total amount of $${item.amount.toFixed(2)}`;
                results.push(orderSummary);
                console.log(`📋 Order: ${orderSummary}`);
            } else {
                // Handle unexpected cases gracefully
                const errorMsg = `Unknown data type encountered: ${JSON.stringify(item)}`;
                results.push(errorMsg);
                console.log(`❌ Error: ${errorMsg}`);
            }
        } catch (error) {
            // Graceful error handling
            const errorMsg = `Error processing item: ${error instanceof Error ? error.message : 'Unknown error'}`;
            results.push(errorMsg);
            console.log(`⚠️ ${errorMsg}`);
        }
    }
    
    return results;
}

// Advanced type guards for more complex validation
function isValidUser(item: any): item is User {
    return (
        typeof item === 'object' &&
        item !== null &&
        item.type === 'user' &&
        typeof item.name === 'string' &&
        item.name.trim().length > 0 &&
        typeof item.age === 'number' &&
        item.age >= 0 &&
        item.age <= 150
    );
}

function isValidProduct(item: any): item is Product {
    return (
        typeof item === 'object' &&
        item !== null &&
        item.type === 'product' &&
        typeof item.id === 'number' &&
        item.id > 0 &&
        typeof item.price === 'number' &&
        item.price >= 0
    );
}

function isValidOrder(item: any): item is Order {
    return (
        typeof item === 'object' &&
        item !== null &&
        item.type === 'order' &&
        typeof item.orderId === 'string' &&
        item.orderId.trim().length > 0 &&
        typeof item.amount === 'number' &&
        item.amount >= 0
    );
}

// Enhanced function with validation
function handleDataWithValidation(data: any[]): string[] {
    const results: string[] = [];
    
    for (const item of data) {
        try {
            if (isValidUser(item)) {
                const greeting = `Hello ${item.name}! You are ${item.age} years old.`;
                results.push(greeting);
                console.log(`✅ Valid User: ${greeting}`);
            } else if (isValidProduct(item)) {
                const productInfo = `Product #${item.id} is priced at $${item.price.toFixed(2)}`;
                results.push(productInfo);
                console.log(`✅ Valid Product: ${productInfo}`);
            } else if (isValidOrder(item)) {
                const orderSummary = `Order ${item.orderId} has a total amount of $${item.amount.toFixed(2)}`;
                results.push(orderSummary);
                console.log(`✅ Valid Order: ${orderSummary}`);
            } else {
                const errorMsg = `Invalid or unknown data structure: ${JSON.stringify(item)}`;
                results.push(errorMsg);
                console.log(`❌ Validation Failed: ${errorMsg}`);
            }
        } catch (error) {
            const errorMsg = `Error processing item: ${error instanceof Error ? error.message : 'Unknown error'}`;
            results.push(errorMsg);
            console.log(`⚠️ ${errorMsg}`);
        }
    }
    
    return results;
}

// Create test data
console.log("=== Testing Basic Type Guards ===");

const testData: DataItem[] = [
    {
        type: 'user',
        name: 'Alice Johnson',
        age: 28
    },
    {
        type: 'product',
        id: 101,
        price: 29.99
    },
    {
        type: 'order',
        orderId: 'ORD-2024-001',
        amount: 149.50
    },
    {
        type: 'user',
        name: 'Bob Smith',
        age: 35
    },
    {
        type: 'product',
        id: 202,
        price: 15.75
    },
    {
        type: 'order',
        orderId: 'ORD-2024-002',
        amount: 75.25
    }
];

// Test the basic handleData function
const basicResults = handleData(testData);

console.log("\n=== Results Summary ===");
console.log(`Processed ${testData.length} items successfully`);
console.log(`Generated ${basicResults.length} result messages`);

// Test with more complex nested data
console.log("\n=== Testing Advanced Type Guards with Nested Structures ===");

// Extended types for more complex scenarios
type UserWithProfile = User & {
    profile: {
        email: string;
        preferences: {
            theme: 'light' | 'dark';
            notifications: boolean;
        };
    };
};

type ProductWithDetails = Product & {
    details: {
        category: string;
        inStock: boolean;
        specifications: {
            weight: number;
            dimensions: string;
        };
    };
};

type OrderWithItems = Order & {
    items: Array<{
        productId: number;
        quantity: number;
        unitPrice: number;
    }>;
    shipping: {
        address: string;
        method: 'standard' | 'express';
    };
};

type ComplexDataItem = UserWithProfile | ProductWithDetails | OrderWithItems;

// Type guards for complex nested structures
function isUserWithProfile(item: any): item is UserWithProfile {
    return (
        typeof item === 'object' &&
        item !== null &&
        item.type === 'user' &&
        typeof item.name === 'string' &&
        typeof item.age === 'number' &&
        typeof item.profile === 'object' &&
        item.profile !== null &&
        typeof item.profile.email === 'string' &&
        typeof item.profile.preferences === 'object' &&
        typeof item.profile.preferences.theme === 'string' &&
        typeof item.profile.preferences.notifications === 'boolean'
    );
}

function isProductWithDetails(item: any): item is ProductWithDetails {
    return (
        typeof item === 'object' &&
        item !== null &&
        item.type === 'product' &&
        typeof item.id === 'number' &&
        typeof item.price === 'number' &&
        typeof item.details === 'object' &&
        item.details !== null &&
        typeof item.details.category === 'string' &&
        typeof item.details.inStock === 'boolean' &&
        typeof item.details.specifications === 'object'
    );
}

function isOrderWithItems(item: any): item is OrderWithItems {
    return (
        typeof item === 'object' &&
        item !== null &&
        item.type === 'order' &&
        typeof item.orderId === 'string' &&
        typeof item.amount === 'number' &&
        Array.isArray(item.items) &&
        typeof item.shipping === 'object' &&
        item.shipping !== null &&
        typeof item.shipping.address === 'string'
    );
}

// Enhanced handler for complex nested data
function handleComplexData(data: ComplexDataItem[]): string[] {
    const results: string[] = [];
    
    for (const item of data) {
        try {
            if (isUserWithProfile(item)) {
                const user = item as UserWithProfile;
                const userInfo = `User ${user.name} (${user.age}) - Email: ${user.profile.email}, Theme: ${user.profile.preferences.theme}`;
                results.push(userInfo);
                console.log(`👤 Complex User: ${userInfo}`);
            } else if (isProductWithDetails(item)) {
                const product = item as ProductWithDetails;
                const productInfo = `Product #${product.id} - ${product.details.category} - $${product.price} (${product.details.inStock ? 'In Stock' : 'Out of Stock'})`;
                results.push(productInfo);
                console.log(`📦 Complex Product: ${productInfo}`);
            } else if (isOrderWithItems(item)) {
                const order = item as OrderWithItems;
                const itemCount = order.items.length;
                const totalValue = order.items.reduce((sum, orderItem) => sum + (orderItem.quantity * orderItem.unitPrice), 0);
                const orderInfo = `Order ${order.orderId} - ${itemCount} items, Total: $${totalValue.toFixed(2)}, Shipping: ${order.shipping.method}`;
                results.push(orderInfo);
                console.log(`📋 Complex Order: ${orderInfo}`);
            } else {
                const errorMsg = `Unrecognized complex data structure`;
                results.push(errorMsg);
                console.log(`❌ ${errorMsg}`);
            }
        } catch (error) {
            const errorMsg = `Error processing complex item: ${error instanceof Error ? error.message : 'Unknown error'}`;
            results.push(errorMsg);
            console.log(`⚠️ ${errorMsg}`);
        }
    }
    
    return results;
}

// Create complex test data
const complexTestData: ComplexDataItem[] = [
    {
        type: 'user',
        name: 'Charlie Brown',
        age: 32,
        profile: {
            email: 'charlie.brown@example.com',
            preferences: {
                theme: 'dark',
                notifications: true
            }
        }
    } as UserWithProfile,
    {
        type: 'product',
        id: 301,
        price: 199.99,
        details: {
            category: 'Electronics',
            inStock: true,
            specifications: {
                weight: 1.2,
                dimensions: '10x8x2 inches'
            }
        }
    } as ProductWithDetails,
    {
        type: 'order',
        orderId: 'ORD-2024-003',
        amount: 299.98,
        items: [
            { productId: 301, quantity: 1, unitPrice: 199.99 },
            { productId: 202, quantity: 2, unitPrice: 49.99 }
        ],
        shipping: {
            address: '123 Main St, City, State 12345',
            method: 'express'
        }
    } as OrderWithItems
];

// Test complex data handling
const complexResults = handleComplexData(complexTestData);

console.log("\n=== Testing Error Handling ===");

// Test with invalid/malformed data
const invalidData = [
    { type: 'user', name: '', age: -5 }, // Invalid user
    { type: 'product', id: -1, price: 'invalid' }, // Invalid product
    { type: 'order', orderId: '', amount: 'not-a-number' }, // Invalid order
    { type: 'unknown', data: 'something' }, // Unknown type
    null, // Null value
    undefined, // Undefined value
    'not an object' // String instead of object
];

console.log("\nTesting validation with invalid data:");
const validationResults = handleDataWithValidation(invalidData);

// Summary statistics
console.log("\n=== Final Summary ===");
console.log(`Basic data processing: ${basicResults.length} results`);
console.log(`Complex data processing: ${complexResults.length} results`);
console.log(`Validation testing: ${validationResults.length} results`);

// Demonstrate conditional logic based on type guards
function processDataWithConditions(data: DataItem[]): {
    users: User[];
    products: Product[];
    orders: Order[];
    totalUserAge: number;
    totalProductValue: number;
    totalOrderAmount: number;
} {
    const users: User[] = [];
    const products: Product[] = [];
    const orders: Order[] = [];
    
    let totalUserAge = 0;
    let totalProductValue = 0;
    let totalOrderAmount = 0;
    
    for (const item of data) {
        if (isUser(item)) {
            users.push(item);
            totalUserAge += item.age;
        } else if (isProduct(item)) {
            products.push(item);
            totalProductValue += item.price;
        } else if (isOrder(item)) {
            orders.push(item);
            totalOrderAmount += item.amount;
        }
    }
    
    return {
        users,
        products,
        orders,
        totalUserAge,
        totalProductValue,
        totalOrderAmount
    };
}

console.log("\n=== Conditional Logic Analysis ===");
const analysis = processDataWithConditions(testData);
console.log(`Found ${analysis.users.length} users with average age: ${(analysis.totalUserAge / analysis.users.length).toFixed(1)}`);
console.log(`Found ${analysis.products.length} products with total value: $${analysis.totalProductValue.toFixed(2)}`);
console.log(`Found ${analysis.orders.length} orders with total amount: $${analysis.totalOrderAmount.toFixed(2)}`);

console.log("\n=== Daily Challenge Complete! ===");