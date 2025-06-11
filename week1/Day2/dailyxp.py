import random

# Ask the user for a string
user_string = input("Please enter a string of 10 characters: ")

# Check the length of the string
if len(user_string) < 10:
    print("String not long enough.")
elif len(user_string) > 10:
    print("String too long.")
else:
    print("Perfect string!")

    # Print the first and last characters
    print(f"First character: {user_string[0]}")
    print(f"Last character: {user_string[-1]}")

    # Construct the string character by character
    print("\nBuilding the string character by character:")
    built_string = ""
    for char in user_string:
        built_string += char
        print(built_string)

    # Bonus: Jumble the string
    jumbled_list = list(user_string)
    random.shuffle(jumbled_list)
    jumbled_string = ''.join(jumbled_list)
    print(f"\nJumbled string: {jumbled_string}")
