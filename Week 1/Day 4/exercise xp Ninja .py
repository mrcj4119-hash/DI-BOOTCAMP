
def get_full_name(first_name, last_name, middle_name=None):
	name_parts = [first_name, middle_name, last_name] if middle_name else [first_name, last_name]
	return " ".join(part.capitalize() for part in name_parts)


print(get_full_name(first_name="john", middle_name="hooker", last_name="lee"))
print(get_full_name(first_name="bruce", last_name="lee"))

MORSE_CODE = {
	"A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".",
	"F": "..-.", "G": "--.", "H": "....", "I": "..", "J": ".---",
	"K": "-.-", "L": ".-..", "M": "--", "N": "-.", "O": "---",
	"P": ".--.", "Q": "--.-", "R": ".-.", "S": "...", "T": "-",
	"U": "..-", "V": "...-", "W": ".--", "X": "-..-", "Y": "-.--",
	"Z": "--..",
	"0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
	"5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
}
MORSE_TO_TEXT = {code: character for character, code in MORSE_CODE.items()}


def text_to_morse(text):
	words = text.upper().split()
	return " / ".join(
		" ".join(MORSE_CODE[character] for character in word if character in MORSE_CODE)
		for word in words
	)


def morse_to_text(morse):
	words = morse.split(" /")
	return " ".join(
		"".join(MORSE_TO_TEXT[code] for code in word.strip().split())
		for word in words
	)


encoded_message = text_to_morse("Hello World")
print(encoded_message)
print(morse_to_text(encoded_message))


def box_printer(*words):
	width = max(map(len, words))
	border = "*" * (width + 4)
	print(border)
	for word in words:
		print(f"* {word.ljust(width)} *")
	print(border)


box_printer("Hello", "World", "in", "reallylongword", "a", "frame")


def insertion_sort(alist):
	for index in range(1, len(alist)):
		current_value = alist[index]
		position = index

		while position > 0 and alist[position - 1] > current_value:
			alist[position] = alist[position - 1]
			position -= 1

		alist[position] = current_value


alist = [54, 26, 93, 17, 77, 31, 44, 55, 20]
insertion_sort(alist)
print(alist)
print("The code sorts a list of numbers in ascending order using insertion sort.")
