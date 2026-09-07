const menu = [
	{
		type: "starter",
		name: "Houmous with Pita"
	},
	{
		type: "starter",
		name: "Vegetable Soup with Houmous peas"
	},
	{
		type: "dessert",
		name: "Chocolate Cake"
	}
];

const hasDessert = menu.some((course) => course.type === "dessert");
console.log(hasDessert ? "The menu has a dessert." : "The menu has no dessert.");

const areAllStarters = menu.every((course) => course.type === "starter");
console.log(areAllStarters);

const hasMainCourse = menu.some((course) => course.type === "main course");
if (!hasMainCourse) {
	menu.push({
		type: "main course",
		name: "Grilled Vegetable Pasta"
	});
}

const vegetarian = ["vegetable", "houmous", "eggs", "vanilla", "potatoes"];
menu.forEach((course) => {
	course.vegetarian = vegetarian.some((ingredient) =>
		course.name.toLowerCase().includes(ingredient)
	);
});
console.log(menu);

function stringChop(string, chunkLength) {
	const chunks = [];

	for (let start = 0; start < string.length; start += chunkLength) {
		chunks.push(string.slice(start, start + chunkLength));
	}

	return chunks;
}

console.log(stringChop("developers", 2));

function searchWord(sentence, word) {
	const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const matches = sentence.match(new RegExp(`\\b${escapedWord}\\b`, "gi"));
	const occurrences = matches ? matches.length : 0;

	return `'${word}' was found ${occurrences} times.`;
}

console.log(searchWord("The quick brown fox", "fox"));

function reverseArray(array) {
	for (let left = 0, right = array.length - 1; left < right; left++, right--) {
		[array[left], array[right]] = [array[right], array[left]];
	}

	return array;
}

console.log(reverseArray([1, 2, 3, 4, 5]));
console.log(reverseArray([1, 2]));
console.log(reverseArray([]));
console.log(reverseArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
