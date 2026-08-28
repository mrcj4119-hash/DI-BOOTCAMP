import json
from pathlib import Path


MENU_FILE = Path(__file__).with_name("restaurant_menu.json")


class MenuManager:
	def __init__(self, menu_file=MENU_FILE):
		self.menu_file = Path(menu_file)
		with open(self.menu_file, "r", encoding="utf-8") as file:
			self.menu = json.load(file)

	def add_item(self, name, price):
		self.menu["items"].append({"name": name, "price": price})

	def remove_item(self, name):
		for index, item in enumerate(self.menu["items"]):
			if item["name"].lower() == name.lower():
				del self.menu["items"][index]
				return True
		return False

	def save_to_file(self):
		with open(self.menu_file, "w", encoding="utf-8") as file:
			json.dump(self.menu, file, indent=4)