# Create a set with your favorite numbers
my_fav_numbers = {7, 14, 21}

# Add two new numbers to the set
my_fav_numbers.add(28)
my_fav_numbers.add(35)

# Remove the last number (sets are unordered, so we remove an arbitrary element)
my_fav_numbers.remove(35)

# Create a set with your friend's favorite numbers
friend_fav_numbers = {3, 8, 15}

# Concatenate the sets (combine them into a new set)
our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)

# Print the results
print("My favorite numbers:", my_fav_numbers)
print("My friend's favorite numbers:", friend_fav_numbers)
print("Our favorite numbers:", our_fav_numbers)
