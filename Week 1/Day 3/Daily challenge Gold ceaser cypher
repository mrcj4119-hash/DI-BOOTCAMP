def caesar_cipher(text, shift):
	result = ""

	for character in text:
		if character.isupper():
			result += chr((ord(character) - ord("A") + shift) % 26 + ord("A"))
		elif character.islower():
			result += chr((ord(character) - ord("a") + shift) % 26 + ord("a"))
		else:
			result += character

	return result


action = input("Do you want to encrypt or decrypt? ").strip().lower()
message = input("Enter your message: ")
shift = int(input("Enter the shift: "))

if action == "decrypt":
	shift = -shift
elif action != "encrypt":
	print("Please choose encrypt or decrypt.")
else:
	print(f"Result: {caesar_cipher(message, shift)}")

if action == "decrypt":
	print(f"Result: {caesar_cipher(message, shift)}")
