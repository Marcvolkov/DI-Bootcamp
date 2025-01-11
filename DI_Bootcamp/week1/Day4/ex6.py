# Define your name
my_name = "John"

# Continuously ask the user for their name
while True:
    user_name = input("Please enter your name: ")
    if user_name == my_name:
        print("That's my name too! Exiting the loop.")
        break
    else:
        print("That's not my name. Try again.")
