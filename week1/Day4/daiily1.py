# Ask the user for a number and a length
number = int(input("Enter a number: "))
length = int(input("Enter the desired length of the list: "))

# Generate the list of multiples
multiples = [number * i for i in range(1, length + 1)]

# Print the result
print(f"List of multiples of {number} with length {length}: {multiples}")
