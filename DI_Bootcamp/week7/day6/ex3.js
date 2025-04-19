// Exercise 3: What’s In My Wallet?

function changeEnough(itemPrice, amountOfChange) {
    // amountOfChange: [quarters, dimes, nickels, pennies]
    const [quarters, dimes, nickels, pennies] = amountOfChange;
  
    // Calculate total in dollars
    const totalChange =
      quarters * 0.25 +
      dimes    * 0.10 +
      nickels  * 0.05 +
      pennies  * 0.01;
  
    // Can we afford the item?
    return totalChange >= itemPrice;
  }
  
  // Examples:
  console.log(changeEnough(14.11, [2, 100, 0, 0]));  // false: 2*0.25 + 100*0.10 = 0.50 + 10.00 = 10.50
  console.log(changeEnough(0.75,  [0, 0, 20, 5]));    // true: 20*0.05 + 5*0.01 = 1.00 + 0.05 = 1.05
  console.log(changeEnough(19.99, [50, 0, 0, 0]));   // true: 50*0.25 = 12.50 (false), but let's test a higher amount
  console.log(changeEnough(12.50, [50, 0, 0, 0]));   // true: 50*0.25 = 12.50
  