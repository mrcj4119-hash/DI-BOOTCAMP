// Exercise 1
const doubledNumbers = [1, 2, 3].map((num) => {
	if (typeof num === "number") return num * 2;
	return;
});
console.log(doubledNumbers);

// Exercise 2
const reducedNumbers = [[0, 1], [2, 3]].reduce(
	(accumulator, current) => accumulator.concat(current),
	[1, 2]
);
console.log(reducedNumbers);

// Exercise 3
const arrayNum = [1, 2, 4, 5, 8, 9];
const newArray = arrayNum.map((num, i) => {
	console.log(`Number: ${num}, index: ${i}`);
	return num * 2;
});
console.log(newArray);

// Exercise 4
const array = [[1], [2], [3], [[[4]]], [[[5]]]];
const flattenedArray = array.flat(2);
console.log(flattenedArray);

const greeting = [
	["Hello", "young", "grasshopper!"],
	["you", "are"],
	["learning", "fast!"]
];
const joinedGreeting = greeting.map((words) => words.join(" "));
console.log(joinedGreeting);
console.log(joinedGreeting.join(" "));

const trapped = [[[[[[[[[[[[[[[[[[[[[[[[[[3]]]]]]]]]]]]]]]]]]]]]]]]]];
console.log(trapped.flat(Infinity));
