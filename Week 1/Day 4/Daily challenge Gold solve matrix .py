MATRIX_STR = """
7ir
Tsi
h%x
i ?
sM# 
$a 
#t%
"""

matrix = [list(row) for row in MATRIX_STR.strip("\n").splitlines()]
column_count = max(len(row) for row in matrix)
decoded_message = ""
pending_symbols = False

for column_index in range(column_count):
	for row in matrix:
		character = row[column_index] if column_index < len(row) else " "

		if character.isalpha():
			if pending_symbols and decoded_message:
				decoded_message += " "
			decoded_message += character
			pending_symbols = False
		elif decoded_message:
			pending_symbols = True

print(decoded_message)
