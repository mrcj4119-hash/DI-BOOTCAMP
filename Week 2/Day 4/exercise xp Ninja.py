import json
import random
import re
from pathlib import Path


MENU_FILE = Path(__file__).with_name("restaurant_menu.json")
CHARACTERS_JSON_FILE = Path(__file__).with_name("characters.json")
CHARACTERS_TXT_FILE = Path(__file__).with_name("characters.txt")
CONNECTION_WORDS = {"a", "an", "and", "of", "the", "with", "in", "on"}
PRICE_PATTERN = re.compile(r"^\d{2},14$")


def valid_item_name(name):
	"""Return whether a Valentine's item name follows the naming rules."""
	words = name.split()
	if not words or not words[0].startswith("V"):
		return False
	if sum(character.lower() == "e" for character in name) < 2:
		return False
	if re.search(r"\d", name):
		return False

	for word in words:
		parts = word.split("-")
		if any(not re.fullmatch(r"[A-Za-z]+", part) for part in parts):
			return False
		if word.lower() in CONNECTION_WORDS:
			if word != word.lower():
				return False
		elif not parts[0][0].isupper() or any(part[0].islower() is False for part in parts[1:]):
			return False
	return True


class RestaurantMenu:
	def __init__(self, menu_file=MENU_FILE):
		self.menu_file = Path(menu_file)
		self.menu = self._load_menu()

	def _load_menu(self):
		if self.menu_file.exists():
			with open(self.menu_file, "r", encoding="utf-8") as menu_file:
				menu = json.load(menu_file)
		else:
			menu = {"regular_items": [], "valentines_items": []}
		menu.setdefault("valentines_items", [])
		return menu

	def add_valentines_item(self, name, price):
		if not valid_item_name(name):
			raise ValueError("The item name does not follow the Valentine's rules.")
		if not PRICE_PATTERN.fullmatch(price):
			raise ValueError("The price must match XX,14, such as 12,14.")
		self.menu["valentines_items"].append({"name": name, "price": price})
		self.save()

	def save(self):
		with open(self.menu_file, "w", encoding="utf-8") as menu_file:
			json.dump(self.menu, menu_file, indent=4)

	def display(self):
		print("\n".join(("  *  ", " *** ", "*****", " *** ", "  *  ")))
		for category, items in self.menu.items():
			print(f"\n{category.replace('_', ' ').title()}:")
			for item in items:
				print(f"- {item['name']}: {item['price']}")


class Character:
	ABILITIES = (
		"strength",
		"dexterity",
		"constitution",
		"intelligence",
		"wisdom",
		"charisma",
	)

	def __init__(self, name, age):
		self.name = name
		self.age = age
		self.attributes = {ability: self.roll_attribute() for ability in self.ABILITIES}

	@staticmethod
	def roll_attribute():
		dice_rolls = [random.randint(1, 6) for _ in range(4)]
		return sum(sorted(dice_rolls)[1:])

	def to_dict(self):
		return {"name": self.name, "age": self.age, "attributes": self.attributes}


class Game:
	def __init__(self):
		self.characters = []

	def create_characters(self, player_count):
		for player_number in range(1, player_count + 1):
			name = input(f"Player {player_number} character name: ").strip()
			age = input(f"Player {player_number} character age: ").strip()
			self.characters.append(Character(name, age))

	def export(self, json_file=CHARACTERS_JSON_FILE, text_file=CHARACTERS_TXT_FILE):
		character_data = [character.to_dict() for character in self.characters]
		with open(json_file, "w", encoding="utf-8") as output_file:
			json.dump(character_data, output_file, indent=4)

		with open(text_file, "w", encoding="utf-8") as output_file:
			for character in character_data:
				output_file.write(f"{character['name']} (age {character['age']})\n")
				for ability, score in character["attributes"].items():
					output_file.write(f"  {ability.title()}: {score}\n")
				output_file.write("\n")


def run_restaurant_exercise():
	menu = RestaurantMenu()
	name = input("Valentine's item name: ").strip()
	price = input("Price (XX,14): ").strip()
	try:
		menu.add_valentines_item(name, price)
	except ValueError as error:
		print(f"Invalid item: {error}")
		return
	menu.display()


def run_dungeons_and_dragons():
	try:
		player_count = int(input("How many players are playing? "))
		if player_count < 1:
			raise ValueError
	except ValueError:
		print("Please enter a positive whole number of players.")
		return

	game = Game()
	game.create_characters(player_count)
	game.export()
	print("Characters saved to characters.json and characters.txt.")


def main():
	choice = input("Choose an exercise: 1 for Restaurant Menu, 2 for D&D: ").strip()
	if choice == "1":
		run_restaurant_exercise()
	elif choice == "2":
		run_dungeons_and_dragons()
	else:
		print("Please choose 1 or 2.")


if __name__ == "__main__":
	main()
