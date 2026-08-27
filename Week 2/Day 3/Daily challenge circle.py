from functools import total_ordering
from math import pi


@total_ordering
class Circle:
    def __init__(self, radius):
        if radius < 0:
            raise ValueError("Radius cannot be negative.")

        self.radius = float(radius)

    @classmethod
    def from_diameter(cls, diameter):
        """Create a circle using its diameter."""
        if diameter < 0:
            raise ValueError("Diameter cannot be negative.")

        return cls(diameter / 2)

    @property
    def diameter(self):
        return self.radius * 2

    @property
    def area(self):
        return pi * self.radius ** 2

    def __str__(self):
        return (
            f"Circle(radius={self.radius:.2f}, "
            f"diameter={self.diameter:.2f}, "
            f"area={self.area:.2f})"
        )

    def __repr__(self):
        return f"Circle(radius={self.radius!r})"

    def __add__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented

        return Circle(self.radius + other.radius)

    def __gt__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented

        return self.radius > other.radius

    def __eq__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented

        return self.radius == other.radius

    def __lt__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented

        return self.radius < other.radius


circle1 = Circle(5)
circle2 = Circle.from_diameter(20)
circle3 = Circle(3)

print(circle1)
print(circle2)

circle4 = circle1 + circle3
print("Added:", circle4)

print("circle1 bigger than circle2:", circle1 > circle2)
print("circle1 equal to circle2:", circle1 == circle2)

circles = [circle1, circle2, circle3, circle4]
circles.sort()

print("Sorted circles:")
for circle in circles:
    print(circle)