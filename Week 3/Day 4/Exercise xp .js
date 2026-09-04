// #1
// funcOne() alerts "inside the funcOne function 3" because the local let
// starts at 5 and is reassigned to 3 inside the if block.
// If a were const, a = 3 would throw a TypeError because const cannot be reassigned.

// #2
// The first funcThree() alerts 0. funcTwo() changes the outer let a to 5,
// so the second funcThree() alerts 5. If a were const, funcTwo() would throw
// a TypeError when it tried to reassign a, and the value would remain 0.

// #3
// funcFour() creates window.a with the value "hello". funcFive() can then
// read that global property and alerts "inside the funcFive function hello".

// #4
// funcSix() alerts "inside the funcSix function test" because its local a
// shadows the outer a. Changing the local let to const gives the same result;
// the local variable is read but never reassigned.

// #5
// The if block alerts 5 because it has its own block-scoped a. The following
// alert is outside that block and alerts 2. Changing either let to const gives
// the same output because neither variable is reassigned.

const winBattle = () => true;
const experiencePoints = winBattle() ? 10 : 1;
console.log(experiencePoints);

const isString = value => typeof value === "string";
console.log(isString("hello"));
console.log(isString([1, 2, 4, 0]));

const sum = (firstNumber, secondNumber) => firstNumber + secondNumber;
console.log(sum(3, 7));

function kilogramsToGrams(weightInKilograms) {
	return weightInKilograms * 1000;
}
console.log(kilogramsToGrams(2));

const kilogramsToGramsExpression = function (weightInKilograms) {
	return weightInKilograms * 1000;
};
console.log(kilogramsToGramsExpression(2));

// A function declaration is hoisted; a function expression is assigned to a variable at runtime.
const kilogramsToGramsArrow = weightInKilograms => weightInKilograms * 1000;
console.log(kilogramsToGramsArrow(2));

const addDomMessage = message => {
	if (typeof document === "undefined") {
		return;
	}

	const messageElement = document.createElement("p");
	messageElement.textContent = message;
	document.body.appendChild(messageElement);
};

(function (numberOfChildren, partnerName, geographicLocation, jobTitle) {
	addDomMessage(
		`You will be a ${jobTitle} in ${geographicLocation}, and married to ${partnerName} with ${numberOfChildren} kids.`
	);
})(3, "Alex", "Paris", "web developer");

(function (userName) {
	if (typeof document === "undefined") {
		return;
	}

	const navbar = document.querySelector("#navbar");
	if (!navbar) {
		return;
	}

	const userProfile = document.createElement("div");
	userProfile.className = "user-profile";

	const profileImage = document.createElement("img");
	profileImage.src = "https://i.pravatar.cc/48?u=" + encodeURIComponent(userName);
	profileImage.alt = `${userName}'s profile picture`;

	const nameElement = document.createElement("span");
	nameElement.textContent = userName;

	userProfile.append(profileImage, nameElement);
	navbar.appendChild(userProfile);
})("John");

function makeJuicePartOne(size) {
	function addIngredients(firstIngredient, secondIngredient, thirdIngredient) {
		addDomMessage(
			`The client wants a ${size} juice, containing ${firstIngredient}, ${secondIngredient}, ${thirdIngredient}.`
		);
	}

	addIngredients("apple", "mint", "ginger");
}

makeJuicePartOne("medium");

function makeJuice(size) {
	const ingredients = [];

	function addIngredients(firstIngredient, secondIngredient, thirdIngredient) {
		ingredients.push(firstIngredient, secondIngredient, thirdIngredient);
	}

	function displayJuice() {
		addDomMessage(
			`The client wants a ${size} juice, containing ${ingredients.join(", ")}.`
		);
	}

	addIngredients("orange", "carrot", "lemon");
	addIngredients("apple", "spinach", "ginger");
	displayJuice();
}

makeJuice("large");
