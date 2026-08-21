board = [[" " for _ in range(3)] for _ in range(3)]


def display_board():
	print("\n  1   2   3")
	for row_number, row in enumerate(board, start=1):
		print(f"{row_number} " + " | ".join(row))
		if row_number < 3:
			print("  ---------")


def player_input(player):
	while True:
		move = input(
			f"Player {player}, enter your move as row and column (1-3 1-3): "
		).split()

		if len(move) != 2 or not all(value.isdigit() for value in move):
			print("Please enter two numbers between 1 and 3.")
			continue

		row, column = (int(value) - 1 for value in move)

		if not (0 <= row < 3 and 0 <= column < 3):
			print("Rows and columns must be between 1 and 3.")
		elif board[row][column] != " ":
			print("That square is already taken.")
		else:
			board[row][column] = player
			return


def check_win(board, player):
	winning_lines = board + [
		[board[row][column] for row in range(3)]
		for column in range(3)
	]
	winning_lines += [
		[board[index][index] for index in range(3)],
		[board[index][2 - index] for index in range(3)],
	]

	return any(line == [player] * 3 for line in winning_lines)


def check_tie(board):
	return all(cell != " " for row in board for cell in row)


def play():
	global board
	board = [[" " for _ in range(3)] for _ in range(3)]
	current_player = "X"

	while True:
		display_board()
		player_input(current_player)

		if check_win(board, current_player):
			display_board()
			print(f"Player {current_player} wins!")
			break

		if check_tie(board):
			display_board()
			print("It's a tie!")
			break

		current_player = "O" if current_player == "X" else "X"


if __name__ == "__main__":
	play()
