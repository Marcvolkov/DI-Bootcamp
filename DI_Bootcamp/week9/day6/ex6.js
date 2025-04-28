// Q: [2] === [2]? and {} === {}?  
//console.log([2] === [2], {} === {});
// → false false  (arrays/objects are compared by reference)

// Objects by reference:
const object1 = { number: 5 };
const object2 = object1;
const object3 = object2;
const object4 = { number: 5 };
object1.number = 4;
console.log(object2.number); // 4 (same reference)
console.log(object3.number); // 4 (same reference)
console.log(object4.number); // 5 (different object)

// Animal & Mammal classes
class Animal {
  constructor(name, type, color) {
    this.name = name;
    this.type = type;
    this.color = color;
  }
}

class Mammal extends Animal {
  sound(soundStr) {
    return `${soundStr} I'm a ${this.type}, named ${this.name} and I'm ${this.color}`;
  }
}

// farmerCow instance
const farmerCow = new Mammal('Lily', 'cow', 'brown and white');
console.log(farmerCow.sound('Moooo'));  
// → "Moooo I'm a cow, named Lily and I'm brown and white"
