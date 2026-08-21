def centered_triangle():
	for row in range(3):
		spaces = " " * (2 - row)
		stars = "*" * (2 * row + 1)
		print(spaces + stars)


def right_aligned_triangle():
	for row in range(1, 6):
		spaces = " " * (5 - row)
		print(spaces + "*" * row)


def diamond():
	for row in range(1, 6):
		print("*" * row)

	for row in range(4, 0, -1):
		spaces = " " * (5 - row)
		print(spaces + "*" * row)


def analyze_sorting_code():
	# Start with the original list.
	my_list = [2, 24, 12, 354, 233]

	# i takes the values 0, 1, 2, and 3.
	# Each pass places a small value near the beginning of the list.
	for i in range(len(my_list) - 1):
		# Assume the value at index i is the smallest remaining value.
		minimum = i

		# Compare it with every value to its right.
		for j in range(i + 1, len(my_list)):
			# If a smaller value is found, remember its index.
			if my_list[j] < my_list[minimum]:
				minimum = j

				# Swap the values when the smaller index is different.
				if minimum != i:
					my_list[i], my_list[minimum] = my_list[minimum], my_list[i]

		# Variable changes for this input:
		# i=0: minimum stays 0; list is unchanged.
		# i=1: minimum changes 1 -> 2; list becomes [2, 12, 24, 354, 233].
		# i=2: minimum stays 2; list is unchanged.
		# i=3: minimum changes 3 -> 4; list becomes [2, 12, 24, 233, 354].

	# Final output: [2, 12, 24, 233, 354]
	print(my_list)


if __name__ == "__main__":
	print("Pattern 1:")
	centered_triangle()

	print("\nPattern 2:")
	right_aligned_triangle()

	print("\nPattern 3:")
	diamond()

	print("\nAnalysis output:")
	analyze_sorting_code()
