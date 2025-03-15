# Initialize an empty list to store toppings
toppings = []

# Price constants
base_price = 10
price_per_topping = 2.5

# Loop to ask for pizza toppings
while True:
    topping = input("Enter a pizza topping (type 'quit' to finish): ").strip().lower()
    if topping == 'quit':
        break
    toppings.append(topping)
    print(f"Adding {topping} to your pizza.")

# Calculate the total price
total_price = base_price + len(toppings) * price_per_topping

# Print the final toppings and total price
print("\nYour pizza has the following toppings:")
for topping in toppings:
    print(f"- {topping}")
print(f"Total price: ${total_price:.2f}")
