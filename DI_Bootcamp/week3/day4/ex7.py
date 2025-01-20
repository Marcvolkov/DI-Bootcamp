import string
import random
from datetime import datetime, timedelta
from faker import Faker

# Generate a random string of length 5
random_string = ''.join(random.choices(string.ascii_letters, k=5))
print(f"Random String: {random_string}")

# Function to display the current date
def display_current_date():
    current_date = datetime.now().strftime("%Y-%m-%d")
    print(f"Current Date: {current_date}")

# Call the function
display_current_date()

# Function to calculate time left until January 1st
def time_until_new_year():
    now = datetime.now()
    next_year = now.year + 1 if now.month == 12 and now.day > 31 else now.year
    jan_first = datetime(year=next_year, month=1, day=1)
    time_left = jan_first - now
    days, seconds = time_left.days, time_left.seconds
    hours = seconds // 3600
    minutes = (seconds % 3600) // 60
    seconds = seconds % 60
    print(f"Time left until January 1st: {days} days, {hours:02}:{minutes:02}:{seconds:02} hours")

# Call the function
time_until_new_year()

# Function to calculate minutes lived since birth
def minutes_lived(birthdate):
    try:
        birthdate = datetime.strptime(birthdate, "%Y-%m-%d")
        now = datetime.now()
        if birthdate > now:
            print("Birthdate is in the future. Please enter a valid date.")
            return
        time_lived = now - birthdate
        minutes = time_lived.total_seconds() // 60
        print(f"You have lived for approximately {int(minutes)} minutes.")
    except ValueError:
        print("Invalid date format. Please use YYYY-MM-DD.")

# Example usage
birthdate_input = input("Enter your birthdate (YYYY-MM-DD): ")
minutes_lived(birthdate_input)

# Using Faker to create users
fake = Faker()
users = []

def add_user():
    user = {
        "name": fake.name(),
        "address": fake.address(),
        "language_code": fake.language_code()
    }
    users.append(user)
    print(f"Added user: {user}")

# Add 5 users
for _ in range(5):
    add_user()

# Display all users
print("\nAll users:")
for user in users:
    print(user)
