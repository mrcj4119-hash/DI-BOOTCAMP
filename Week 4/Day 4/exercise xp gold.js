const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise(resolve => {
	setTimeout(resolve, 3000, "foo");
});

// Promise.all waits for every item to resolve and returns their values in the
// same order as the input array. It also treats non-promises like 42 as values.
// Therefore, the output is [3, 42, "foo"]. If any item rejects, the whole
// Promise.all call rejects and the catch handler receives that error.
Promise.all([promise1, promise2, promise3])
	.then(values => console.log(values))
	.catch(error => console.log(error));

function timesTwoAsync(x) {
	return new Promise(resolve => resolve(x * 2));
}

const arr = [1, 2, 3];
const promiseArr = arr.map(timesTwoAsync);

Promise.all(promiseArr)
	.then(result => {
		console.log(result);
	});
