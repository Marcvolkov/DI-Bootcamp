// products.js
// -------------
// This module exports an array of product objects using CommonJS syntax.

const products = [
    { name: 'Laptop',  price: 999.99, category: 'Electronics' },
    { name: 'Coffee',  price:   4.99, category: 'Beverages'   },
    { name: 'Notebook',price:   2.49, category: 'Stationery'  },
    { name: 'Headphones', price: 199.99, category: 'Electronics' }
  ];
  
  module.exports = products;
  
  
  // shop.js
  // -------
  // This script imports the products array and provides a function to search by name.
  
  const productsList = require('./products');
  
  /**
   * Searches for a product by name (case-insensitive) and logs its details.
   * @param {string} productName
   */
  function findProduct(productName) {
    const nameLower = productName.toLowerCase();
    const product = productsList.find(
      p => p.name.toLowerCase() === nameLower
    );
  
    if (product) {
      console.log(`Product found:`);
      console.log(`  Name:     ${product.name}`);
      console.log(`  Price:    $${product.price}`);
      console.log(`  Category: ${product.category}`);
    } else {
      console.log(`No product named "${productName}" found.`);
    }
  }
  
  // Test the function with different product names
  findProduct('Laptop');      // should print Laptop details
  findProduct('coffee');      // should print Coffee details
  findProduct('Smartphone');  // should print "not found" message
  