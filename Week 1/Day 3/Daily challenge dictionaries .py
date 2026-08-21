def letter_indices(word):
	indices = {}
	for index, character in enumerate(word):
		if character in indices:
			indices[character].append(index)
		else:
			indices[character] = [index]
	return indices


word = input("Enter a word: ")
print(letter_indices(word))


def affordable_items(items_purchase, wallet):
	wallet_amount = int(wallet.replace("$", "").replace(",", ""))
	basket = []

	for item, price in items_purchase.items():
		item_price = int(price.replace("$", "").replace(",", ""))
		if item_price <= wallet_amount:
			basket.append(item)
			wallet_amount -= item_price

	return sorted(basket) if basket else "Nothing"


items_purchase_1 = {
	"Water": "$1",
	"Bread": "$3",
	"TV": "$1,000",
	"Fertilizer": "$20",
}
print(affordable_items(items_purchase_1, "$300"))

items_purchase_2 = {
	"Apple": "$4",
	"Honey": "$3",
	"Fan": "$14",
	"Bananas": "$4",
	"Pan": "$100",
	"Spoon": "$2",
}
print(affordable_items(items_purchase_2, "$100"))

items_purchase_3 = {
	"Phone": "$999",
	"Speakers": "$300",
	"Laptop": "$5,000",
	"PC": "$1200",
}
print(affordable_items(items_purchase_3, "$1"))
