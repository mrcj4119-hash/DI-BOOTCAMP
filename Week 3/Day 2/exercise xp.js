
function displayNumbersDivisible(divisor = 23) {
    let sum = 0;
    let numbers = [];
    
    for (let i = 0; i <= 500; i++) {
        if (i % divisor === 0) {
            numbers.push(i);
            sum += i;
        }
    }
    
    console.log(numbers.join(" "));
    console.log("Sum :", sum);
}

displayNumbersDivisible();
console.log("\n--- Testing with divisor 3 ---");
displayNumbersDivisible(3);
console.log("\n--- Testing with divisor 45 ---");
displayNumbersDivisible(45);

const stock = { 
    "banana": 6, 
    "apple": 0,
    "pear": 12,
    "orange": 32,
    "blueberry": 1
}  

const prices = {    
    "banana": 4, 
    "apple": 2, 
    "pear": 1,
    "orange": 1.5,
    "blueberry": 10
}

const shoppingList = ["banana", "orange", "apple"];

function myBill() {
    let totalPrice = 0;
    
    for (let item of shoppingList) {
        if (item in stock && stock[item] > 0) {
            totalPrice += prices[item];
            stock[item]--;
        }
    }
    
    return totalPrice;
}

console.log("\n--- Exercise 2: Shopping List ---");
console.log("Shopping List:", shoppingList);
console.log("Total Bill:", myBill());
console.log("Stock after purchase:", stock);

function changeEnough(itemPrice, amountOfChange) {
    const coinValues = [0.25, 0.10, 0.05, 0.01];
    let totalChange = 0;
    
    for (let i = 0; i < amountOfChange.length; i++) {
        totalChange += amountOfChange[i] * coinValues[i];
    }
    
    return totalChange >= itemPrice;
}

console.log("\n--- Exercise 3: What's in my wallet? ---");
console.log("changeEnough(4.25, [25, 20, 5, 0]):", changeEnough(4.25, [25, 20, 5, 0]));
console.log("changeEnough(14.11, [2, 100, 0, 0]):", changeEnough(14.11, [2, 100, 0, 0]));
console.log("changeEnough(0.75, [0, 0, 20, 5]):", changeEnough(0.75, [0, 0, 20, 5]));

function hotelCost() {
    let nights;
    
    while (true) {
        nights = prompt("How many nights would you like to stay in the hotel?");
        if (nights !== null && !isNaN(nights) && nights !== "") {
            nights = Number(nights);
            break;
        }
        alert("Please enter a valid number");
    }
    
    return nights * 140;
}

function planeRideCost() {
    let destination;
    
    while (true) {
        destination = prompt("What is your destination?");
        if (destination !== null && destination.trim() !== "" && isNaN(destination)) {
            break;
        }
        alert("Please enter a valid destination");
    }
    
    destination = destination.trim().toLowerCase();
    
    switch (destination) {
        case "london":
            return 183;
        case "paris":
            return 220;
        default:
            return 300;
    }
}

function rentalCarCost() {
    let days;
    
    while (true) {
        days = prompt("How many days would you like to rent the car?");
        if (days !== null && !isNaN(days) && days !== "") {
            days = Number(days);
            break;
        }
        alert("Please enter a valid number");
    }
    
    let cost = days * 40;
    
    if (days > 10) {
        cost *= 0.95; 
    }
    
    return cost;
}

function totalVacationCost() {
    const hotelCostAmount = hotelCost();
    const planeTicketCost = planeRideCost();
    const carRentalCost = rentalCarCost();
    const totalCost = hotelCostAmount + planeTicketCost + carRentalCost;
    
    console.log("\n--- Vacation Cost Summary ---");
    console.log("Hotel cost: $" + hotelCostAmount);
    console.log("Plane ticket cost: $" + planeTicketCost);
    console.log("Car rental cost: $" + carRentalCost.toFixed(2));
    console.log("Total vacation cost: $" + totalCost.toFixed(2));
    
    return totalCost;
}

 totalVacationCost();
