const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
const ordinal = ["th", "st", "nd", "rd"];

colors.forEach((color, index) => {
  const rank = index + 1;
  // Use ternary operator to pick "st","nd","rd" for 1–3, else "th"
  const suffix = rank <= 3 ? ordinal[rank] : ordinal[0];
  console.log(`${rank}${suffix} choice is ${color}.`);
});
