"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getProperty(user, propertyName) {
    if (propertyName in user) {
        return user[propertyName];
    }
    return undefined;
}
function castToType(value, constructor) {
    return new constructor(value);
}
function getArrayLength(items) {
    const typedItems = items;
    return typedItems.length;
}
class Box {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    get(index) {
        return this.items[index];
    }
}
class Queue {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    remove() {
        return this.items.shift();
    }
}
const adminUser = {
    name: "Alex",
    email: "alex@example.com",
    adminLevel: 2,
};
const convertedNumber = castToType("42", Number);
const convertedBoolean = castToType("true", Boolean);
const numberArrayLength = getArrayLength([1, 2, 3]);
const stringArrayLength = getArrayLength(["one", "two"]);
const numberBox = new Box();
numberBox.add(10);
const stringBox = new Box();
stringBox.add("stored value");
const numberQueue = new Queue();
numberQueue.add({ value: 100 });
const stringQueue = new Queue();
stringQueue.add({ value: "queued value" });
console.log(getProperty(adminUser, "name"));
console.log(getProperty(adminUser, "missing"));
console.log(convertedNumber);
console.log(convertedBoolean);
console.log(numberArrayLength);
console.log(stringArrayLength);
console.log(numberBox.get(0));
console.log(stringBox.get(0));
console.log(numberQueue.remove());
console.log(stringQueue.remove());
