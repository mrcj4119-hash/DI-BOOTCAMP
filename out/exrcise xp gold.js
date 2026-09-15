"use strict";
// Exercise 1: Union Types
function processValue(value) {
    if (typeof value === "number") {
        return `$${value.toFixed(2)}`;
    }
    return value.split("").reverse().join("");
}
console.log(processValue(100));
console.log(processValue("hello"));
// Exercise 2: Array Type Annotations
function sumNumbersInArray(values) {
    let total = 0;
    for (const item of values) {
        if (typeof item === "number") {
            total += item;
        }
    }
    return total;
}
console.log(sumNumbersInArray([1, "two", 3, "four", 5]));
console.log(sumNumbersInArray([10, 20, 30]));
function introduceAdvancedUser(user) {
    const baseMessage = `${user.name} is ${user.age} years old.`;
    if (user.address) {
        return `${baseMessage} Address: ${user.address}`;
    }
    return baseMessage;
}
console.log(introduceAdvancedUser({ name: "Alice", age: 30 }));
console.log(introduceAdvancedUser({ name: "Bob", age: 25, address: "Paris" }));
// Exercise 4: Optional Parameters
function welcomeUser(name, greeting) {
    const message = greeting ?? "Hello";
    return `${message}, ${name}!`;
}
console.log(welcomeUser("Alice"));
console.log(welcomeUser("Alice", "Hi"));
