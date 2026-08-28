from menu_manager import MenuManager


manager = None


def load_manager():
	global manager
	manager = MenuManager()
	return manager


def show_restaurant_menu():
	print("\nRestaurant menu:")
	if not manager.menu["items"]:
		print("The menu is empty.")
		return
	for item in manager.menu["items"]:
		print(f"- {item['name']}: {item['price']}")


def add_item_to_menu():
	name = input("Item name: ").strip()
	try:
		price = float(input("Item price: "))
	except ValueError:
		print("Please enter a valid price.")
		return
	manager.add_item(name, price)
	print("item was added successfully")


def remove_item_from_menu():
	name = input("Item name to remove: ").strip()
	if manager.remove_item(name):
		print("Item was deleted successfully.")
	else:
		print("There was an error: item was not found.")


def show_user_menu():
	while True:
		print("\n1. View restaurant menu")
		print("2. Add an item")
		print("3. Delete an item")
		print("4. Exit")
		choice = input("Choose an option: ").strip()
		if choice == "1":
			show_restaurant_menu()
		elif choice == "2":
			add_item_to_menu()
		elif choice == "3":
			remove_item_from_menu()
		elif choice == "4":
			manager.save_to_file()
			print("The menu was saved.")
			return
		else:
			print("Invalid choice.")


if __name__ == "__main__":
	load_manager()
	show_user_menu()