// Create a promise that resolves after 4 seconds with “success”
const delayedSuccess = new Promise((resolve) => {
    setTimeout(() => {
      resolve("success");
    }, 4000);
  });
  
  // Example usage:
  delayedSuccess.then(result => console.log(result));  // logs "success" after 4 seconds
  