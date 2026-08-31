from anagram_checker import AnagramChecker


def get_valid_word():
	while True:
		word = input("Enter a word: ").strip()
		if len(word.split()) != 1:
			print("Error: please enter only one word.")
		elif not word.isalpha():
			print("Error: please use alphabetic characters only.")
		else:
			return word


def show_word_results(word, checker):
	print(f'\nYOUR WORD: "{word.upper()}"')
	if checker.is_valid_word(word):
		print("This is a valid English word.")
	else:
		print("This is not a valid English word.")

	anagrams = checker.get_anagrams(word)
	if anagrams:
		print(f"Anagrams for your word: {', '.join(anagrams)}.")
	else:
		print("No anagrams found.")


def show_menu():
	checker = AnagramChecker()
	while True:
		print("\nAnagram Checker")
		print("1. Enter a word")
		print("2. Exit")
		choice = input("Choose an option: ").strip()
		if choice == "1":
			show_word_results(get_valid_word(), checker)
		elif choice == "2":
			print("Goodbye!")
			return
		else:
			print("Error: please choose 1 or 2.")


if __name__ == "__main__":
	show_menu()