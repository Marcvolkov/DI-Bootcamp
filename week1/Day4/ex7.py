# Ask the user for their favorite fruits
favorite_fruits = input("Enter your favorite fruits, separated by a space: ").split()

# Ask the user for a fruit name
user_fruit = input("Enter the name of a fruit: ")

# Check if the fruit is in the favorite fruits list
if user_fruit in favorite_fruits:
    print("You chose one of your favorite fruits! Enjoy!")
else:
    print("You chose a new fruit. I hope you enjoy!")
