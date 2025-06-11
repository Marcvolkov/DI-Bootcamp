const people = ["Greg", "Mary", "Devon", "James"];

// Part I – Review About Arrays
// 1. Remove “Greg”
people.shift();  
// 2. Replace “James” with “Jason”
people[people.indexOf("James")] = "Jason";
// 3. Add your name to the end
people.push("Mark");
// 4. Log Mary’s index
console.log("Mary is at index:", people.indexOf("Mary"));
// 5. Copy array without “Mary” or “Mark”
const newPeople = people.slice(1, people.length - 1);
console.log("Copied (no Mary, no Mark):", newPeople);
// 6. Index of "Foo" (not found)
console.log("Index of 'Foo':", people.indexOf("Foo"));  // -1
// 7. Last element
const last = people[people.length - 1];
console.log("Last element is:", last);

// Part II – Loops
// 1. Log each person
for (let i = 0; i < people.length; i++) {
  console.log(people[i]);
}
// 2. Log until “Devon” then exit
for (let i = 0; i < people.length; i++) {
  console.log(people[i]);
  if (people[i] === "Devon") break;
}
