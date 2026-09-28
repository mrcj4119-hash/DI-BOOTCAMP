const lodash = require('lodash');
const math = require('./math');

// Custom math module
const sum = math.add(10, 20);
const product = math.multiply(5, 6);

console.log('Addition (10 + 20):', sum);
console.log('Multiplication (5 * 6):', product);

// Lodash utilities
const numbers = [10, 20, 30, 40, 50];
console.log('Array Sum using Lodash:', lodash.sum(numbers));
console.log('Array Mean using Lodash:', lodash.mean(numbers));