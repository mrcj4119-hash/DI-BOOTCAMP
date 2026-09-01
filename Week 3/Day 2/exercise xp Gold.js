
function isBlank(str) {
    return str.length === 0;
}

console.log("Exercise 1: is_Blank");
console.log(isBlank('')); 
console.log(isBlank('abc'));

function abbrevName(name) {
    const parts = name.split(' ');
    return parts[0] + ' ' + parts[1].charAt(0).toUpperCase() + '.';
}

console.log("\nExercise 2: Abbrev_name");
console.log(abbrevName("Robin Singh"));
console.log(abbrevName("John Doe"));

function swapCase(str) {
    let result = '';
    
    for (let char of str) {
        if (char === char.toUpperCase()) {
            result += char.toLowerCase();
        } else {
            result += char.toUpperCase();
        }
    }
    
    return result;
}

console.log("\nExercise 3: SwapCase");
console.log(swapCase('The Quick Brown Fox'));
console.log(swapCase('Hello World'));

function isOmnipresent(array, value) {
    return array.every(subarray => subarray.includes(value));
}

console.log("\nExercise 4: Omnipresent value");
console.log(isOmnipresent([[3, 4], [8, 3, 2], [3], [9, 3], [5, 3], [4, 3]], 3)); // --> true
console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 1)); // --> true
console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 6)); // --> false
