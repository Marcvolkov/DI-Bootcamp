# Ask the user for a comma-separated sequence of words
words = input("Enter a comma-separated sequence of words: ").split(",")

# Sort the words alphabetically using list comprehension
sorted_words = ",".join([word.strip() for word in sorted(words)])

# Print the sorted words
print("Sorted words:", sorted_words)
