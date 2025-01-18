class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f"{self.name} is barking"

    def run_speed(self):
        return (self.weight / self.age) * 10

    def fight(self, other_dog):
        self_power = self.run_speed() * self.weight
        other_power = other_dog.run_speed() * other_dog.weight

        if self_power > other_power:
            return f"{self.name} wins the fight against {other_dog.name}!"
        elif self_power < other_power:
            return f"{other_dog.name} wins the fight against {self.name}!"
        else:
            return f"It's a tie between {self.name} and {other_dog.name}!"

# Create 3 dogs
dog1 = Dog("Buddy", 5, 20)
dog2 = Dog("Max", 7, 25)
dog3 = Dog("Bella", 3, 15)

# Test the dogs
print(dog1.bark())
print(f"{dog1.name}'s running speed: {dog1.run_speed():.2f}")
print()

print(dog2.bark())
print(f"{dog2.name}'s running speed: {dog2.run_speed():.2f}")
print()

print(dog3.bark())
print(f"{dog3.name}'s running speed: {dog3.run_speed():.2f}")
print()

# Test the fight method
print(dog1.fight(dog2))
print(dog2.fight(dog3))
print(dog3.fight(dog1))
