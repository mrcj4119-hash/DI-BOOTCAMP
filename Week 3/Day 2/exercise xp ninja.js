
function logEvenNumbers() {
    const randomNum = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
    console.log("Exercise 1: Random Number");
    console.log("Random number:", randomNum);
    console.log("Even numbers from 0 to " + randomNum + ":");
    
    for (let i = 0; i <= randomNum; i += 2) {
        console.log(i);
    }
}

logEvenNumbers();

function capitalize(str) {
    let evenCapitalized = '';
    let oddCapitalized = '';
    
    for (let i = 0; i < str.length; i++) {
        if (i % 2 === 0) {
        
            evenCapitalized += str[i].toUpperCase();
            oddCapitalized += str[i].toLowerCase();
        } else {
        
            evenCapitalized += str[i].toLowerCase();
            oddCapitalized += str[i].toUpperCase();
        }
    }
    
    return [evenCapitalized, oddCapitalized];
}

console.log("\nExercise 2: Capitalized letters");
console.log(capitalize("abcdef")); 
console.log(capitalize("hello"));

function isPalindrome(str) {
    
    const cleaned = str.toLowerCase().replace(/\s/g, '');
    
    const reversed = cleaned.split('').reverse().join('');
    return cleaned === reversed;
}

console.log("\nExercise 3: Is palindrome?");
console.log(isPalindrome("madam"));
console.log(isPalindrome("bob"));
console.log(isPalindrome("kayak"));
console.log(isPalindrome("hello"));
console.log(isPalindrome("A man a plan a canal Panama"));

function biggestNumberInArray(arrayNumber) {
    let biggest = 0;
    
    for (let element of arrayNumber) {
    
        if (typeof element === 'number') {
            if (element > biggest) {
                biggest = element;
            }
        }
    }
    
    return biggest;
}

console.log("\nExercise 4: Biggest Number");
const array = [-1, 0, 3, 100, 99, 2, 99];
console.log(biggestNumberInArray(array));

const array2 = ['a', 3, 4, 2];
console.log(biggestNumberInArray(array2)); 

const array3 = [];
console.log(biggestNumberInArray(array3));


function getUniqueElements(list) {

    return [...new Set(list)];
    
}

console.log("\nExercise 5: Unique Elements");
const list1 = [1, 2, 3, 3, 3, 3, 4, 5];
console.log(getUniqueElements(list1));

const list2 = [1, 1, 2, 2, 3, 3, 4, 5, 5];
console.log(getUniqueElements(list2));

function createCalendar(year, month) {

    const calendarContainer = document.getElementById('calendar') || document.body;
    
    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    
    const headerRow = document.createElement('tr');
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    dayNames.forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        th.style.border = '1px solid black';
        th.style.padding = '10px';
        th.style.backgroundColor = '#f0f0f0';
        headerRow.appendChild(th);
    });
    
    table.appendChild(headerRow);
    
    const firstDay = new Date(year, month - 1, 1).getDay();

    const startingDay = firstDay === 0 ? 6 : firstDay - 1;
    
    const daysInMonth = new Date(year, month, 0).getDate();
    
    let currentRow = document.createElement('tr');
    
    for (let i = 0; i < startingDay; i++) {
        const td = document.createElement('td');
        td.style.border = '1px solid black';
        td.style.padding = '10px';
        td.style.width = '30px';
        td.style.height = '30px';
        td.style.textAlign = 'center';
        currentRow.appendChild(td);
    }
    
    for (let date = 1; date <= daysInMonth; date++) {
        const td = document.createElement('td');
        td.textContent = date;
        td.style.border = '1px solid black';
        td.style.padding = '10px';
        td.style.width = '30px';
        td.style.height = '30px';
        td.style.textAlign = 'center';
        currentRow.appendChild(td);
        
        if (currentRow.children.length === 7) {
            table.appendChild(currentRow);
            currentRow = document.createElement('tr');
        }
    }
    
    if (currentRow.children.length > 0) {
        table.appendChild(currentRow);
    }
    
    return table;
}

console.log("\nExercise 6: Calendar");
console.log("Use createCalendar(year, month) to generate a calendar table.");
console.log("Example: const cal = createCalendar(2012, 9); document.body.appendChild(cal);");

const cal = createCalendar(2012, 9);
document.body.appendChild(cal);