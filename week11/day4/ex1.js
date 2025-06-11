/**
 * Returns a Promise that resolves if num ≤ 10, rejects if num > 10.
 * @param {number} num
 * @returns {Promise<string>}
 */
function compareToTen(num) {
    return new Promise((resolve, reject) => {
      if (num <= 10) {
        resolve(`${num} is less than or equal to 10`);
      } else {
        reject(`${num} is greater than 10`);
      }
    });
  }
  
  // Test: should reject
  compareToTen(15)
    .then(result => console.log("Resolved:", result))
    .catch(error  => console.log("Rejected:", error));
  
  // Test: should resolve
  compareToTen(8)
    .then(result => console.log("Resolved:", result))
    .catch(error  => console.log("Rejected:", error));
  