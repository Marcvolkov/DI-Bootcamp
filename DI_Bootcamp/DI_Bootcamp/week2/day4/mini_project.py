def display_board(board):
    """Displays the current state of the Tic Tac Toe board."""
    for row in board:
        print(" | ".join(row))
        print("-" * 10)


def player_input(player):
    """Gets the position from the player."""
    while True:
        try:
            position = int(input(f"Player {player}, enter your move (1-9): ")) - 1
            if position < 0 or position >= 9:
                print("Invalid input. Please enter a number between 1 and 9.")
                continue
            row, col = divmod(position, 3)
            if board[row][col] == " ":
                return row, col
            else:
                print("That position is already taken. Choose another.")
        except ValueError:
            print("Invalid input. Please enter a number.")


def check_win(board, player):
    """Checks if the current player has won."""
    # Check rows, columns, and diagonals
    for i in range(3):
        if all(board[i][j] == player for j in range(3)) or all(board[j][i] == player for j in range(3)):
            return True
    if board[0][0] == board[1][1] == board[2][2] == player or board[0][2] == board[1][1] == board[2][0] == player:
        return True
    return False


def play():
    """Main function to play the Tic Tac Toe game."""
    global board
    board = [[" " for _ in range(3)] for _ in range(3)]
    current_player = "X"
    moves = 0

    while moves < 9:
        display_board(board)
        row, col = player_input(current_player)
        board[row][col] = current_player
        moves += 1

        if check_win(board, current_player):
            display_board(board)
            print(f"Player {current_player} wins!")
            return

        current_player = "O" if current_player == "X" else "X"

    display_board(board)
    print("It's a tie!")


# Run the game
if __name__ == "__main__":
    play()
