import json
import random
from pathlib import Path


WORDS_FILE = Path(__file__).resolve().parents[2] / "words.txt"
JSON_OUTPUT_FILE = Path(__file__).with_name("modified_employee.json")


def get_words_from_file(file_path):
	"""Read and return the non-empty words from a text file."""
	with open(file_path, "r", encoding="utf-8") as words_file:
		return words_file.read().split()


def get_random_sentence(length):
	"""Generate a lowercase sentence containing the requested number of words."""
	words = get_words_from_file(WORDS_FILE)
	selected_words = [random.choice(words) for _ in range(length)]
	return " ".join(selected_words).lower()


def save_employee_json(output_path=JSON_OUTPUT_FILE):
	"""Print the salary, add a birth date, and save the updated employee data."""
	sample_json = """{
		"company": {
			"employee": {
				"name": "emma",
				"payable": {
					"salary": 7000,
					"bonus": 800
				}
			}
		}
	}"""

	data = json.loads(sample_json)
	salary = data["company"]["employee"]["payable"]["salary"]
	print(f"Employee salary: {salary}")

	data["company"]["employee"]["birth_date"] = "1990-05-15"
	with open(output_path, "w", encoding="utf-8") as json_file:
		json.dump(data, json_file, indent=4)


def main():
	print("This program generates a random sentence from a word list.")
	try:
		length = int(input("How many words should the sentence contain (2-20)? "))
	except ValueError:
		print("Error: please enter an integer.")
		return

	if not 2 <= length <= 20:
		print("Error: the sentence length must be between 2 and 20.")
		return

	print(get_random_sentence(length))
	save_employee_json()


if __name__ == "__main__":
	main()
