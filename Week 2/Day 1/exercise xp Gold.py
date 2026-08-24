import math
import random

class Circle:
    def __init__(self, radius=1.0):
        self.radius = radius

    def perimeter(self):
        return 2 * math.pi * self.radius

    def area(self):
        return math.pi * self.radius ** 2

    def definition(self):
        print(
            "A circle is a geometrical shape where every point "
            "is the same distance from the center."
        )


circle = Circle(5)
print(f"Perimeter: {circle.perimeter():.2f}")
print(f"Area: {circle.area():.2f}")
circle.definition()


class MyList:
    def __init__(self, letters):
        self.letters = letters

    def reversed_list(self):
        return self.letters[::-1]

    def sorted_list(self):
        return sorted(self.letters)

    def random_list(self):
        return [random.randint(1, 100) for _ in self.letters]


mylist = MyList(["d", "a", "c", "b"])

print(mylist.reversed_list())
print(mylist.sorted_list())
print(mylist.random_list())


class MenuManager:
    def __init__(self):
        self.menu = [
            {"name": "Soup", "price": 10, "spice": "B", "gluten": False},
            {"name": "Hamburger", "price": 15, "spice": "A", "gluten": True},
            {"name": "Salad", "price": 18, "spice": "A", "gluten": False},
            {"name": "French Fries", "price": 5, "spice": "C", "gluten": False},
            {
                "name": "Beef bourguignon",
                "price": 25,
                "spice": "B",
                "gluten": True
            }
        ]

    def add_item(self, name, price, spice, gluten):
        self.menu.append({
            "name": name,
            "price": price,
            "spice": spice,
            "gluten": gluten
        })

    def update_item(self, name, price, spice, gluten):
        for item in self.menu:
            if item["name"] == name:
                item.update({
                    "price": price,
                    "spice": spice,
                    "gluten": gluten
                })
                return

        print(f"{name} is not on the menu.")

    def remove_item(self, name):
        for item in self.menu:
            if item["name"] == name:
                self.menu.remove(item)
                print(self.menu)
                return

        print(f"{name} is not on the menu.")


menu_manager = MenuManager()

menu_manager.add_item("Pizza", 20, "A", True)
menu_manager.update_item("Soup", 12, "A", False)
menu_manager.remove_item("French Fries")

print(menu_manager.menu)