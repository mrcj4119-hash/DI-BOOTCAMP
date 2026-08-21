number = int(input("Enter a number: "))
length = int(input("Enter the length: "))

multiples = []
for multiplier in range(1, length + 1):
	multiples.append(number * multiplier)

print(multiples)

user_string = input("Enter a string: ")

unique_consecutive_letters = ""
for character in user_string:
	if not unique_consecutive_letters or character != unique_consecutive_letters[-1]:
		unique_consecutive_letters += character

print(unique_consecutive_letters)
