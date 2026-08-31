import random


QUIZ_ANSWERS = {
	"What is a class?": "A blueprint that defines the data and behavior of objects.",
	"What is an instance?": "A concrete object created from a class.",
	"What is encapsulation?": "Bundling data and methods together while controlling access to them.",
	"What is abstraction?": "Hiding implementation details and exposing only essential features.",
	"What is inheritance?": "A class receiving attributes and methods from another class.",
	"What is multiple inheritance?": "A class inheriting from more than one parent class.",
	"What is polymorphism?": "Different object types responding to the same method interface in their own way.",
	"What is method resolution order or MRO?": "The order Python follows to find methods in a class hierarchy.",
}


class Card:
	SUITS = ("Hearts", "Diamonds", "Clubs", "Spades")
	VALUES = ("A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K")

	def __init__(self, suit, value):
		if suit not in self.SUITS or value not in self.VALUES:
			raise ValueError("Invalid card suit or value.")
		self.suit = suit
		self.value = value

	def __str__(self):
		return f"{self.value} of {self.suit}"


class Deck:
	def __init__(self):
		self.cards = [
			Card(suit, value)
			for suit in Card.SUITS
			for value in Card.VALUES
		]

	def shuffle(self):
		if len(self.cards) != 52:
			raise ValueError("A full deck must contain all 52 cards before shuffling.")
		random.shuffle(self.cards)

	def deal(self):
		if not self.cards:
			raise IndexError("Cannot deal from an empty deck.")
		return self.cards.pop()


def print_quiz_answers():
	for question, answer in QUIZ_ANSWERS.items():
		print(f"{question}\n{answer}\n")


def main():
	print_quiz_answers()
	deck = Deck()
	deck.shuffle()
	print(f"Deck contains {len(deck.cards)} cards after shuffling.")
	print(f"Dealt card: {deck.deal()}")
	print(f"Cards remaining: {len(deck.cards)}")


if __name__ == "__main__":
	main()
