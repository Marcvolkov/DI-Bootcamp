# Ticket pricing logic
free_age = 3
child_age = 12
teen_min_age = 16
teen_max_age = 21
child_ticket_price = 10
adult_ticket_price = 15

def calculate_family_ticket_cost():
    total_cost = 0
    while True:
        age_input = input("Enter the age of a family member (or type 'done' to finish): ").strip().lower()
        if age_input == 'done':
            break
        try:
            age = int(age_input)
            if age < free_age:
                print("Ticket is free.")
            elif age <= child_age:
                total_cost += child_ticket_price
                print(f"Ticket price is ${child_ticket_price}.")
            else:
                total_cost += adult_ticket_price
                print(f"Ticket price is ${adult_ticket_price}.")
        except ValueError:
            print("Please enter a valid age or 'done'.")

    print(f"\nTotal cost for the family tickets: ${total_cost}")

def filter_restricted_teenagers():
    teenagers = input("Enter the names of teenagers (separated by spaces): ").split()
    allowed_teenagers = []

    for teen in teenagers:
        try:
            age = int(input(f"Enter the age of {teen}: "))
            if teen_min_age <= age <= teen_max_age:
                print(f"{teen} is not permitted to watch the movie.")
            else:
                allowed_teenagers.append(teen)
        except ValueError:
            print(f"Invalid age for {teen}. Skipping.")

    print(f"\nFinal list of teenagers allowed to watch the movie: {allowed_teenagers}")

# Run the family ticket cost calculation
print("-- Family Ticket Cost Calculation --")
calculate_family_ticket_cost()

# Run the teenager filtering for restricted movie
print("\n-- Restricted Movie Screening --")
filter_restricted_teenagers()
