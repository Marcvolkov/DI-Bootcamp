# Initial basket list
basket = ["Banana", "Apples", "Oranges", "Blueberries"]

# Remove "Banana" from the list
basket.remove("Banana")

# Remove "Blueberries" from the list
basket.remove("Blueberries")

# Add "Kiwi" to the end of the list
basket.append("Kiwi")

# Add "Apples" to the beginning of the list
basket.insert(0, "Apples")

# Count how many "Apples" are in the basket
apple_count = basket.count("Apples")
print(f"Number of apples in the basket: {apple_count}")

# Empty the basket
basket.clear()

# Print the final basket
print("Basket after clearing:", basket)
