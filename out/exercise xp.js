"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Exercise 1: Access modifiers
class Employee {
    constructor(name, salary, position, department) {
        this.name = name;
        this.salary = salary;
        this.position = position;
        this.department = department;
    }
    getEmployeeInfo() {
        return `${this.name} - ${this.position}`;
    }
}
const employee = new Employee("Alice", 50000, "Developer", "Engineering");
console.log(employee.getEmployeeInfo());
// Exercise 2: Readonly properties
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    getProductInfo() {
        return `${this.name} costs $${this.price}`;
    }
}
const product = new Product(1, "Notebook", 12.99);
console.log(product.getProductInfo());
// This would produce a TypeScript error because id is readonly:
// product.id = 2;
// Exercise 3: Class inheritance
class Animal {
    constructor(name) {
        this.name = name;
    }
    makeSound() {
        return "Some animal sound";
    }
}
class Dog extends Animal {
    makeSound() {
        return "Bark";
    }
}
const dog = new Dog("Buddy");
console.log(`${dog.name} says ${dog.makeSound()}`);
// Exercise 4: Static properties and methods
class Calculator {
    static add(a, b) {
        return a + b;
    }
    static subtract(a, b) {
        return a - b;
    }
}
console.log(Calculator.add(10, 5));
console.log(Calculator.subtract(10, 5));
const printUserDetails = (user) => {
    const membership = user.membershipLevel ?? "Standard";
    console.log(`${user.name} (${user.email}) - ${membership}`);
};
const premiumUser = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    membershipLevel: "Gold",
};
printUserDetails(premiumUser);
