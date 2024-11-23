#Write code that asks the user for a number and determines whether this number is odd or even.
try:
    number = int(input("Please enter a number: "))
    
    if number % 2 == 0:
        print(f"{number} is even.")
    else:
        print(f"{number} is odd.")
except ValueError:
    print("That's not a valid number. Please enter an integer.")
