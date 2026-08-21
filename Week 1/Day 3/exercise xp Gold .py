birthdays = {
	"Alice": "1995/04/12",
	"Peris": "1992/09/25",
	"Chacha": "2000/01/30",
	"Chebby": "1988/06/18",
	"Liz": "1999/11/07",
}

print("Welcome to the birthday lookup!")
print("You can look up the birthdays of the people in the list!")
print("People in the birthday dictionary:")
for person in birthdays:
	print(f"- {person}")

new_person = input("Add a person's name: ").strip()
new_birthday = input("Add their birthday (YYYY/MM/DD): ").strip()
birthdays[new_person] = new_birthday

person_to_find = input("Whose birthday would you like to look up? ").strip()
if person_to_find in birthdays:
	print(f"{person_to_find}'s birthday is {birthdays[person_to_find]}.")
else:
	print(f"Sorry, we don't have the birthday information for {person_to_find}.")


items = {
	"banana": 4,
	"apple": 2,
	"orange": 1.5,
	"pear": 3,
}

for item, price in items.items():
	print(f"The price of {item} is ${price}.")

stocked_items = {
	"banana": {"price": 4, "stock": 10},
	"apple": {"price": 2, "stock": 5},
	"orange": {"price": 1.5, "stock": 24},
	"pear": {"price": 3, "stock": 1},
}

total_stock_value = 0
for item, details in stocked_items.items():
	item_value = details["price"] * details["stock"]
	total_stock_value += item_value
	print(f"The total value of {item} in stock is ${item_value:.2f}.")

print(f"The cost of buying everything in stock is ${total_stock_value:.2f}.")
