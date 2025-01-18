# Define ticket prices based on age
def get_ticket_price(age):
    if age < 3:
        return 0
    elif 3 <= age <= 12:
        return 10
    else:
        return 15

# Example family dictionary
family = {"rick": 43, 'beth': 13, 'morty': 5, 'summer': 8}

# Calculate the total cost and print individual payments
total_cost = 0

for name, age in family.items():
    price = get_ticket_price(age)
    total_cost += price
    print(f"{name.capitalize()} has to pay ${price}.")

print(f"\nTotal cost for the family: ${total_cost}")

# Bonus: Ask the user for names and ages to create a family dictionary
user_family = {}

while True:
    name = input("Enter the name of a family member (or type 'done' to finish): ").strip()
    if name.lower() == 'done':
        break
    try:
        age = int(input(f"Enter the age of {name}: "))
        user_family[name] = age
    except ValueError:
        print("Please enter a valid age.")

# Calculate the total cost for the user-provided family
total_cost_user = 0

for name, age in user_family.items():
    price = get_ticket_price(age)
    total_cost_user += price
    print(f"{name.capitalize()} has to pay ${price}.")

print(f"\nTotal cost for the family: ${total_cost_user}")
