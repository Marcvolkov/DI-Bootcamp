# Define the matrix as a 2D list
matrix = [
    ["7", "i", "i"],
    ["T", "s", "x"],
    ["h", "%", "?"],
    ["i", " ", "#"],
    ["s", "M", " "],
    ["$", "a", " "],
    ["#", "t", "%"],
    ["^", "r", "!"]
]

# Function to decrypt the matrix
def decrypt_matrix(matrix):
    message = ""

    # Loop through each column
    for col in range(len(matrix[0])):
        for row in range(len(matrix)):
            char = matrix[row][col]
            if char.isalpha():  # Check if the character is alphabetic
                message += char
            elif message and message[-1] != " ":
                message += " "  # Add a space if a non-alpha character is found

    # Remove trailing spaces
    return " ".join(message.split())

# Decrypt the matrix
secret_message = decrypt_matrix(matrix)
print("Decoded message:", secret_message)
