// Exercise 2: Shopping List

const stock = { 
    banana: 6, 
    apple: 0,
    pear: 12,
    orange: 32,
    blueberry: 1
  };
  
  const prices = {    
    banana: 4, 
    apple: 2, 
    pear: 1,
    orange: 1.5,
    blueberry: 10
  };
  
  const shoppingList = ["banana", "orange", "apple"]; // 1 of each in the cart
  
  function myBill() {
    let total = 0;
    
    for (let item of shoppingList) {
      // Check if item exists in stock and is in stock (> 0)
      if (item in stock && stock[item] > 0) {
        total += prices[item];   // add its price to total
        stock[item]--;            // bonus: decrease the stock by 1
      } else {
        console.log(`${item} is out of stock.`);
      }
    }
    
    return total;
  }
  
  // Call the function and log the result
  const totalPrice = myBill();
  console.log("Total price:", totalPrice);
  
  // (Optional) View updated stock after purchase
  console.log("Updated stock:", stock);
  