users = []

for _ in range(5):
    name, age, score = input(
        "Enter name, age, and score separated by commas: "
    ).split(",")

    users.append((name.strip(), age.strip(), score.strip()))

users.sort(key=lambda user: (user[0], int(user[1]), int(user[2])))

print(users)