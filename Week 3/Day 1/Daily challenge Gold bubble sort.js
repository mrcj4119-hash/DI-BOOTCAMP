const numbers = [5, 0, 9, 1, 7, 4, 2, 6, 3, 8];

console.log("toString():", numbers.toString());


console.log("join('+'):", numbers.join("+"));
console.log("join(' '):", numbers.join(" "));
console.log("join(''):", numbers.join(""));

let sortedNumbers = [...numbers];

for (let i = 0; i < sortedNumbers.length; i++) {
  for (let j = 0; j < sortedNumbers.length - 1 - i; j++) {

    if (sortedNumbers[j] < sortedNumbers[j + 1]) {
      const temp = sortedNumbers[j];
      sortedNumbers[j] = sortedNumbers[j + 1];
      sortedNumbers[j + 1] = temp;
    }

    console.log(`Pass ${i + 1}, comparison ${j + 1}:`, [...sortedNumbers]);
  }
}

console.log("Final descending order:", sortedNumbers);
