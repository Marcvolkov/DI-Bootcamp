// Exercise 2: Your Favorite Colors

// 1. Create an array of your five favorite colors
const colors = ["blue", "green", "red", "purple", "yellow"];

// Part I: Simple “#X” formatting
for (let i = 0; i < colors.length; i++) {
  console.log(`My #${i + 1} choice is ${colors[i]}`);
}

// Part II: Bonus – correct ordinal suffixes
const suffixes = ["st", "nd", "rd", "th", "th"]; 
// (1st, 2nd, 3rd, 4th, 5th)

for (let i = 0; i < colors.length; i++) {
  console.log(`My ${i + 1}${suffixes[i]} choice is ${colors[i]}`);
}
