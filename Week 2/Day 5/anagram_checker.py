from pathlib import Path


WORD_LIST_FILE = Path(__file__).with_name("sowpods.txt")


class AnagramChecker:
	def __init__(self, word_list_file=WORD_LIST_FILE):
		with open(word_list_file, "r", encoding="utf-8") as file:
			self.words = {line.strip().lower() for line in file if line.strip()}

	def is_valid_word(self, word):
		return word.strip().lower() in self.words

	@staticmethod
	def is_anagram(word1, word2):
		first = word1.strip().lower()
		second = word2.strip().lower()
		return first != second and sorted(first) == sorted(second)

	def get_anagrams(self, word):
		word = word.strip().lower()
		return sorted(
			candidate for candidate in self.words
			if self.is_anagram(word, candidate)
		)