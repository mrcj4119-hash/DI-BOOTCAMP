// Exercise 1: Nested functions

// Prediction: landscape() returns "____/''''\\____".
// flat adds four underscores, mountain adds /, four apostrophes, and \\,
// then the second flat adds four more underscores. Both nested arrow
// functions can access and update result from landscape.
const landscape = () => {
	let result = "";

	const flat = x => {
		for (let count = 0; count < x; count++) {
			result += "_";
		}
	};

	const mountain = x => {
		result += "/";
		for (let counter = 0; counter < x; counter++) {
			result += "'";
		}
		result += "\\";
	};

	flat(4);
	mountain(4);
	flat(4);

	return result;
};

console.log(landscape());

// Exercise 2: Closure
const addTo = x => y => x + y;
const addToTen = addTo(10);

// Prediction: addToTen(3) returns 13 because the inner function remembers x = 10.
console.log(addToTen(3));

// Exercise 3: Currying
const curriedSum = a => b => a + b;

// Prediction: curriedSum(30)(1) returns 31. The calls provide a and then b.
console.log(curriedSum(30)(1));

// Exercise 4: Currying
const add5 = curriedSum(5);

// Prediction: add5(12) returns 17 because add5 has a fixed value of 5.
console.log(add5(12));

// Exercise 5: Composing
const compose = (f, g) => a => f(g(a));
const add1 = num => num + 1;
const addFive = num => num + 5;

// Prediction: compose(add1, add5)(10) returns 16: add5 runs first, then add1.
console.log(compose(add1, addFive)(10));
