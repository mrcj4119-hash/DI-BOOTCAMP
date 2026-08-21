import random


list_of_numbers = [random.randint(0, 10000) for _ in range(20000)]
target_number = 3728


def find_pairs(numbers, target):
	seen_numbers = set()
	pairs = set()

	for number in numbers:
		complement = target - number

		if complement in seen_numbers:
			pairs.add(tuple(sorted((number, complement))))

		seen_numbers.add(number)

	return sorted(pairs)


for first_number, second_number in find_pairs(list_of_numbers, target_number):
	print(
		f"{first_number} and {second_number} sums to the target_number "
		f"{target_number}"
	)
