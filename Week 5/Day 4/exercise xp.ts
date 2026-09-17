type Person = {
	name: string;
	age: number;
};

type Address = {
	street: string;
	city: string;
};

type PersonWithAddress = Person & Address;

const personWithAddress: PersonWithAddress = {
	name: "Alice",
	age: 30,
	street: "123 Main Street",
	city: "New York",
};

function describeValue(value: number | string): string {
	if (typeof value === "number") {
		return "This is a number";
	}

	return "This is a string";
}

const someValue: any = "This value was cast to a string";
const castString: string = someValue as string;

function getFirstElement(values: (number | string)[]): string {
	return values[0] as string;
}

function logLength<T extends { length: number }>(value: T): void {
	console.log(value.length);
}

type Manager = {
	position: "Manager";
	department: string;
};

type Developer = {
	position: "Developer";
	department: string;
};

type Job = Manager | Developer;
type Employee = Person & Job;

function describeEmployee(employee: Employee): string {
	if (employee.position === "Manager") {
		return `${employee.name} is a manager in the ${employee.department} department.`;
	}

	return `${employee.name} is a developer in the ${employee.department} department.`;
}

function formatInput<T extends { toString(): string }>(input: T): string {
	return input.toString() as string;
}

const manager: Employee = {
	name: "Jordan",
	age: 35,
	position: "Manager",
	department: "Operations",
};

const developer: Employee = {
	name: "Taylor",
	age: 28,
	position: "Developer",
	department: "Engineering",
};

console.log(personWithAddress);
console.log(describeValue(42));
console.log(describeValue("hello"));
console.log(castString);
console.log(getFirstElement(["first", 2]));
logLength("TypeScript");
logLength([1, 2, 3]);
console.log(describeEmployee(manager));
console.log(describeEmployee(developer));
console.log(formatInput(12345));
