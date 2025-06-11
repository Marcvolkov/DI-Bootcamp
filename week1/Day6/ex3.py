# Step 2: Create the brand dictionary
brand = {
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {
        "France": "blue",
        "Spain": "red",
        "US": ["pink", "green"]
    }
}

# Step 3: Change the number of stores to 2
brand["number_stores"] = 2

# Step 4: Print a sentence explaining who Zara's clients are
print(f"Zara's clients are: {', '.join(brand['type_of_clothes'])}.")

# Step 5: Add a key called country_creation
brand["country_creation"] = "Spain"

# Step 6: Check if 'international_competitors' exists, then add 'Desigual'
if "international_competitors" in brand:
    brand["international_competitors"].append("Desigual")

# Step 7: Delete the information about the creation date
del brand["creation_date"]

# Step 8: Print the last international competitor
print(f"The last international competitor is: {brand['international_competitors'][-1]}.")

# Step 9: Print the major clothes colors in the US
print(f"The major clothes colors in the US are: {', '.join(brand['major_color']['US'])}.")

# Step 10: Print the amount of key-value pairs
print(f"The brand dictionary has {len(brand)} key-value pairs.")

# Step 11: Print the keys of the dictionary
print(f"The keys in the brand dictionary are: {list(brand.keys())}.")

# Step 12: Create another dictionary more_on_zara
more_on_zara = {
    "creation_date": 1975,
    "number_stores": 10000
}

# Step 13: Add more_on_zara to brand
brand.update(more_on_zara)

# Step 14: Print the value of the key number_stores
print(f"The number of stores is now: {brand['number_stores']}.")
# The value was overwritten by the update method to reflect the value from 'more_on_zara'.
