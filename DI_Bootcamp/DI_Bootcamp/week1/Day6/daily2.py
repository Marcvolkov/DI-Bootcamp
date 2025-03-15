# Function to clean and convert price strings to numbers
def clean_price(price):
    return int(price.replace("$", "").replace(",", ""))

# Function to find affordable items
def affordable_items(items_purchase, wallet):
    wallet_amount = clean_price(wallet)
    affordable = []

    for item, price in items_purchase.items():
        if clean_price(price) <= wallet_amount:
            affordable.append(item)

    if not affordable:
        return "Nothing"

    return sorted(affordable)

# Examples
items_purchase1 = {
    "Water": "$1",
    "Bread": "$3",
    "TV": "$1,000",
    "Fertilizer": "$20"
}
wallet1 = "$300"
print(affordable_items(items_purchase1, wallet1))

items_purchase2 = {
    "Apple": "$4",
    "Honey": "$3",
    "Fan": "$14",
    "Bananas": "$4",
    "Pan": "$100",
    "Spoon": "$2"
}
wallet2 = "$100"
print(affordable_items(items_purchase2, wallet2))

items_purchase3 = {
    "Phone": "$999",
    "Speakers": "$300",
    "Laptop": "$5,000",
    "PC": "$1200"
}
wallet3 = "$1"
print(affordable_items(items_purchase3, wallet3))
