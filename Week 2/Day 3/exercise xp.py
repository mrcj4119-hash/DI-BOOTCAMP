
class Currency:
    def __init__(self, currency, amount):
        self.currency = currency
        self.amount = amount

    def __str__(self):
        return f"{self.amount} {self.currency}s"

    def __repr__(self):
        return str(self)

    def __int__(self):
        return self.amount

    def __add__(self, other):
        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(
                    f"Cannot add between Currency type "
                    f"<{self.currency}> and <{other.currency}>"
                )
            return self.amount + other.amount

        if isinstance(other, int):
            return self.amount + other

        raise TypeError("Can only add integers or Currency objects")

    def __iadd__(self, other):
        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(
                    f"Cannot add between Currency type "
                    f"<{self.currency}> and <{other.currency}>"
                )
            self.amount += other.amount
        elif isinstance(other, int):
            self.amount += other
        else:
            raise TypeError("Can only add integers or Currency objects")

        return self


c1 = Currency("dollar", 5)
c2 = Currency("dollar", 10)
c3 = Currency("shekel", 1)

print(c1)
print(int(c1))
print(repr(c1))
print(c1 + 5)
print(c1 + c2)

c1 += 5
print(c1)

c1 += c2
print(c1)

def sum_numbers(number1, number2):
    result = number1 + number2
    print(result)


import random
import string

random_string = "".join(
    random.choice(string.ascii_letters) for _ in range(5)
)

print(random_string)



from datetime import datetime, date


def display_current_date():
    print(date.today())


display_current_date()


def time_until_new_year():
    now = datetime.now()
    next_year = datetime(now.year + 1, 1, 1)
    difference = next_year - now
    print(difference)


time_until_new_year()


def minutes_lived(birthdate):
    birth_date = datetime.strptime(birthdate, "%Y-%m-%d")
    difference = datetime.now() - birth_date
    minutes = int(difference.total_seconds() // 60)
    print(f"You have lived approximately {minutes:,} minutes.")


minutes_lived("2000-01-01")


from faker import Faker

fake = Faker()
users = []


def add_users(number):
    for _ in range(number):
        users.append({
            "name": fake.name(),
            "address": fake.address(),
            "language_code": fake.language_code()
        })


add_users(5)
print(users)