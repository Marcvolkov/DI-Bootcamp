// Exercise 5: Family

// 1. Create an object called family with a few key–value pairs.
const family = {
    father: "John",
    mother: "Jane",
    son: "Michael",
    daughter: "Emily",
    pet: "Buddy"
  };
  
  // 2. Using a for…in loop, console.log the keys of the object.
  for (let member in family) {
    console.log(member);
  }
  
  // 3. Using a for…in loop, console.log the values of the object.
  for (let member in family) {
    console.log(family[member]);
  }
  