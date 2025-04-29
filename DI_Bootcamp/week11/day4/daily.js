// 1. makeAllCaps: uppercases an array if all items are strings
function makeAllCaps(words) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(words)) {
        return reject("Input is not an array");
      }
      const allStrings = words.every(w => typeof w === "string");
      if (allStrings) {
        const uppercased = words.map(w => w.toUpperCase());
        resolve(uppercased);
      } else {
        reject("Not all items are strings");
      }
    });
  }
  
  // 2. sortWords: sorts the array if its length > 4
  function sortWords(words) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(words)) {
        return reject("Input is not an array");
      }
      if (words.length > 4) {
        const sorted = words.slice().sort(); // slice() to avoid mutating original
        resolve(sorted);
      } else {
        reject("Array length is not greater than 4");
      }
    });
  }
  
  // Tests:
  
  // 1) Contains non-strings → catch
  makeAllCaps([1, "pear", "banana"])
    .then(arr => sortWords(arr))
    .then(result => console.log(result))
    .catch(error => console.log("Error:", error));
  // → Error: Not all items are strings
  
  // 2) All strings but length ≤ 4 → catch
  makeAllCaps(["apple", "pear", "banana"])
    .then(arr => sortWords(arr))
    .then(result => console.log(result))
    .catch(error => console.log("Error:", error));
  // → Error: Array length is not greater than 4
  
  // 3) All strings and length > 4 → resolve & sorted output
  makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
    .then(arr => sortWords(arr))
    .then(result => console.log(result))
    .catch(error => console.log("Error:", error));
  // → [ "APPLE", "BANANA", "KIWI", "MELON", "PEAR" ]
  