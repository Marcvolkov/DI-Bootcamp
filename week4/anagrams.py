from anagram_checker import AnagramChecker

def main():
    # Create an instance of AnagramChecker with the word list file
    checker = AnagramChecker("sowpods.txt")
    
    while True:
        print("\nMenu:")
        print("1. Enter a word")
        print("2. Exit")
        choice = input("Choose an option: ").strip()
        
        if choice == "2":
            break
        elif choice == "1":
            user_input = input("Enter a word: ").strip()
            
            # Validate: must be a single word and only alphabetic characters.
            if len(user_input.split()) != 1 or not user_input.isalpha():
                print("Error: Only a single word with alphabetic characters is allowed.")
                continue
            
            if not checker.is_valid_word(user_input):
                print(f'YOUR WORD: "{user_input.upper()}"')
                print("This is not a valid English word.")
                continue
            
            anagrams = checker.get_anagrams(user_input)
            print(f'YOUR WORD: "{user_input.upper()}"')
            print("This is a valid English word.")
            if anagrams:
                print("Anagrams for your word: " + ", ".join(anagrams) + ".")
            else:
                print("No anagrams were found for your word.")
        else:
            print("Invalid option. Please try again.")

if __name__ == '__main__':
    main()
