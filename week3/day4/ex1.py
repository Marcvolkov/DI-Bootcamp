class Currency:
    def __init__(self, currency, amount):
        self.currency = currency
        self.amount = amount

    def __str__(self):
        return f"{self.amount} {self.currency}s" if self.amount != 1 else f"{self.amount} {self.currency}"

    def __int__(self):
        return self.amount

    def __repr__(self):
        return str(self)

    def __add__(self, other):
        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(f"Cannot add between Currency type <{self.currency}> and <{other.currency}>")
            return self.amount + other.amount
        elif isinstance(other, (int, float)):
            return self.amount + other
        else:
            raise TypeError("Addition not supported between instances of Currency and other types.")

    def __iadd__(self, other):
        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(f"Cannot add between Currency type <{self.currency}> and <{other.currency}>")
            self.amount += other.amount
        elif isinstance(other, (int, float)):
            self.amount += other
        else:
            raise TypeError("Addition not supported between instances of Currency and other types.")
        return self

# Example usage
c1 = Currency('dollar', 5)
c2 = Currency('dollar', 10)
c3 = Currency('shekel', 1)
c4 = Currency('shekel', 10)

print(str(c1))           # '5 dollars'
print(int(c1))           # 5
print(repr(c1))          # '5 dollars'
print(c1 + 5)            # 10
print(c1 + c2)           # 15

c1 += 5
print(c1)                # '10 dollars'

c1 += c2
print(c1)                # '20 dollars'

try:
    print(c1 + c3)       # Should raise TypeError
except TypeError as e:
    print(e)
