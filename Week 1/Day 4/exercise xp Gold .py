
CURRENT_YEAR = 2026
CURRENT_MONTH = 8
CURRENT_DAY = 20


def get_age(year, month, day):
	age = CURRENT_YEAR - year
	if (CURRENT_MONTH, CURRENT_DAY) < (month, day):
		age -= 1
	return age


def can_retire(gender, date_of_birth):
	year, month, day = (int(part) for part in date_of_birth.split("/"))
	age = get_age(year, month, day)
	retirement_age = 67 if gender.lower() == "m" else 62
	return age >= retirement_age


gender = input("Enter your gender (m/f): ").strip()
date_of_birth = input("Enter your date of birth (yyyy/mm/dd): ").strip()
if can_retire(gender, date_of_birth):
	print("You can retire.")
else:
	print("You cannot retire yet.")


def calculate_sum(x):
	return x + int(str(x) * 2) + int(str(x) * 3) + int(str(x) * 4)


print(f"Sum for 3: {calculate_sum(3)}")


def throw_dice():
	return random.randint(1, 6)


def throw_until_doubles():
	throws = 0
	while True:
		first_die = throw_dice()
		second_die = throw_dice()
		throws += 1
		if first_die == second_die:
			return throws


def main():
	results = [throw_until_doubles() for _ in range(100)]
	total_throws = sum(results)
	average_throws = total_throws / len(results)

	print(f"Total throws: {total_throws}")
	print(f"Average throws to reach doubles: {average_throws:.2f}")


main()
