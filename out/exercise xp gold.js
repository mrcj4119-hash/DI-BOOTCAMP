"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Exercise 1: Inheritance with protected properties
class Employee {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }
    getDetails() {
        return `${this.name} earns $${this.salary}`;
    }
}
class Manager extends Employee {
    constructor(name, salary, department) {
        super(name, salary);
        this.department = department;
    }
    getDetails() {
        return `${super.getDetails()} and manages the ${this.department} department`;
    }
}
const manager = new Manager("Jordan", 75000, "Engineering");
console.log(manager.getDetails());
// Exercise 2: Readonly properties with access modifiers
class Car {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    getCarDetails() {
        return `${this.make} ${this.model} (${this.year})`;
    }
}
const car = new Car("Toyota", "Corolla", 2024);
console.log(car.getCarDetails());
// These assignments produce TypeScript errors because the properties are readonly:
// car.make = "Honda";
// car.model = "Civic";
// Exercise 3: Static properties and methods
class MathUtils {
    static circumference(radius) {
        return 2 * MathUtils.PI * radius;
    }
}
MathUtils.PI = 3.14159;
console.log(MathUtils.circumference(5));
class Addition {
    operate(firstNumber, secondNumber) {
        return firstNumber + secondNumber;
    }
}
class Multiplication {
    operate(firstNumber, secondNumber) {
        return firstNumber * secondNumber;
    }
}
const addition = new Addition();
const multiplication = new Multiplication();
console.log(addition.operate(6, 4));
console.log(multiplication.operate(6, 4));
class ColoredRectangle {
    constructor(color, width, height) {
        this.color = color;
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
    getPerimeter() {
        return 2 * (this.width + this.height);
    }
}
const rectangle = new ColoredRectangle("blue", 8, 5);
console.log(`Area: ${rectangle.getArea()}`);
console.log(`Perimeter: ${rectangle.getPerimeter()}`);
