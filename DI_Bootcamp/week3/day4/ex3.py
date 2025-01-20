import string
import random

# Generate a random string of length 5
random_string = ''.join(random.choices(string.ascii_letters, k=5))

print(f"Random String: {random_string}")