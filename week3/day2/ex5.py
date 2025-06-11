class Family:
    def __init__(self, last_name, members):
        self.last_name = last_name
        self.members = members

    def born(self, **kwargs):
        self.members.append(kwargs)
        print(f"Congratulations to the {self.last_name} family on the birth of {kwargs['name']}!")

    def is_18(self, name):
        for member in self.members:
            if member['name'] == name:
                return member['age'] >= 18
        print(f"No member found with the name {name}.")
        return False

    def family_presentation(self):
        print(f"The {self.last_name} family:")
        for member in self.members:
            print(member)

class TheIncredibles(Family):
    def use_power(self, name):
        for member in self.members:
            if member['name'] == name:
                if member['age'] >= 18:
                    print(f"{name}'s power is {member['power']}.")
                else:
                    raise Exception(f"{name} is not over 18 years old and cannot use their power.")
                return
        print(f"No member found with the name {name}.")

    def incredible_presentation(self):
        print("*Here is our powerful family*")
        super().family_presentation()

# Create an instance of TheIncredibles class
members = [
    {'name': 'Michael', 'age': 35, 'gender': 'Male', 'is_child': False, 'power': 'fly', 'incredible_name': 'MikeFly'},
    {'name': 'Sarah', 'age': 32, 'gender': 'Female', 'is_child': False, 'power': 'read minds', 'incredible_name': 'SuperWoman'}
]

incredibles_family = TheIncredibles("Incredibles", members)

# Call the incredible_presentation method
incredibles_family.incredible_presentation()
print()

# Add Baby Jack using the born method
incredibles_family.born(name='Jack', age=0, gender='Male', is_child=True, power='Unknown Power', incredible_name='BabyJack')
print()

# Call the incredible_presentation method again
incredibles_family.incredible_presentation()
print()

# Test the use_power method
incredibles_family.use_power('Michael')
try:
    incredibles_family.use_power('Jack')
except Exception as e:
    print(e)
