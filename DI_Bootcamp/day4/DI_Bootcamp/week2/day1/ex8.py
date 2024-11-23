import random

# List of dictionaries containing Star Wars questions and answers
data = [
    {"question": "What is Baby Yoda's real name?", "answer": "Grogu"},
    {"question": "Where did Obi-Wan take Luke after his birth?", "answer": "Tatooine"},
    {"question": "What year did the first Star Wars movie come out?", "answer": "1977"},
    {"question": "Who built C-3PO?", "answer": "Anakin Skywalker"},
    {"question": "Anakin Skywalker grew up to be who?", "answer": "Darth Vader"},
    {"question": "What species is Chewbacca?", "answer": "Wookiee"}
]

# Function to run the Star Wars quiz
def star_wars_quiz():
    correct_answers = 0
    incorrect_answers = 0
    wrong_answers = []

    # Shuffle the questions for randomness
    random.shuffle(data)

    # Loop through each question in the list
    for q in data:
        user_answer = input(q["question"] + " ")
        if user_answer.strip().lower() == q["answer"].lower():
            print("Correct!")
            correct_answers += 1
        else:
            print(f"Incorrect! The correct answer was: {q['answer']}")
            incorrect_answers += 1
            wrong_answers.append({"question": q["question"], "user_answer": user_answer, "correct_answer": q["answer"]})

    # Display the final score
    print("\nQuiz Completed!")
    print(f"You got {correct_answers} correct answer(s) and {incorrect_answers} incorrect answer(s).")

    # Provide friendly advice based on the user's performance
    if correct_answers == len(data):
        print("Amazing! You are a true Star Wars expert!")
    elif correct_answers >= len(data) // 2:
        print("Not bad! You know your Star Wars pretty well!")
    else:
        print("You might want to rewatch the movies. May the Force be with you!")

    # Bonus: Display the questions answered incorrectly
    if wrong_answers:
        print("\nHere are the questions you answered incorrectly:")
        for wa in wrong_answers:
            print(f"Question: {wa['question']}")
            print(f"Your answer: {wa['user_answer']}")
            print(f"Correct answer: {wa['correct_answer']}\n")

    # Ask the user to play again if they had more than 3 wrong answers
    if incorrect_answers > 3:
        retry = input("You had more than 3 incorrect answers. Would you like to play again? (yes/no): ").strip().lower()
        if retry == "yes":
            star_wars_quiz()

# Run the quiz
if __name__ == "__main__":
    star_wars_quiz()
