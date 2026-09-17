"use strict";
function isUser(value) {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const candidate = value;
    return (candidate.type === "user" &&
        typeof candidate.name === "string" &&
        typeof candidate.age === "number");
}
function isProduct(value) {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const candidate = value;
    return (candidate.type === "product" &&
        typeof candidate.id === "number" &&
        typeof candidate.price === "number");
}
function isOrder(value) {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const candidate = value;
    return (candidate.type === "order" &&
        typeof candidate.orderId === "string" &&
        typeof candidate.amount === "number");
}
function handleData(data) {
    return data.map((item) => {
        if (isUser(item)) {
            return `Hello, ${item.name}! You are ${item.age} years old.`;
        }
        if (isProduct(item)) {
            return `Product ${item.id} costs $${item.price}.`;
        }
        if (isOrder(item)) {
            return `Order ${item.orderId} has a total amount of $${item.amount}.`;
        }
        return "Unexpected data type.";
    });
}
const data = [
    { type: "user", name: "Alice", age: 30 },
    { type: "product", id: 101, price: 49.99 },
    { type: "order", orderId: "ORD-001", amount: 99.98 },
];
console.log(handleData(data));
