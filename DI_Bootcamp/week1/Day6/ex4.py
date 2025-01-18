# List of Disney characters
users = ["Mickey", "Minnie", "Donald", "Ariel", "Pluto"]

# 1. Create disney_users_A using a for loop
disney_users_A = {user: index for index, user in enumerate(users)}
print("disney_users_A:", disney_users_A)

# 2. Create disney_users_B using a for loop
disney_users_B = {index: user for index, user in enumerate(users)}
print("disney_users_B:", disney_users_B)

# 3. Create disney_users_C sorted alphabetically
disney_users_C = {user: index for index, user in enumerate(sorted(users))}
print("disney_users_C:", disney_users_C)

# 4. Create disney_users_A for characters with the letter "i"
disney_users_i = {user: index for index, user in enumerate(users) if "i" in user.lower()}
print("disney_users_A with 'i':", disney_users_i)

# 5. Create disney_users_A for characters starting with "m" or "p"
disney_users_mp = {user: index for index, user in enumerate(users) if user[0].lower() in ["m", "p"]}
print("disney_users_A with 'm' or 'p':", disney_users_mp)
