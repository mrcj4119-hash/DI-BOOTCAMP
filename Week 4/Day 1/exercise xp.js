const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];

colors.forEach((color, index) => {
	console.log(`${index + 1}# choice is ${color}.`);
});

console.log(colors.some((color) => color === "Violet") ? "Yeah" : "No...");

const ordinal = ["th", "st", "nd", "rd"];

colors.forEach((color, index) => {
	const choiceNumber = index + 1;
	const suffix = choiceNumber <= 3 ? ordinal[choiceNumber] : ordinal[0];
	console.log(`${choiceNumber}${suffix} choice is ${color}.`);
});

const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];
const combinedFood = ["bread", ...vegetables, "chicken", ...fruits];
console.log(combinedFood);

const country = "USA";
console.log([...country]);

const newArray = [...[,,]];
console.log(newArray);

const users = [
	{ firstName: "Bradley", lastName: "Bouley", role: "Full Stack Resident" },
	{ firstName: "Chloe", lastName: "Alnaji", role: "Full Stack Resident" },
	{ firstName: "Jonathan", lastName: "Baughn", role: "Enterprise Instructor" },
	{ firstName: "Michael", lastName: "Herman", role: "Lead Instructor" },
	{ firstName: "Robert", lastName: "Hajek", role: "Full Stack Resident" },
	{ firstName: "Wes", lastName: "Reid", role: "Instructor" },
	{ firstName: "Zach", lastName: "Klabunde", role: "Instructor" }
];

const welcomeStudents = users.map((user) => `Hello ${user.firstName}`);
console.log(welcomeStudents);

const fullStackResidents = users.filter(
	(user) => user.role === "Full Stack Resident"
);
console.log(fullStackResidents);

const fullStackResidentLastNames = users
	.filter((user) => user.role === "Full Stack Resident")
	.map((user) => user.lastName);
console.log(fullStackResidentLastNames);

const epic = ["a", "long", "time", "ago", "in a", "galaxy", "far far", "away"];
const epicSentence = epic.reduce((sentence, word) => `${sentence} ${word}`);
console.log(epicSentence);

const students = [
	{ name: "Ray", course: "Computer Science", isPassed: true },
	{ name: "Liam", course: "Computer Science", isPassed: false },
	{ name: "Jenner", course: "Information Technology", isPassed: true },
	{ name: "Marco", course: "Robotics", isPassed: true },
	{ name: "Kimberly", course: "Artificial Intelligence", isPassed: false },
	{ name: "Jamie", course: "Big Data", isPassed: false }
];

const passedStudents = students.filter((student) => student.isPassed);
console.log(passedStudents);

passedStudents.forEach((student) => {
	console.log(
		`Good job ${student.name}, you passed the course in ${student.course}`
	);
});
