const people = ["Greg", "Mary", "Devon", "James"];

// Part I - Review about arrays
people.shift(); // 1. Removes "Greg"
people[people.indexOf("James")] = "Jason"; // 2. Replaces "James" with "Jason"
people.push("YourName"); // 3. Adds your name to the end
console.log(people.indexOf("Mary")); // 4. Logs Mary's index (0)

// 5. Copy without "Mary" or your name (indices 1 to 3)
const peopleCopy = people.slice(1, 3); 

// 6. Index of "Foo"
console.log(people.indexOf("Foo")); 
// It returns -1 because "Foo" does not exist in the array.

// 7. Last element variable
const last = people[people.length - 1];

// Part II - Loops
// 1. Iterate through arrayr
for (let person of people) {
  console.log(person);
}

// 2. Iterate and exit after logging "Devon"
for (let person of people) {
  console.log(person);
  if (person === "Devon") {
    break;
  }
}


const colors = ["blue", "red", "green", "purple", "yellow"];
const suffixes = ["st", "nd", "rd", "th", "th"];

for (let i = 0; i < colors.length; i++) {
  // Standard solution
  console.log(`My #${i + 1} choice is ${colors[i]}`);
  
  // Bonus solution with suffixes
  console.log(`My ${i + 1}${suffixes[i]} choice is ${colors[i]}`);
}

let num;
do {
  num = Number(prompt("Please enter a number:"));
} while (isNaN(num) || num < 10);

const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
        firstFloor: 3,
        secondFloor: 4,
        thirdFloor: 9,
        fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent:  {
        sarah: [3, 990],
        dan:  [4, 1000],
        david: [1, 500],
    },
};

// 2. Number of floors
console.log(building.numberOfFloors);

// 3. Apartments on floors 1 and 3
console.log(building.numberOfAptByFloor.firstFloor + building.numberOfAptByFloor.thirdFloor);

// 4. Second tenant name and number of rooms
const secondTenant = building.nameOfTenants[1];
const rooms = building.numberOfRoomsAndRent[secondTenant.toLowerCase()][0];
console.log(`${secondTenant} has ${rooms} rooms.`);

// 5. Rent check & update
const sarahRent = building.numberOfRoomsAndRent.sarah[1];
const davidRent = building.numberOfRoomsAndRent.david[1];
let danRent = building.numberOfRoomsAndRent.dan[1];

if (sarahRent + davidRent > danRent) {
    building.numberOfRoomsAndRent.dan[1] = 1200;
}
const family = {
  father: "John",
  mother: "Jane",
  son: "Mark"
};

// Console log keys
for (let key in family) {
  console.log(key);
}

// Console log values
for (let key in family) {
  console.log(family[key]);
}


const details = {
  my: 'name',
  is: 'Rudolf',
  the: 'reindeer'
};

let sentence = "";
for (let key in details) {
  sentence += `${key} ${details[key]} `;
}
console.log(sentence.trim());

const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];

const secretSociety = names
  .map(name => name[0])
  .sort()
  .join("");

console.log(secretSociety); // "ABJKPS"

