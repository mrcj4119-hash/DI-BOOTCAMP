"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Exercise 1: Advanced access modifiers and inheritance
class Employee {
    constructor(name, age, salary) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }
    calculateBonus() {
        return this.salary * 0.1;
    }
    getSalaryDetails() {
        return `${this.name} earns $${this.salary}`;
    }
}
class Manager extends Employee {
    getSalaryDetails() {
        return `${super.getSalaryDetails()} plus a $${this.calculateBonus()} bonus`;
    }
}
class ExecutiveManager extends Manager {
    approveBudget(amount) {
        return `${this.name} approved a budget of $${amount}`;
    }
}
const executiveManager = new ExecutiveManager("Taylor", 42, 100000);
console.log(executiveManager.getSalaryDetails());
console.log(executiveManager.approveBudget(50000));
// Exercise 2: Static methods and properties
class Shape {
    constructor() {
        Shape.totalShapes += 1;
    }
    static getType() {
        return "Shape";
    }
}
Shape.totalShapes = 0;
class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    area() {
        return Math.PI * this.radius ** 2;
    }
    static getType() {
        return "Circle";
    }
}
class Square extends Shape {
    constructor(side) {
        super();
        this.side = side;
    }
    area() {
        return this.side ** 2;
    }
    static getType() {
        return "Square";
    }
}
const circle = new Circle(3);
const square = new Square(4);
console.log(`${Circle.getType()} area: ${circle.area()}`);
console.log(`${Square.getType()} area: ${square.area()}`);
console.log(`Total shapes: ${Shape.totalShapes}`);
class AdvancedCalculator {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    operate(operation) {
        return operation(this.a, this.b);
    }
    add() {
        return this.operate((firstNumber, secondNumber) => firstNumber + secondNumber);
    }
    subtract() {
        return this.operate((firstNumber, secondNumber) => firstNumber - secondNumber);
    }
    multiply() {
        return this.operate((firstNumber, secondNumber) => firstNumber * secondNumber);
    }
}
const advancedCalculator = new AdvancedCalculator(12, 4);
console.log(advancedCalculator.add());
console.log(advancedCalculator.subtract());
console.log(advancedCalculator.multiply());
// Exercise 4: Readonly properties in inheritance
class Device {
    constructor(serialNumber) {
        this.serialNumber = serialNumber;
    }
    getDeviceInfo() {
        return `Serial number: ${this.serialNumber}`;
    }
}
class Laptop extends Device {
    constructor(serialNumber, model, price) {
        super(serialNumber);
        this.model = model;
        this.price = price;
    }
    getDeviceInfo() {
        return `${super.getDeviceInfo()}, model: ${this.model}, price: $${this.price}`;
    }
}
const laptop = new Laptop("SN-12345", "ProBook", 1200);
laptop.model = "ProBook X";
laptop.price = 1350;
console.log(laptop.getDeviceInfo());
class Smartphone {
    constructor(name, price, warrantyPeriod, discount) {
        this.name = name;
        this.price = price;
        this.warrantyPeriod = warrantyPeriod;
        this.discount = discount;
    }
    getPriceAfterDiscount() {
        return this.price * (1 - (this.discount ?? 0));
    }
}
const smartphone = new Smartphone("Example Phone", 800, 24, 0.15);
console.log(`Price after discount: $${smartphone.getPriceAfterDiscount()}`);
