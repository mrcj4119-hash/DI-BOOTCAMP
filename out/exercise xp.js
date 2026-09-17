"use strict";
const personWithAddress = {
    name: "Alice",
    age: 30,
    street: "123 Main Street",
    city: "New York",
};
function describeValue(value) {
    if (typeof value === "number") {
        return "This is a number";
    }
    return "This is a string";
}
const someValue = "This value was cast to a string";
const castString = someValue;
function getFirstElement(values) {
    return values[0];
}
function logLength(value) {
    console.log(value.length);
}
function describeEmployee(employee) {
    if (employee.position === "Manager") {
        return `${employee.name} is a manager in the ${employee.department} department.`;
    }
    return `${employee.name} is a developer in the ${employee.department} department.`;
}
function formatInput(input) {
    return input.toString();
}
const manager = {
    name: "Jordan",
    age: 35,
    position: "Manager",
    department: "Operations",
};
const developer = {
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
