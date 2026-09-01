const people = ["Greg", "Mary", "Devon", "James"];

people.shift();
people[people.indexOf("James")] = "Jason";
people.push("YourName");
console.log(people.indexOf("Mary"));

const peopleCopy = people.slice(1, 3); 

console.log(people.indexOf("Foo")); 

const last = people[people.length - 1];
console.log("Last element:", last);

for (let person of people) {
  console.log(person);
}

for (let person of people) {
  console.log(person);
  if (person === "Devon") {
    break;
  }
}


console.log("\n--- Exercise 2: Favorite Colors ---");
const colors = ["blue", "red", "green", "purple", "yellow"];
const suffixes = ["st", "nd", "rd", "th", "th"];

for (let i = 0; i < colors.length; i++) {
  
  console.log(`My #${i + 1} choice is ${colors[i]}`);
  
  console.log(`My ${i + 1}${suffixes[i]} choice is ${colors[i]}`);
}

console.log("\n--- Exercise 4: Building Management ---");
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

console.log(building.numberOfFloors);

console.log(building.numberOfAptByFloor.firstFloor + building.numberOfAptByFloor.thirdFloor);

const secondTenant = building.nameOfTenants[1];
const rooms = building.numberOfRoomsAndRent[secondTenant.toLowerCase()][0];
console.log(`${secondTenant} has ${rooms} rooms.`);

const sarahRent = building.numberOfRoomsAndRent.sarah[1];
const davidRent = building.numberOfRoomsAndRent.david[1];

if (sarahRent + davidRent > building.numberOfRoomsAndRent.dan[1]) {
    building.numberOfRoomsAndRent.dan[1] = 1200;
}
console.log("Dan's updated rent:", building.numberOfRoomsAndRent.dan[1]);



console.log("\n--- Exercise 5: Family ---");
const family = {
  father: "John",
  mother: "Jane",
  son: "Mark"
};

for (let key in family) {
  console.log(key);
}

for (let key in family) {
  console.log(family[key]);
}

const details = {
  my: "name",
  is: "Rudolf",
  the: "reindeer"
};

let sentence = "";
for (let key in details) {
  sentence += `${key} ${details[key]} `;
}
console.log(sentence.trim());


console.log("\n--- Exercise 7: Secret Group ---");
const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];

const secretSociety = names
  .map(name => name[0])
  .sort()
  .join("");

console.log(secretSociety);


const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askNumber() {
  rl.question("\n[Exercise 3] Please enter a number: ", (answer) => {
    const num = Number(answer);
    if (isNaN(num) || num < 10) {
      askNumber();
    } else {
      console.log(`Great! ${num} is 10 or greater.`);
      rl.close();
    }
  });
}

askNumber();
