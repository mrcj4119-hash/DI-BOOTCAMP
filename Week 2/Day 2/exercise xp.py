import random

class Pets:
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())


class Cat:
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f"{self.name} is just walking around"


class Bengal(Cat):
    pass


class Chartreux(Cat):
    pass


class Siamese(Cat):
    pass


bengal = Bengal("Leo", 3)
chartreux = Chartreux("Milo", 4)
siamese = Siamese("Luna", 2)

all_cats = [bengal, chartreux, siamese]
sara_pets = Pets(all_cats)
sara_pets.walk()


class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f"{self.name} is barking"

    def run_speed(self):
        return self.weight / self.age * 10

    def fight(self, other_dog):
        my_power = self.run_speed() * self.weight
        other_power = other_dog.run_speed() * other_dog.weight

        if my_power > other_power:
            return f"{self.name} won the fight"
        elif other_power > my_power:
            return f"{other_dog.name} won the fight"
        return "It's a tie"


dog1 = Dog("Max", 3, 20)
dog2 = Dog("Buddy", 5, 25)
dog3 = Dog("Rocky", 2, 15)

print(dog1.bark())
print(dog2.run_speed())
print(dog1.fight(dog2))


class PetDog(Dog):
    def __init__(self, name, age, weight):
        super().__init__(name, age, weight)
        self.trained = False

    def train(self):
        print(self.bark())
        self.trained = True

    def play(self, *args):
        names = [dog.name if hasattr(dog, "name") else str(dog) for dog in args]
        print(f"{', '.join(names)} all play together")

    def do_a_trick(self):
        if self.trained:
            tricks = [
                "does a barrel roll",
                "stands on his back legs",
                "shakes your hand",
                "plays dead",
            ]
            print(f"{self.name} {random.choice(tricks)}")


pet1 = PetDog("Fido", 2, 10)
pet2 = PetDog("Buddy", 3, 15)

pet1.train()
pet1.play(pet1, pet2)
pet1.do_a_trick()


class Person:
    def __init__(self, first_name, age):
        self.first_name = first_name
        self.age = age
        self.last_name = ""

    def is_18(self):
        return self.age >= 18


class Family:
    def __init__(self, last_name):
        self.last_name = last_name
        self.members = []

    def born(self, first_name, age):
        person = Person(first_name, age)
        person.last_name = self.last_name
        self.members.append(person)

    def check_majority(self, first_name):
        for member in self.members:
            if member.first_name == first_name:
                if member.is_18():
                    print(
                        "You are over 18, your parents Jane and John "
                        "accept that you will go out with your friends"
                    )
                else:
                    print("Sorry, you are not allowed to go out with your friends.")
                return

        print(f"{first_name} was not found in the family.")

    def family_presentation(self):
        print(f"Family name: {self.last_name}")
        for member in self.members:
            print(f"{member.first_name}, {member.age} years old")


family = Family("Smith")
family.born("John", 45)
family.born("Jane", 43)
family.born("Alex", 20)
family.born("Sam", 15)

family.check_majority("Alex")
family.check_majority("Sam")
family.family_presentation()