# Create a function that accepts a number between 1 and 100 and generates another number randomly between 1 and 100. Use the random module.
# Compare the two numbers, if it’s the same number, display a success message, otherwise show a fail message and display both numbers.
import random

def guess_number(user_number):
    if 1 <= user_number <= 100:
        random_number = random.randint(1, 100)
        
        # Compare the user's number with the randomly generated number
        if user_number == random_number:
            print(f"Congratulations! You guessed the number correctly: {random_number}")
        else:
            print(f"Sorry, you didn't guess it. Your number: {user_number}, Random number: {random_number}")
    else:
        print("Please enter a number between 1 and 100.")

guess_number(25)
