const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];

// 1) Display choices
colors.forEach((color, index) => {
  console.log(`${index + 1}# choice is ${color}.`);
});

// 2) Check for "Violet"
if (colors.includes("Violet")) {
  console.log("Yeah");
} else {
  console.log("No...");
}
