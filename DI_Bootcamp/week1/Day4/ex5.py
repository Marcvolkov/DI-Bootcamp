# Print all numbers from 1 to 20 (inclusive)
print("Numbers from 1 to 20:")
for number in range(1, 21):
    print(number)

# Print numbers with even indices (1-based index)
print("\nNumbers with even indices (1-based):")
for index, number in enumerate(range(1, 21), start=1):
    if index % 2 == 0:
        print(number)
