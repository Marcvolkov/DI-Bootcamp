class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age

# Instantiate three Cat objects
cat1 = Cat("Whiskers", 3)
cat2 = Cat("Mittens", 5)
cat3 = Cat("Paws", 2)

# Function to find the oldest cat
def find_oldest_cat(*cats):
    oldest_cat = max(cats, key=lambda cat: cat.age)
    return oldest_cat

# Find the oldest cat
oldest = find_oldest_cat(cat1, cat2, cat3)

# Print the result
print(f"The oldest cat is {oldest.name}, and is {oldest.age} years old.")
