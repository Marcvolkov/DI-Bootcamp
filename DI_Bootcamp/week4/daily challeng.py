import random

class Card:
    def __init__(self, suit, value):
        self.suit = suit
        self.value = value

    def __repr__(self):
        return f"{self.value} of {self.suit}"

class Deck:
    def __init__(self):
        # Create the deck upon initialization.
        self.cards = []
        self.reset_deck()

    def reset_deck(self):
        """Resets the deck to a full 52-card set."""
        suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
        values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
        self.cards = [Card(suit, value) for suit in suits for value in values]

    def shuffle(self):
        """
        Ensures the deck contains all 52 cards, then rearranges them randomly.
        """
        self.reset_deck()
        random.shuffle(self.cards)

    def deal(self):
        """
        Deals a single card from the deck.
        Returns the card and removes it from the deck.
        If the deck is empty, returns None.
        """
        if self.cards:
            return self.cards.pop(0)
        return None

# Example usage:
if __name__ == '__main__':
    deck = Deck()
    deck.shuffle()
    print("Dealt card:", deck.deal())
    print("Remaining cards:", len(deck.cards))
