// Exercise 1: Find The Numbers Divisible By 23 (with bonus divisor parameter)

function displayNumbersDivisible(divisor = 23) {
    let sum = 0;
    let output = '';
  
    // Loop from 0 through 500
    for (let i = 0; i <= 500; i++) {
      if (i % divisor === 0) {
        output += i + ' ';
        sum += i;
      }
    }
  
    // Trim trailing space and log results
    console.log(output.trim());
    console.log('Sum :', sum);
  }
  
  // Original exercise: numbers divisible by 23
  displayNumbersDivisible(); 
  // → 0 23 46 69 92 115 138 161 184 207 230 253 276 299 322 345 368 391 414 437 460 483
  //   Sum : 5313
  
  // Bonus examples:
  displayNumbersDivisible(3);
  // → 0 3 6 … 498
  //   Sum : 41583
  
  displayNumbersDivisible(45);
  // → 0 45 90 … 495
  //   Sum : 5775
  