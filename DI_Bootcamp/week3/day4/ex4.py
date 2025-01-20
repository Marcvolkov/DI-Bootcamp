import string
import random
from datetime import datetime

# Generate a random string of length 5
random_string = ''.join(random.choices(string.ascii_letters, k=5))
print(f"Random String: {random_string}")

# Function to display the current date
def display_current_date():
    current_date = datetime.now().strftime("%Y-%m-%d")
    print(f"Current Date: {current_date}")

# Call the function
display_current_date()