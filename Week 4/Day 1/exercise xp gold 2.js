const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((total, number) => total + number, 0);
console.log(sum);

const numbersWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = [...new Set(numbersWithDuplicates)];
console.log(uniqueNumbers);

const values = [NaN, 0, 15, false, -22, "", undefined, 47, null];
const truthyValues = values.filter(Boolean);
console.log(truthyValues);

function repeat(string, times = 1) {
	let repeatedString = "";

	for (let count = 0; count < times; count++) {
		repeatedString += string;
	}

	return repeatedString;
}

console.log(repeat("Ha!", 3));
console.log(repeat("Hello"));

const startLine = "     ||<- Start line";
let turtle = "🐢";
let rabbit = "🐇";

console.log(startLine);
console.log(`       ${turtle}`);
console.log(`       ${rabbit}`);

turtle = turtle.trim().padEnd(9, "=");
console.log(turtle);
