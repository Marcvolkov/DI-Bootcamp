import string
import random
from datetime import datetime, timedelta

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