
// Each call remembers the sentence built so far and returns another function.
// Calling that function with no argument ends the chain and returns the sentence.
const mergeWords = string => nextString => {
	if (nextString === undefined) {
		return string;
	}

	return mergeWords(`${string} ${nextString}`);
};

console.log(mergeWords("Hello")());
console.log(mergeWords("There")("is")("no")("spoon.")());
