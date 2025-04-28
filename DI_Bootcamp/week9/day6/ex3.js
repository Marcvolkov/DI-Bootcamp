const users = { user1: 18273, user2: 92833, user3: 90315 };

// Part 1: Object → array of [key, value]
const arrUsers = Object.entries(users);
console.log(arrUsers);
// → [ ['user1', 18273], ['user2', 92833], ['user3', 90315] ]

// Part 2: multiply IDs by 2
const doubled = Object.entries(users)
  .map(([user, id]) => [user, id * 2]);
console.log(doubled);
// → [ ['user1', 36546], ['user2', 185666], ['user3', 180630] ]