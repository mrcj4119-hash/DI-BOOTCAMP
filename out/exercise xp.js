"use strict";
// Exercise 1: Hello, World!
console.log("Hello, World!");
// Exercise 2: Type Annotations
const age = 30;
const personName = "Alice";
console.log("Age:", age);
console.log("Name:", personName);
// Exercise 3: Union Types
let id;
id = "user-123";
console.log("ID as string:", id);
id = 42;
console.log("ID as number:", id);
// Exercise 4: Control Flow with if...else
function checkNumber(value) {
    if (value > 0) {
        return "Positive";
    }
    else if (value < 0) {
        return "Negative";
    }
    else {
        return "Zero";
    }
}
console.log(checkNumber(10));
console.log(checkNumber(-5));
console.log(checkNumber(0));
// Exercise 5: Tuple Types
function getDetails(name, age) {
    return [name, age, `Hello, ${name}! You are ${age} years old.`];
}
const details = getDetails("Alice", 25);
console.log(details);
function createPerson(name, age) {
    return { name, age };
}
const person = createPerson("Bob", 30);
console.log(person);
// Exercise 7: Type Assertions
const inputElement = typeof document !== "undefined"
    ? document.getElementById("username")
    : null;
if (inputElement) {
    inputElement.value = "Alice";
    console.log("Updated input value:", inputElement.value);
}
else {
    console.log("No element with id 'username' was found in the DOM.");
}
// Exercise 8: switch Statement with Complex Conditions
function getAction(role) {
    switch (role.toLowerCase().trim()) {
        case "admin":
            return "Manage users and settings";
        case "editor":
            return "Edit content";
        case "viewer":
            return "View content";
        case "guest":
            return "Limited access";
        default:
            return "Invalid role";
    }
}
console.log(getAction("admin"));
console.log(getAction("editor"));
console.log(getAction("viewer"));
console.log(getAction("guest"));
console.log(getAction("unknown"));
function greet(name = "friend") {
    return `Hello, ${name}!`;
}
console.log(greet());
console.log(greet("Alice"));
