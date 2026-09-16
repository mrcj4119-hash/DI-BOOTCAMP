export {};

class Employee {
	constructor(
		protected name: string,
		protected salary: number,
	) {}

	public getDetails(): string {
		return `${this.name} earns $${this.salary}`;
	}
}

class Manager extends Employee {
	constructor(
		name: string,
		salary: number,
		public department: string,
	) {
		super(name, salary);
	}

	public override getDetails(): string {
		return `${super.getDetails()} and manages the ${this.department} department`;
	}
}

const manager = new Manager("Jordan", 75000, "Engineering");
console.log(manager.getDetails());

class Car {
	constructor(
		public readonly make: string,
		private readonly model: string,
		public year: number,
	) {}

	public getCarDetails(): string {
		return `${this.make} ${this.model} (${this.year})`;
	}
}

const car = new Car("Toyota", "Corolla", 2024);
console.log(car.getCarDetails());

class MathUtils {
	public static readonly PI = 3.14159;

	public static circumference(radius: number): number {
		return 2 * MathUtils.PI * radius;
	}
}

console.log(MathUtils.circumference(5));

interface Operation {
	operate: (firstNumber: number, secondNumber: number) => number;
}

class Addition implements Operation {
	public operate(firstNumber: number, secondNumber: number): number {
		return firstNumber + secondNumber;
	}
}

class Multiplication implements Operation {
	public operate(firstNumber: number, secondNumber: number): number {
		return firstNumber * secondNumber;
	}
}

const addition = new Addition();
const multiplication = new Multiplication();
console.log(addition.operate(6, 4));
console.log(multiplication.operate(6, 4));

interface Shape {
	color: string;
	getArea(): number;
}

interface Rectangle extends Shape {
	readonly width: number;
	readonly height: number;
	getPerimeter(): number;
}

class ColoredRectangle implements Rectangle {
	constructor(
		public color: string,
		public readonly width: number,
		public readonly height: number,
	) {}

	public getArea(): number {
		return this.width * this.height;
	}

	public getPerimeter(): number {
		return 2 * (this.width + this.height);
	}
}

const rectangle = new ColoredRectangle("blue", 8, 5);
console.log(`Area: ${rectangle.getArea()}`);
console.log(`Perimeter: ${rectangle.getPerimeter()}`);
