// Exercise 1: Scope

// #1
function funcOne() {
    let a = 5;
    if(a > 1) {
        a = 3;  // reassigns local `a` from 5 to 3
    }
    alert(`inside the funcOne function ${a}`); // alerts: inside the funcOne function 3
}

// #1.1 - run in the console:
// funcOne()  // Result: alert shows "inside the funcOne function 3"

// #1.2 - What if declared with const instead of let?
// If we wrote `const a = 5;` then `a = 3;` would throw a TypeError: Assignment to constant variable.


//#2
a = 0;  // assuming global: let a = 0; or var a
function funcTwo() {
    a = 5;  // reassigns the global `a` to 5
}

function funcThree() {
    alert(`inside the funcThree function ${a}`); // alerts current global `a`
}

// #2.1 - run in the console:
// funcThree()  // alerts: "inside the funcThree function 0"
// funcTwo()    // sets global a = 5
// funcThree()  // alerts: "inside the funcThree function 5"

// #2.2 - What if declared with const instead of let?
// If we did `const a = 0;`, then inside funcTwo, `a = 5;` would throw a TypeError: Assignment to constant variable.


//#3
function funcFour() {
    window.a = "hello";  // creates/overwrites global `a` property on window
}

function funcFive() {
    alert(`inside the funcFive function ${a}`); // reads global `a` from window
}

// #3.1 - run in the console:
// funcFour()  // sets window.a = "hello"
// funcFive()  // alerts: "inside the funcFive function hello"


//#4
let a = 1;  // global a
function funcSix() {
    let a = "test";   // local a shadows global
    alert(`inside the funcSix function ${a}`); // alerts local a: "test"
}

// #4.1 - run in the console:
// funcSix()  // alerts: "inside the funcSix function test"

// #4.2 - What if declared with const instead of let?
// Using `const a = "test";` inside funcSix would behave the same (block-scoped constant), so alert still shows "test".


//#5
let b = 2;  // rename outer to avoid conflict with previous `a`
if (true) {
    let b = 5;  // block-scoped, shadows outer b
    alert(`in the if block ${b}`);  // alerts: "in the if block 5"
}
alert(`outside of the if block ${b}`);  // alerts: "outside of the if block 2"

// #5.1 - run the code in the console
// → first alert: "in the if block 5"; second alert: "outside of the if block 2"

// #5.2 - What if declared with const instead of let?
// If `const b = 5;` in the if-block, it still creates a block-scoped constant. Behavior identical to let here: first alert 5, then outer 2.
