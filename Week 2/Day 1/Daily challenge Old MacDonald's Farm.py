class Farm:
    def __init__(self, farm_name):
        self.name = farm_name
        self.animals = {}

    def add_animal(self, animal_type=None, count=1, **kwargs):
        if animal_type is not None:
            self.animals[animal_type] = (
                self.animals.get(animal_type, 0) + count
            )

        for animal, quantity in kwargs.items():
            self.animals[animal] = self.animals.get(animal, 0) + quantity

    def get_info(self):
        animal_info = "\n".join(
            f"{animal:<6}: {count}"
            for animal, count in self.animals.items()
        )

        return (
            f"{self.name}'s farm\n\n"
            f"{animal_info}\n\n"
            f"    E-I-E-I-0!"
        )

    def get_animal_types(self):
        return sorted(self.animals.keys())

    def get_short_info(self):
        animal_names = []

        for animal in self.get_animal_types():
            count = self.animals[animal]
            plural = "s" if count > 1 else ""
            animal_names.append(f"{animal}{plural}")

        if len(animal_names) == 1:
            animals = animal_names[0]
        elif len(animal_names) == 2:
            animals = " and ".join(animal_names)
        else:
            animals = ", ".join(animal_names[:-1])
            animals += f" and {animal_names[-1]}"

        return f"{self.name}'s farm has {animals}."


macdonald = Farm("McDonald")

macdonald.add_animal("cow", 5)
macdonald.add_animal("sheep")
macdonald.add_animal("sheep")
macdonald.add_animal("goat", 12)

print(macdonald.get_info())
print(macdonald.get_animal_types())
print(macdonald.get_short_info())

macdonald.add_animal(cow=5, sheep=2, goat=12)