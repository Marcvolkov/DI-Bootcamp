#Write code that asks the user for their name and determines whether or not you have the same name, print out a funny message based on the outcome.
my_name = "Mark"

user_name = input("What's your name? ")

if user_name.strip().lower() == my_name.lower():
    print(f"Wow, we share the same name, {user_name}! Are we long-lost twins?")
else:
    print(f"Hello, {user_name}! Funny, you don't look like a {my_name}!")
