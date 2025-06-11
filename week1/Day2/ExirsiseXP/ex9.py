# #Write code that will ask the user for their height in centimeters.
# If they are over 145cm print a message that states they are tall enough to ride.
# If they are not tall enough print a message that says they need to grow some more to ride.
try:
    height = int(input("Enter your height in centimeters: "))
    
    # Check if the height is over 145 cm
    if height > 145:
        print("You are tall enough to ride!")
    else:
        print("You need to grow some more to ride.")
except ValueError:
    print("Please enter a valid numerical value for your height.")
