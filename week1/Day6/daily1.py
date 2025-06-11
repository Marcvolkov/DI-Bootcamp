# Ask the user for a word
user_word = input("Enter a word: ")

# Create the dictionary to store letters and their indexes
letter_indexes = {}

# Populate the dictionary
for index, letter in enumerate(user_word):
    if letter not in letter_indexes:
        letter_indexes[letter] = []
    letter_indexes[letter].append(index)

# Print the resulting dictionary
print(letter_indexes)
