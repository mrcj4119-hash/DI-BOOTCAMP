import random


class Game:
	ITEMS = ("rock", "paper", "scissors")

	def get_user_item(self):
		while True:
			item = input("Choose rock, paper, or scissors: ").strip().lower()
			if item in self.ITEMS:
				return item
			print("Invalid choice. Please choose rock, paper, or scissors.")

	def get_computer_item(self):
		return random.choice(self.ITEMS)

	def get_game_result(self, user_item, computer_item):
		if user_item == computer_item:
			return "draw"
		if (
			(user_item == "rock" and computer_item == "scissors")
			or (user_item == "paper" and computer_item == "rock")
			or (user_item == "scissors" and computer_item == "paper")
		):
			return "win"
		return "loss"

	def play(self):
		user_item = self.get_user_item()
		computer_item = self.get_computer_item()
		result = self.get_game_result(user_item, computer_item)
		print(f"You chose {user_item}; the computer chose {computer_item}.")
		print(f"Result: {result}.")
		return result