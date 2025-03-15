import string
import random
from datetime import datetime, timedelta
from faker import Faker
import json

# Generate a random string of length 5
random_string = ''.join(random.choices(string.ascii_letters, k=5))
print(f"Random String: {random_string}")

# Function to display the current date
def display_current_date():
    current_date = datetime.now().strftime("%Y-%m-%d")
    print(f"Current Date: {current_date}")

# Call the function
display_current_date()

# Function to calculate time left until January 1st
def time_until_new_year():
    now = datetime.now()
    next_year = now.year + 1 if now.month == 12 and now.day > 31 else now.year
    jan_first = datetime(year=next_year, month=1, day=1)
    time_left = jan_first - now
    days, seconds = time_left.days, time_left.seconds
    hours = seconds // 3600
    minutes = (seconds % 3600) // 60
    seconds = seconds % 60
    print(f"Time left until January 1st: {days} days, {hours:02}:{minutes:02}:{seconds:02} hours")

# Call the function
time_until_new_year()

# Function to calculate minutes lived since birth
def minutes_lived(birthdate):
    try:
        birthdate = datetime.strptime(birthdate, "%Y-%m-%d")
        now = datetime.now()
        if birthdate > now:
            print("Birthdate is in the future. Please enter a valid date.")
            return
        time_lived = now - birthdate
        minutes = time_lived.total_seconds() // 60
        print(f"You have lived for approximately {int(minutes)} minutes.")
    except ValueError:
        print("Invalid date format. Please use YYYY-MM-DD.")

# Example usage
birthdate_input = input("Enter your birthdate (YYYY-MM-DD): ")
minutes_lived(birthdate_input)

# Using Faker to create users
fake = Faker()
users = []

def add_user():
    user = {
        "name": fake.name(),
        "address": fake.address(),
        "language_code": fake.language_code()
    }
    users.append(user)
    print(f"Added user: {user}")

# Add 5 users
for _ in range(5):
    add_user()

# Display all users
print("\nAll users:")
for user in users:
    print(user)

# Exercise 1 - Random Sentence Generator

def get_words_from_file(filepath):
    """Reads words from a file and returns them as a list."""
    try:
        with open(filepath, 'r') as file:
            words = file.read().splitlines()
        return words
    except FileNotFoundError:
        print("File not found. Please ensure the file exists.")
        return []

def get_random_sentence(length):
    """Generates a random sentence with the given number of words."""
    words = get_words_from_file('wordlist.txt')  # Replace 'wordlist.txt' with your file path
    if not words:
        return ""
    sentence = ' '.join(random.choices(words, k=length)).lower()
    return sentence

def main():
    """Main function to run the random sentence generator."""
    print("This program generates a random sentence from a word list.")
    try:
        length = int(input("Enter the number of words for the sentence (2-20): "))
        if 2 <= length <= 20:
            sentence = get_random_sentence(length)
            print(f"Random sentence: {sentence}")
        else:
            print("Please enter a number between 2 and 20.")
    except ValueError:
        print("Invalid input. Please enter a number.")

# Run the main function
main()

# Working with JSON
sampleJson = '''{ 
   "company":{ 
      "employee":{ 
         "name":"emma",
         "payable":{ 
            "salary":7000,
            "bonus":800
         }
      }
   }
}'''

# Load the JSON string as a dictionary
data = json.loads(sampleJson)

# Access the nested "salary" key
salary = data["company"]["employee"]["payable"]["salary"]
print(f"Salary: {salary}")

# Add a "birth_date" key at the same level as "name"
data["company"]["employee"]["birth_date"] = "1990-01-01"

# Save the dictionary as a JSON file
with open("output.json", "w") as json_file:
    json.dump(data, json_file, indent=4)
    print("JSON data saved to output.json")

# Part I - Text Analysis
class Text:
    def __init__(self, text):
        self.text = text

    def word_frequency(self, word):
        words = self.text.split()
        count = words.count(word)
        return count if count > 0 else f"'{word}' not found in the text."

    def most_common_word(self):
        words = self.text.split()
        return max(set(words), key=words.count)

    def unique_words(self):
        words = self.text.split()
        return list(set(words))

    @classmethod
    def from_file(cls, filepath):
        try:
            with open(filepath, 'r') as file:
                text = file.read()
            return cls(text)
        except FileNotFoundError:
            print("File not found.")
            return None

# Example usage
text = Text("A good book would sometimes cost as much as a good house.")
print("Frequency of 'good':", text.word_frequency('good'))
print("Most common word:", text.most_common_word())
print("Unique words:", text.unique_words())

# Part II - Analyze external text file
file_text = Text.from_file('the_stranger.txt')
if file_text:
    print("Most common word in file:", file_text.most_common_word())

# Bonus - Text Modification
class TextModification(Text):
    def remove_punctuation(self):
        return ''.join(ch for ch in self.text if ch not in string.punctuation)

    def remove_stop_words(self):
        stop_words = {'a', 'an', 'the', 'and', 'or', 'but', 'is', 'in', 'on', 'at', 'to', 'as'}
        words = self.text.split()
        return ' '.join(word for word in words if word.lower() not in stop_words)

    def remove_special_characters(self):
        return ''.join(ch for ch in self.text if ch.isalnum() or ch.isspace())

# Example usage of TextModification
modified_text = TextModification("A good book, sometimes@ costs much more than a house!")
print("Text without punctuation:", modified_text.remove_punctuation())
print("Text without stop words:", modified_text.remove_stop_words())
print("Text without special characters:", modified_text.remove_special_characters())
