class Zoo:
    def __init__(self, zoo_name):
        self.name = zoo_name
        self.animals = []

    def add_animal(self, new_animal):
        if new_animal not in self.animals:
            self.animals.append(new_animal)

    def get_animals(self):
        print("Animals in the zoo:")
        for animal in self.animals:
            print(animal)

    def sell_animal(self, animal_sold):
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)

    def sort_animals(self):
        sorted_animals = sorted(self.animals)
        grouped_animals = {}
        group_index = 1

        for animal in sorted_animals:
            first_letter = animal[0]
            if group_index not in grouped_animals:
                grouped_animals[group_index] = [animal]
            else:
                if grouped_animals[group_index][0][0] == first_letter:
                    grouped_animals[group_index].append(animal)
                else:
                    group_index += 1
                    grouped_animals[group_index] = [animal]

        self.grouped_animals = grouped_animals

    def get_groups(self):
        print("Animal groups:")
        for group, animals in self.grouped_animals.items():
            print(f"{group}: {animals}")

# Create an object for the zoo
ramat_gan_safari = Zoo("Ramat Gan Safari")

# Add animals to the zoo
ramat_gan_safari.add_animal("Giraffe")
ramat_gan_safari.add_animal("Ape")
ramat_gan_safari.add_animal("Baboon")
ramat_gan_safari.add_animal("Bear")
ramat_gan_safari.add_animal("Cat")
ramat_gan_safari.add_animal("Cougar")
ramat_gan_safari.add_animal("Eel")
ramat_gan_safari.add_animal("Emu")

# Get the list of animals
ramat_gan_safari.get_animals()

# Sell an animal
ramat_gan_safari.sell_animal("Bear")

# Get the updated list of animals
ramat_gan_safari.get_animals()

# Sort and group animals
ramat_gan_safari.sort_animals()

# Get the groups of animals
ramat_gan_safari.get_groups()
