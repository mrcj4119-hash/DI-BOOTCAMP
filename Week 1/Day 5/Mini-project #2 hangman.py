import random


wordslist = [
	"correction",
	"childish",
	"beach",
	"python",
	"assertive",
	"interference",
	"complete",
	"peris",
	"credit card",
	"rush",
	"south",
	"chacha",
]


def display_gallows(mistakes):
	body_parts = [
		"  O",
		"  O\n  |",
		"  O\n /|",
		"  O\n /|\\",
		"  O\n /|\\\n /",
		"  O\n /|\\\n / \\",
	]

	print("\n  +---+")
	print("  |   |")
	if mistakes:
		print(f"  |{body_parts[mistakes - 1]}")
	else:
		print("  |")
	print("  |")
	print(" _|_      ")
	print()


def display_word(word, guessed_letters):
	return " ".join(
		character if character == " " or character in guessed_letters else "*"
		for character in word
	)


def play():
	word = random.choice(wordslist)
	guessed_letters = set()
	mistakes = 0

	print("Welcome to Hangman!")

	while mistakes < 6:
		display_gallows(mistakes)
		print(f"Word: {display_word(word, guessed_letters)}")
		print(f"Guessed letters: {', '.join(sorted(guessed_letters)) or 'none'}")

		guess = input("Guess a letter: ").strip().lower()

		if len(guess) != 1 or not guess.isalpha():
			print("Please enter one letter.")
			continue

		if guess in guessed_letters:
			print("You already guessed that letter.")
			continue

		guessed_letters.add(guess)

		if guess in word:
			print("Correct!")
		else:
			mistakes += 1
			print("That letter is not in the word.")

		if all(
			character == " " or character in guessed_letters
			for character in word
		):
			display_gallows(mistakes)
			print(f"Word: {display_word(word, guessed_letters)}")
			print("You solved it!")
			return

	display_gallows(mistakes)
	print(f"You lost. The word was: {word}")


if __name__ == "__main__":
	play()
