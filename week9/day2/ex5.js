// 1. Function declaration
function kgToGramsDecl(kg) {
    return kg * 1000;
  }
  // Invoke
  console.log(kgToGramsDecl(2)); // 2000
  
  // 2. Function expression
  const kgToGramsExpr = function(kg) {
    return kg * 1000;
  };
  // Invoke
  console.log(kgToGramsExpr(3.5)); // 3500
  
  // Difference: A function declaration is hoisted and available before it's defined in code; 
  // a function expression is not hoisted in the same way and only exists after the assignment.
  
  // 3. One‑line arrow function
  const kgToGramsArrow = kg => kg * 1000;
  // Invoke
  console.log(kgToGramsArrow(0.75)); // 750
  