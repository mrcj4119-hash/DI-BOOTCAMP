"use strict";
// Exercise 1: Conditional Types
function mapType(value) {
    if (typeof value === "number") {
        return (value * value);
    }
    return (value.length);
}
console.log(mapType(4));
console.log(mapType("hello"));
// Exercise 2: Keyof and Lookup Types
function getProperty(obj, key) {
    return obj[key];
}
const sampleObject = {
    name: "Alice",
    age: 25,
    city: "Paris"
};
console.log(getProperty(sampleObject, "name"));
console.log(getProperty(sampleObject, "age"));
console.log(getProperty(sampleObject, "city"));
function multiplyProperty(obj, key, factor) {
    return obj[key] * factor;
}
const product = {
    price: 10,
    quantity: 4,
    discount: 2
};
console.log(multiplyProperty(product, "price", 3));
console.log(multiplyProperty(product, "quantity", 5));
console.log(multiplyProperty(product, "discount", 4));
