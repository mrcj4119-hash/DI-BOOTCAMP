import math

def insert_at_index(items, item, index):
	items.insert(index, item)
	return items

def count_spaces(text):
	spaces = 0
	for character in text:
		if character == " ":
			spaces += 1
	return spaces

def count_case(text):
	uppercase = 0
	lowercase = 0

	for character in text:
		if character.isupper():
			uppercase += 1
		elif character.islower():
			lowercase += 1

	return uppercase, lowercase

def my_sum(numbers):
	total = 0
	for number in numbers:
		total += number
	return total

def find_max(numbers):
	if not numbers:
		raise ValueError("find_max() requires at least one number")

	maximum = numbers[0]
	for number in numbers[1:]:
		if number > maximum:
			maximum = number
	return maximum

def factorial(number):
	if number < 0:
		raise ValueError("factorial() is not defined for negative numbers")

	result = 1
	for value in range(2, number + 1):
		result *= value
	return result

def list_count(items, element):
	occurrences = 0
	for item in items:
		if item == element:
			occurrences += 1
	return occurrences


def norm(numbers):
	sum_of_squares = 0
	for number in numbers:
		sum_of_squares += number ** 2
	return math.sqrt(sum_of_squares)

def is_mono(numbers):
	ascending = all(numbers[index] <= numbers[index + 1] for index in range(len(numbers) - 1))
	descending = all(numbers[index] >= numbers[index + 1] for index in range(len(numbers) - 1))
	return ascending or descending


def print_longest_word(words):
	if not words:
		return ""

	longest = words[0]
	for word in words[1:]:
		if len(word) > len(longest):
			longest = word
	print(longest)
	return longest


def separate_integers_and_strings(items):
	integers = []
	strings = []

	for item in items:
		if type(item) is int:
			integers.append(item)
		elif type(item) is str:
			strings.append(item)

	return integers, strings

def is_palindrome(text):
	return text == text[::-1]


def sum_over_k(sentence, k):
	words_over_k = 0
	for word in sentence.split():
		if len(word) > k:
			words_over_k += 1
	return words_over_k


def dict_avg(values):
	if not values:
		raise ValueError("dict_avg() requires at least one value")
	return sum(values.values()) / len(values)


def common_div(number_one, number_two):
	common_divisors = []
	limit = min(abs(number_one), abs(number_two))

	for divisor in range(1, limit + 1):
		if number_one % divisor == 0 and number_two % divisor == 0:
			common_divisors.append(divisor)
	return common_divisors


def is_prime(number):
	if number < 2:
		return False

	divisor = 2
	while divisor * divisor <= number:
		if number % divisor == 0:
			return False
		divisor += 1
	return True

def weird_print(items):
	result = []
	for index, value in enumerate(items):
		if index % 2 == 0 and value % 2 == 0:
			result.append(value)
	print(result)
	return result


def type_count(**kwargs):
	counts = {int: 0, str: 0, float: 0, bool: 0}
	for value in kwargs.values():
		value_type = type(value)
		if value_type in counts:
			counts[value_type] += 1

	return ", ".join(
		f"{value_type.__name__}: {counts[value_type]}"
		for value_type in (int, str, float, bool)
	)


def custom_split(text, separator=None):
	if separator is not None and separator == "":
		raise ValueError("empty separator")

	parts = []
	current = ""

	if separator is None:
		separators = {" ", "\t", "\n", "\r", "\f", "\v"}
		for character in text:
			if character in separators:
				if current:
					parts.append(current)
					current = ""
			else:
				current += character
		if current:
			parts.append(current)
		return parts

	for character in text:
		if character == separator:
			parts.append(current)
			current = ""
		else:
			current += character
	parts.append(current)
	return parts


def password_format(password):
	return "*" * len(password)


if __name__ == "__main__":
	print(insert_at_index([1, 2, 4], 3, 2))
	print(count_spaces("hello world from Python"))
	print(count_case("Hello World!"))
	print(my_sum([1, 5, 4, 2]))
	print(find_max([0, 1, 3, 50]))
	print(factorial(4))
	print(list_count(["a", "a", "t", "o"], "a"))
	print(norm([1, 2, 2]))
	print(is_mono([7, 6, 5, 5, 2, 0]))
	print_longest_word(["short", "longest", "medium"])
	print(separate_integers_and_strings([1, "two", 3, "four"]))
	print(is_palindrome("radar"))
	print(sum_over_k("Do or do not there is no try", 2))
	print(dict_avg({"a": 1, "b": 2, "c": 8, "d": 1}))
	print(common_div(10, 20))
	print(is_prime(11))
	weird_print([1, 2, 2, 3, 4, 5])
	print(type_count(a=1, b="string", c=1.0, d=True, e=False))
	print(custom_split("one,two,three", ","))
	print(password_format("mypassword"))
