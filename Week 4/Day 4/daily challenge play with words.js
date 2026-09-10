function makeAllCaps(words) {
	return new Promise((resolve, reject) => {
		if (!words.every(word => typeof word === "string")) {
			reject("Every item must be a string.");
			return;
		}

		resolve(words.map(word => word.toUpperCase()));
	});
}

function sortWords(words) {
	return new Promise((resolve, reject) => {
		if (words.length <= 4) {
			reject("The array must contain more than four words.");
			return;
		}

		resolve([...words].sort());
	});
}

makeAllCaps([1, "pear", "banana"])
	.then(arr => sortWords(arr))
	.then(result => console.log(result))
	.catch(error => console.log(error));

makeAllCaps(["apple", "pear", "banana"])
	.then(arr => sortWords(arr))
	.then(result => console.log(result))
	.catch(error => console.log(error));

makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
	.then(arr => sortWords(arr))
	.then(result => console.log(result))
	.catch(error => console.log(error));

const morse = `{
	"0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
	"5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
	"a": ".-", "b": "-...", "c": "-.-.", "d": "-..", "e": ".", "f": "..-.",
	"g": "--.", "h": "....", "i": "..", "j": ".---", "k": "-.-", "l": ".-..",
	"m": "--", "n": "-.", "o": "---", "p": ".--.", "q": "--.-", "r": ".-.",
	"s": "...", "t": "-", "u": "..-", "v": "...-", "w": ".--", "x": "-..-",
	"y": "-.--", "z": "--..", ".": ".-.-.-", ",": "--..--", "?": "..--..",
	"!": "-.-.--", "-": "-....-", "/": "-..-.", "@": ".--.-.", "(": "-.--.", ")": "-.--.-"
}`;

function toJs() {
	return new Promise((resolve, reject) => {
		try {
			const morseJS = JSON.parse(morse);

			if (Object.keys(morseJS).length === 0) {
				reject("The Morse object is empty.");
				return;
			}

			resolve(morseJS);
		} catch (error) {
			reject("The Morse JSON is invalid.");
		}
	});
}

function toMorse(morseJS) {
	return new Promise((resolve, reject) => {
		const word = window.prompt("Enter a word or sentence:");

		if (word === null || word.length === 0) {
			reject("Please enter a word or sentence.");
			return;
		}

		const translation = [];
		for (const character of word.toLowerCase()) {
			if (!Object.prototype.hasOwnProperty.call(morseJS, character)) {
				reject(`The character "${character}" does not exist in the Morse object.`);
				return;
			}

			translation.push(morseJS[character]);
		}

		resolve(translation);
	});
}

function joinWords(morseTranslation) {
	const output = morseTranslation.join("\n");
	const result = document.createElement("pre");
	result.textContent = output;
	document.body.appendChild(result);
	return output;
}

// The browser-only chain prompts for input and prints the translation on the page.
if (typeof window !== "undefined" && typeof document !== "undefined") {
	toJs()
		.then(morseJS => toMorse(morseJS))
		.then(morseTranslation => joinWords(morseTranslation))
		.catch(error => console.log(error));
}
