import re
import secrets
import string
from datetime import date, datetime
import holidays

def upcoming_holiday():
    today = date.today()
    calendar = holidays.US(years=[today.year, today.year + 1])

    upcoming = [
        (holiday_date, name)
        for holiday_date, name in calendar.items()
        if holiday_date > today
    ]

    holiday_date, holiday_name = min(upcoming)
    days_left = (holiday_date - today).days

    print(f"Today's date: {today}")
    print(
        f"The next holiday is {holiday_name} "
        f"in {days_left} day(s), on {holiday_date}."
    )


def planet_ages(age_in_seconds):
    earth_year = 31_557_600

    orbital_periods = {
        "Earth": 1,
        "Mercury": 0.2408467,
        "Venus": 0.61519726,
        "Mars": 1.8808158,
        "Jupiter": 11.862615,
        "Saturn": 29.447498,
        "Uranus": 84.016846,
        "Neptune": 164.79132,
    }

    ages = {
        planet: age_in_seconds / earth_year / period
        for planet, period in orbital_periods.items()
    }

    for planet, age in ages.items():
        print(f"{planet}: {age:.2f} years")

    return ages


def return_numbers(text):
    return "".join(re.findall(r"\d", text))


def valid_full_name(name):
    pattern = r"^[A-Z][a-z]+ [A-Z][a-z]+$"
    return bool(re.fullmatch(pattern, name))


SPECIAL_CHARACTERS = "!@#$%^_&*"


def generate_password(length):
    if not 6 <= length <= 30:
        raise ValueError("Password length must be between 6 and 30.")

    required_characters = [
        secrets.choice(string.digits),
        secrets.choice(string.ascii_lowercase),
        secrets.choice(string.ascii_uppercase),
        secrets.choice(SPECIAL_CHARACTERS),
    ]

    all_characters = (
        string.digits
        + string.ascii_lowercase
        + string.ascii_uppercase
        + SPECIAL_CHARACTERS
    )

    password = required_characters + [
        secrets.choice(all_characters)
        for _ in range(length - len(required_characters))
    ]

    secrets.SystemRandom().shuffle(password)
    return "".join(password)


def test_password(password, expected_length):
    assert len(password) == expected_length
    assert any(character.isdigit() for character in password)
    assert any(character.islower() for character in password)
    assert any(character.isupper() for character in password)
    assert any(character in SPECIAL_CHARACTERS for character in password)


def test_password_generator():
    for _ in range(100):
        length = secrets.randbelow(25) + 6
        password = generate_password(length)
        test_password(password, length)

    print("All password tests passed.")


if __name__ == "__main__":
    upcoming_holiday()

    print("\nPlanet ages:")
    planet_ages(1_000_000_000)

    print("\nExtracted numbers:")
    print(return_numbers("k5k3q2g5z6x9bn"))

    name = input("\nEnter your full name: ")
    print("Valid name." if valid_full_name(name) else "Invalid name.")

    while True:
        try:
            password_length = int(
                input("\nEnter a password length between 6 and 30: ")
            )
            if 6 <= password_length <= 30:
                break
            print("Please enter a number between 6 and 30.")
        except ValueError:
            print("Please enter a valid number.")

    password = generate_password(password_length)
    print(f"Your password is: {password}")
    print("Keep it in a safe place!")

    test_password_generator()