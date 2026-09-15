"use strict";
function validateUnionType(value, allowedTypes) {
    const actualType = typeof value;
    for (const type of allowedTypes) {
        if (actualType === type) {
            return true;
        }
    }
    return false;
}
const value1 = "hello";
const value2 = 42;
const value3 = true;
const value4 = null;
console.log(validateUnionType(value1, ["string", "number"]));
console.log(validateUnionType(value2, ["string", "number"]));
console.log(validateUnionType(value3, ["string", "number"]));
console.log(validateUnionType(value4, ["string", "number", "boolean"]));
