const epic = ['a', 'long', 'time', 'ago', 'in a', 'galaxy', 'far far', 'away'];

const starWarsOpening = epic.reduce(
  (sentence, word) => `${sentence} ${word}`
);

console.log(starWarsOpening);
// → "a long time ago in a galaxy far far away"
