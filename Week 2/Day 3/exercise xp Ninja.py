from abc import ABC, abstractmethod
import random


class Temperature(ABC):
    def __init__(self, value):
        self.value = float(value)

    @abstractmethod
    def to_kelvin(self):
        """Convert the temperature to Kelvin."""

    def to_celsius(self):
        return self.to_kelvin() - 273.15

    def to_fahrenheit(self):
        return self.to_kelvin() * 9 / 5 - 459.67

    def __repr__(self):
        return f"{self.__class__.__name__}({self.value:.2f})"


class Celsius(Temperature):
    def to_kelvin(self):
        return self.value + 273.15


class Kelvin(Temperature):
    def to_kelvin(self):
        return self.value


class Fahrenheit(Temperature):
    def to_kelvin(self):
        return (self.value + 459.67) * 5 / 9


temperature = Celsius(25)
print(temperature.to_kelvin())
print(temperature.to_fahrenheit())

temperature = Fahrenheit(77)
print(temperature.to_celsius())


class QuantumParticle:
    def __init__(self, x=0, y=0.0, p=None):
        self._position = x
        self._momentum = y
        self._spin = p if p in (0.5, -0.5) else random.choice((0.5, -0.5))
        self._entangled_particle = None

    def _disturb(self):
        self._position = random.randint(1, 10_000)
        self._momentum = random.random()
        print("Quantum Interferences!!")

    def position(self):
        self._position = random.randint(1, 10_000)
        self._disturb()
        return self._position

    def momentum(self):
        self._momentum = random.random()
        self._disturb()
        return self._momentum

    def spin(self):
        self._spin = random.choice((0.5, -0.5))

        if self._entangled_particle is not None:
            self._entangled_particle._spin = -self._spin

        self._disturb()
        return self._spin

    def entangle(self, particle):
        if not isinstance(particle, QuantumParticle):
            raise TypeError("A particle can only be entangled with another QuantumParticle.")

        if particle is self:
            raise ValueError("A particle cannot be entangled with itself.")

        self._entangled_particle = particle
        particle._entangled_particle = self
        print("Spooky Action at a Distance !!")

    def __repr__(self):
        return (
            f"QuantumParticle("
            f"position={self._position}, "
            f"momentum={self._momentum:.4f}, "
            f"spin={self._spin})"
        )


p1 = QuantumParticle(x=1, y=5.0)
p2 = QuantumParticle(x=2, y=5.0)

p1.entangle(p2)
print(p1)
print(p2)

print("Measured spin:", p1.spin())
print("Opposite spin:", p2._spin)