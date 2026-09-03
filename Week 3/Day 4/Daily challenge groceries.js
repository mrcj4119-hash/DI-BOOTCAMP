let client = "John";

const groceries = {
	fruits: ["pear", "apple", "banana"],
	vegetables: ["tomatoes", "cucumber", "salad"],
	totalPrice: "20$",
	other: {
		paid: true,
		meansOfPayment: ["cash", "creditCard"]
	}
};

const displayGroceries = () => {
	groceries.fruits.forEach(fruit => console.log(fruit));
};

displayGroceries();

const cloneGroceries = () => {
	const user = client;
	client = "Betty";

	console.log("user:", user);
	console.log("client:", client);
	console.log(
		"user stays John because strings are copied by value, so changing client does not change user."
	);

	const shopping = groceries;
	shopping.totalPrice = "35$";
	console.log("groceries.totalPrice:", groceries.totalPrice);
	console.log("shopping.totalPrice:", shopping.totalPrice);
	console.log(
		"shopping also shows 35$ because shopping and groceries reference the same object."
	);

	shopping.other.paid = false;
	console.log("groceries.other.paid:", groceries.other.paid);
	console.log("shopping.other.paid:", shopping.other.paid);
	console.log(
		"shopping also shows paid as false because the nested object is shared by reference."
	);
};

cloneGroceries();
