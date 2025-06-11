from previous_dog_module import Dog
import random

class PetDog(Dog):
    def __init__(self, name, age, weight):
        super().__init__(name, age, weight)
        self.trained = False

    def train(self):
        print(self.bark())
        self.trained = True

    def play(self, *other_dogs):
        dog_names = ", ".join([dog.name for dog in other_dogs])
        print(f"{self.name}, {dog_names} all play together.")

    def do_a_trick(self):
        if self.trained:
            tricks = [
                f"{self.name} does a barrel roll.",
                f"{self.name} stands on his back legs.",
                f"{self.name} shakes your hand.",
                f"{self.name} plays dead."
            ]
            print(random.choice(tricks))
        else:
            print(f"{self.name} is not trained yet and cannot do a trick.")

# Example usage
dog1 = PetDog("Buddy", 5, 20)
dog2 = PetDog("Max", 7, 25)
dog3 = PetDog("Bella", 3, 15)

# Train Buddy
dog1.train()

# Play with Max and Bella
dog1.play(dog2, dog3)

# Perform a trick
dog1.do_a_trick()

# Try an untrained dog doing a trick
dog2.do_a_trick()