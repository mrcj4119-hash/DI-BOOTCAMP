export {};

class Employee {
	constructor(
		private name: string,
		private salary: number,
		public position: string,
		protected department: string,
	) {}

	public getEmployeeInfo(): string {
		return `${this.name} - ${this.position}`;
	}
}

const employee = new Employee("Alice", 50000, "Developer", "Engineering");
console.log(employee.getEmployeeInfo());

class Product {
	constructor(
		public readonly id: number,
		public name: string,
		public price: number,
	) {}

	public getProductInfo(): string {
		return `${this.name} costs $${this.price}`;
	}
}

const product = new Product(1, "Notebook", 12.99);
console.log(product.getProductInfo());

class Animal {
	constructor(public name: string) {}

	public makeSound(): string {
		return "Some animal sound";
	}
}

class Dog extends Animal {
	public override makeSound(): string {
		return "Bark";
	}
}

const dog = new Dog("Buddy");
console.log(`${dog.name} says ${dog.makeSound()}`);

class Calculator {
	public static add(a: number, b: number): number {
		return a + b;
	}

	public static subtract(a: number, b: number): number {
		return a - b;
	}
}

console.log(Calculator.add(10, 5));
console.log(Calculator.subtract(10, 5));

interface User {
	readonly id: number;
	name: string;
	email: string;
}

interface PremiumUser extends User {
	membershipLevel?: string;
}

type UserDetailsPrinter = (user: PremiumUser) => void;

const printUserDetails: UserDetailsPrinter = (user) => {
	const membership = user.membershipLevel ?? "Standard";
	console.log(`${user.name} (${user.email}) - ${membership}`);
};

const premiumUser: PremiumUser = {
	id: 1,
	name: "Alice",
	email: "alice@example.com",
	membershipLevel: "Gold",
};

printUserDetails(premiumUser);
