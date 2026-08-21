manufacturers_text = "Volkswagen, Toyota, Ford Motor, Honda, Chevrolet"
manufacturers = manufacturers_text.split(", ")

print(f"There are {len(manufacturers)} manufacturers in the list.")
print("Manufacturers in descending order:")
print(sorted(manufacturers, reverse=True))

manufacturers_with_o = [
	manufacturer for manufacturer in manufacturers if "o" in manufacturer.lower()
]
manufacturers_without_i = [
	manufacturer for manufacturer in manufacturers if "i" not in manufacturer.lower()
]

print(f"Manufacturers with the letter 'o': {len(manufacturers_with_o)}")
print(f"Manufacturers without the letter 'i': {len(manufacturers_without_i)}")


duplicate_manufacturers = [
	"Honda",
	"Volkswagen",
	"Toyota",
	"Ford Motor",
	"Honda",
	"Chevrolet",
	"Toyota",
]

unique_manufacturers = list(dict.fromkeys(duplicate_manufacturers))
print("Companies without duplicates:", ", ".join(unique_manufacturers))
print(f"There are now {len(unique_manufacturers)} companies in the list.")

reversed_names = [
	manufacturer[::-1] for manufacturer in sorted(unique_manufacturers)
]
print("Manufacturers in ascending order with reversed names:")
print(reversed_names)
