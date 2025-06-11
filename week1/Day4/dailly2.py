# Ask the user for a string
user_string = input("Enter a string: ")

# Remove consecutive duplicate letters
new_string = ""
for i in range(len(user_string)):
    if i == 0 or user_string[i] != user_string[i - 1]:
        new_string += user_string[i]

# Display the result
print(f"Original string: {user_string}")
print(f"String without consecutive duplicates: {new_string}")
