
const isNode = typeof window === 'undefined';

if (isNode) {

    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.question('Enter several words separated by commas: ', (userInput) => {
        processWords(userInput);
        rl.close();
    });
} else {

    const userInput = prompt("Enter several words separated by commas:");
    processWords(userInput);
}

function processWords(userInput) {

    if (!userInput || userInput.trim() === "") {
        console.log("No words entered. Please try again.");
        return;
    }
    
    const words = userInput.split(',').map(word => word.trim());
    
    let longestLength = 0;
    words.forEach(word => {
        if (word.length > longestLength) {
            longestLength = word.length;
        }
    });
    
    const frameWidth = longestLength + 4;
    
    const topBorder = '*'.repeat(frameWidth);
    console.log(topBorder);
    
    words.forEach(word => {
    
        const paddingRight = longestLength - word.length;
        const line = '* ' + word + ' '.repeat(paddingRight) + ' *';
        console.log(line);
    });
    
    const bottomBorder = '*'.repeat(frameWidth);
    console.log(bottomBorder);
}
