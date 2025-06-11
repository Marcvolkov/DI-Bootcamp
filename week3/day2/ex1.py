class Pets():
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())

class Cat():
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'

class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Siamese(Cat):
    def sing(self, sounds):
        return f'{sounds}'

# Create instances of each cat breed
bengal = Bengal("Bengie", 3)
chartreux = Chartreux("Charley", 2)
siamese = Siamese("Sia", 4)

# Create a list of all cats
all_cats = [bengal, chartreux, siamese]

# Create Sara's pets
sara_pets = Pets(all_cats)

# Take all the cats for a walk
sara_pets.walk()
