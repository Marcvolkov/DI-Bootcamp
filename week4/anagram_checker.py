class AnagramChecker:
    def __init__(self, word_file_path):
        # Load the word list file into a set for fast lookup.
        with open(word_file_path, 'r') as f:
            # Strip whitespace and convert to lower case
            self.words = set(word.strip().lower() for word in f if word.strip())

    def is_valid_word(self, word):
        # Check if the lower-case version of the word exists in the word list.
        return word.lower() in self.words

    def is_anagram(self, word1, word2):
        # Return True if both words have the same letters (order doesn't matter)
        # and they are not the same word.
        return sorted(word1.lower()) == sorted(word2.lower()) and word1.lower() != word2.lower()

    def get_anagrams(self, word):
        word_lower = word.lower()
        sorted_word = sorted(word_lower)
        # Return all words that are anagrams (different from the original)
        return [w for w in self.words if sorted(w) == sorted_word and w != word_lower]
