export {};

class Employee {
	constructor(
		public name: string,
		private age: number,
		protected salary: number,
	) {}

	protected calculateBonus(): number {
		return this.salary * 0.1;
	}

	public getSalaryDetails(): string {
		return `${this.name} earns $${this.salary}`;
	}
}

class Manager extends Employee {
	public override getSalaryDetails(): string {
		return `${super.getSalaryDetails()} plus a $${this.calculateBonus()} bonus`;
	}
}

class ExecutiveManager extends Manager {
	public approveBudget(amount: number): string {
		return `${this.name} approved a budget of $${amount}`;
	}
}

const executiveManager = new ExecutiveManager("Taylor", 42, 100000);
console.log(executiveManager.getSalaryDetails());
console.log(executiveManager.approveBudget(50000));

class Shape {
	public static totalShapes = 0;

	constructor() {
		Shape.totalShapes += 1;
	}

	public static getType(): string {
		return "Shape";
	}
}

class Circle extends Shape {
	constructor(public radius: number) {
		super();
	}

	public area(): number {
		return Math.PI * this.radius ** 2;
	}

	public static override getType(): string {
		return "Circle";
	}
}

class Square extends Shape {
	constructor(public side: number) {
		super();
	}

	public area(): number {
		return this.side ** 2;
	}

	public static override getType(): string {
		return "Square";
	}
}

const circle = new Circle(3);
const square = new Square(4);
console.log(`${Circle.getType()} area: ${circle.area()}`);
console.log(`${Square.getType()} area: ${square.area()}`);
console.log(`Total shapes: ${Shape.totalShapes}`);

interface Calculator {
	a: number;
	b: number;
	operate: (operation: (firstNumber: number, secondNumber: number) => number) => number;
}

class AdvancedCalculator implements Calculator {
	constructor(
		public a: number,
		public b: number,
	) {}

	public operate(operation: (firstNumber: number, secondNumber: number) => number): number {
		return operation(this.a, this.b);
	}

	public add(): number {
		return this.operate((firstNumber, secondNumber) => firstNumber + secondNumber);
	}

	public subtract(): number {
		return this.operate((firstNumber, secondNumber) => firstNumber - secondNumber);
	}

	public multiply(): number {
		return this.operate((firstNumber, secondNumber) => firstNumber * secondNumber);
	}
}

const advancedCalculator = new AdvancedCalculator(12, 4);
console.log(advancedCalculator.add());
console.log(advancedCalculator.subtract());
console.log(advancedCalculator.multiply());

class Device {
	constructor(public readonly serialNumber: string) {}

	public getDeviceInfo(): string {
		return `Serial number: ${this.serialNumber}`;
	}
}

class Laptop extends Device {
	constructor(
		serialNumber: string,
		public model: string,
		public price: number,
	) {
		super(serialNumber);
	}

	public override getDeviceInfo(): string {
		return `${super.getDeviceInfo()}, model: ${this.model}, price: $${this.price}`;
	}
}

const laptop = new Laptop("SN-12345", "ProBook", 1200);
laptop.model = "ProBook X";
laptop.price = 1350;
console.log(laptop.getDeviceInfo());

interface Product {
	readonly name: string;
	price: number;
	discount?: number;
}

interface Electronics extends Product {
	warrantyPeriod: number;
}

class Smartphone implements Electronics {
	constructor(
		public readonly name: string,
		public price: number,
		public warrantyPeriod: number,
		public discount?: number,
	) {}

	public getPriceAfterDiscount(): number {
		return this.price * (1 - (this.discount ?? 0));
	}
}

const smartphone = new Smartphone("Example Phone", 800, 24, 0.15);
console.log(`Price after discount: $${smartphone.getPriceAfterDiscount()}`);
