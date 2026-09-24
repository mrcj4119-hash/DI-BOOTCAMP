// Import/require the products array from products.js
const products = require('./products');

// Function to find a product by name
function findProductByName(productName) {
  const foundProduct = products.find(
    (product) => product.name.toLowerCase() === productName.toLowerCase()
  );

  if (foundProduct) {
    console.log('Product Found:', foundProduct);
  } else {
    console.log(`Product "${productName}" not found.`);
  }
}

// Test the function with different product names
findProductByName('Laptop');
findProductByName('Phone');
findProductByName('Coffee Maker');
findProductByName('Tablet'); // Test with a product that doesn't exist