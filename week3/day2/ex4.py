
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

# Create an instance of the Family class
members = [
    {'name': 'Michael', 'age': 35, 'gender': 'Male', 'is_child': False},
    {'name': 'Sarah', 'age': 32, 'gender': 'Female', 'is_child': False}
]

smith_family = Family("Smith", members)

# Test the methods
smith_family.family_presentation()
print()

smith_family.born(name='Emma', age=0, gender='Female', is_child=True)
print()

print(f"Is Michael over 18? {smith_family.is_18('Michael')}")
print(f"Is Emma over 18? {smith_family.is_18('Emma')}")
print()

smith_family.family_presentation()
