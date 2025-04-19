// Exercise 7: Secret Group

const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];

// 1. Extract the first letter of each name
const initials = names.map(name => name[0]);

// 2. Sort the initials alphabetically
initials.sort();

// 3. Join them into the secret society name
const secretSocietyName = initials.join("");

console.log(secretSocietyName);  // → "ABJKPS"
