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

const addTo = x => y => x + y;
const addToTen = addTo(10);

console.log(addToTen(3));

const curriedSum = a => b => a + b;

console.log(curriedSum(30)(1));

const add5 = curriedSum(5);

console.log(add5(12));

const compose = (f, g) => a => f(g(a));
const add1 = num => num + 1;
const addFive = num => num + 5;

console.log(compose(add1, addFive)(10));