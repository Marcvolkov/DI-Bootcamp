import math

class Circle:
    def __init__(self, radius=None, diameter=None):
        if radius is not None:
            self.radius = radius
        elif diameter is not None:
            self.radius = diameter / 2
        else:
            raise ValueError("Either radius or diameter must be specified.")

    @property
    def diameter(self):
        return self.radius * 2

    @diameter.setter
    def diameter(self, value):
        self.radius = value / 2

    @property
    def area(self):
        return math.pi * (self.radius ** 2)

    def __repr__(self):
        return f"Circle(radius={self.radius:.2f}, diameter={self.diameter:.2f}, area={self.area:.2f})"

    def __add__(self, other):
        if isinstance(other, Circle):
            return Circle(radius=self.radius + other.radius)
        raise TypeError("Only two Circle instances can be added.")

    def __lt__(self, other):
        if isinstance(other, Circle):
            return self.radius < other.radius
        return NotImplemented

    def __eq__(self, other):
        if isinstance(other, Circle):
            return math.isclose(self.radius, other.radius)
        return NotImplemented

# Example usage
circle1 = Circle(radius=5)
circle2 = Circle(diameter=10)
circle3 = Circle(radius=7)

# Print attributes
print(circle1)
print(circle2)

# Add circles
circle4 = circle1 + circle3
print(circle4)

# Compare circles
print(circle1 == circle2)  # True
print(circle1 < circle3)   # True

# Sort circles
circles = [circle3, circle1, circle2]
circles.sort()
print(circles)

# Bonus: Draw circles using the Turtle module
try:
    import turtle

    def draw_circle(radius):
        turtle.penup()
        turtle.goto(0, -radius)  # Start at the bottom of the circle
        turtle.pendown()
        turtle.circle(radius)

    turtle.speed(1)
    for c in circles:
        draw_circle(c.radius)
        turtle.clear()
    turtle.done()
except ImportError:
    print("Turtle module is not installed. Skipping bonus drawing.")
