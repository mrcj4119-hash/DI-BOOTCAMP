import time

class GameOfLife:
    def __init__(self, rows, columns, live_cells):
        self.rows = rows
        self.columns = columns
        self.grid = [
            [False for _ in range(columns)]
            for _ in range(rows)
        ]

        for row, column in live_cells:
            if 0 <= row < rows and 0 <= column < columns:
                self.grid[row][column] = True

    def count_neighbors(self, row, column):
        neighbors = 0

        for row_change in (-1, 0, 1):
            for column_change in (-1, 0, 1):
                if row_change == 0 and column_change == 0:
                    continue

                neighbor_row = row + row_change
                neighbor_column = column + column_change

                if (
                    0 <= neighbor_row < self.rows
                    and 0 <= neighbor_column < self.columns
                    and self.grid[neighbor_row][neighbor_column]
                ):
                    neighbors += 1

        return neighbors

    def next_generation(self):
        new_grid = [
            [False for _ in range(self.columns)]
            for _ in range(self.rows)
        ]

        for row in range(self.rows):
            for column in range(self.columns):
                neighbors = self.count_neighbors(row, column)

                if self.grid[row][column]:
                    new_grid[row][column] = neighbors in (2, 3)
                else:
                    new_grid[row][column] = neighbors == 3

        self.grid = new_grid

    def display(self, generation):
        print(f"\nGeneration {generation}")

        for row in self.grid:
            print(" ".join("⬛" if cell else "⬜" for cell in row))

    def is_finished(self, previous_grid):
        return self.grid == previous_grid or not any(
            any(row) for row in self.grid
        )

    def run(self, generations=20, delay=0.5):
        for generation in range(generations + 1):
            self.display(generation)

            if generation == generations:
                break

            previous_grid = [row[:] for row in self.grid]
            self.next_generation()

            if self.is_finished(previous_grid):
                print("\nThe game has reached a stable state or all cells are dead.")
                break

            time.sleep(delay)

blinker = [
    (5, 4),
    (5, 5),
    (5, 6),
]

game = GameOfLife(rows=12, columns=12, live_cells=blinker)
game.run(generations=10)

glider = [
    (1, 2),
    (2, 3),
    (3, 1),
    (3, 2),
    (3, 3),
]

game = GameOfLife(rows=15, columns=15, live_cells=glider)
game.run(generations=20)