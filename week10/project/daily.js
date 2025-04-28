/**
 * Checks whether two strings are anagrams of each other.
 * Ignores spaces, punctuation, and is case-insensitive.
 * @param {string} str1 
 * @param {string} str2 
 * @returns {boolean}
 */
function isAnagram(str1, str2) {
    // Helper: normalize a string by removing non-letters, lowercasing, and sorting characters
    const normalize = s =>
      s
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')  // remove spaces/punctuation
        .split('')
        .sort()
        .join('');
    
    return normalize(str1) === normalize(str2);
  }
  
  // Examples:
  console.log(isAnagram("Astronomer",     "Moon starer"));      // true
  console.log(isAnagram("School master",  "The classroom"));     // true
  console.log(isAnagram("The Morse Code", "Here come dots"));    // true
  
  console.log(isAnagram("Hello",           "Olelh"));            // true
  console.log(isAnagram("Not anagram",     "Definitely no"));    // false
  