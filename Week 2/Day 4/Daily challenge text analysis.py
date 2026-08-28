import re
import string
from collections import Counter


STOP_WORDS = {
	"a", "an", "and", "are", "as", "at", "be", "but", "by", "for",
	"from", "has", "he", "in", "is", "it", "its", "of", "on", "or",
	"that", "the", "this", "to", "was", "were", "will", "with", "you",
}


class Text:
	def __init__(self, text):
		self.text = text

	def _words(self):
		return re.findall(r"[A-Za-z0-9']+", self.text.lower())

	def word_frequency(self, word):
		frequency = self._words().count(word.lower())
		return frequency or None

	def most_common_word(self):
		words = self._words()
		if not words:
			return None
		return Counter(words).most_common(1)[0][0]

	def unique_words(self):
		return list(set(self._words()))

	@classmethod
	def from_file(cls, file_path):
		with open(file_path, "r", encoding="utf-8") as file:
			return cls(file.read())


class TextModification(Text):
	def remove_punctuation(self):
		self.text = self.text.translate(str.maketrans("", "", string.punctuation))
		return self.text

	def remove_stop_words(self):
		words = self.text.split()
		self.text = " ".join(
			word for word in words if word.lower().strip(string.punctuation) not in STOP_WORDS
		)
		return self.text

	def remove_special_characters(self):
		self.text = re.sub(r"[^A-Za-z0-9\s]", "", self.text)
		return self.text
