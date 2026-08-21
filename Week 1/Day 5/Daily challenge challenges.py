words = input()
sorted_words = sorted(words.split(","))
print(",".join(sorted_words))


def longest_word(sentence):
	words = sentence.split()
	longest = ""

	for word in words:
		if len(word) > len(longest):
			longest = word

	return longest
