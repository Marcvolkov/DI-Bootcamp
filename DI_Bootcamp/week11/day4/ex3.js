// 1. Create a promise that immediately resolves with the value 3
const promiseResolved = Promise.resolve(3);

// You can handle it with .then:
promiseResolved
  .then(value => console.log("Resolved with:", value))  // → "Resolved with: 3"
  .catch(err => console.error(err));                     // (won’t run)

// 2. Create a promise that immediately rejects with the string "Boo!"
const promiseRejected = Promise.reject("Boo!");

// You can handle it with .catch:
promiseRejected
  .then(value => console.log(value))                     
  .catch(error => console.log("Rejected with:", error)); // → "Rejected with: Boo!"
