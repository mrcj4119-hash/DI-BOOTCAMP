// Import the default export from data.js
import people from './data.js';

// Function to calculate and print the average age
function calculateAverageAge(personsArray) {
  if (personsArray.length === 0) {
    console.log('The array is empty.');
    return;
  }

  const totalAge = personsArray.reduce((sum, person) => sum + person.age, 0);
  const averageAge = totalAge / personsArray.length;

  console.log(`Average Age: ${averageAge}`);
}

// Call the function using the imported array
calculateAverageAge(people);