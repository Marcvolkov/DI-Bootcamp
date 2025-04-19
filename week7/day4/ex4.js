// Exercise 4: Building Management

const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
      firstFloor: 3,
      secondFloor: 4,
      thirdFloor: 9,
      fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent: {
      sarah: [3, 990],
      dan:  [4, 1000],
      david: [1, 500],
    },
  };
  
  // 1. Log the number of floors in the building.
  console.log("Number of floors:", building.numberOfFloors);
  
  // 2. Log how many apartments are on floors 1 and 3.
  console.log(
    "Apartments on 1st floor:",
    building.numberOfAptByFloor.firstFloor
  );
  console.log(
    "Apartments on 3rd floor:",
    building.numberOfAptByFloor.thirdFloor
  );
  
  // 3. Log the name of the second tenant and the number of rooms he has.
  const secondTenant = building.nameOfTenants[1]; // "Dan"
  const danRooms = building.numberOfRoomsAndRent.dan[0];
  console.log(
    `${secondTenant} has ${danRooms} room${danRooms > 1 ? "s" : ""} in his apartment.`
  );
  
  // 4. Check if Sarah’s rent + David’s rent is greater than Dan’s rent.
  //    If so, increase Dan’s rent to 1200.
  const sarahRent = building.numberOfRoomsAndRent.sarah[1];
  const davidRent = building.numberOfRoomsAndRent.david[1];
  const danRent = building.numberOfRoomsAndRent.dan[1];
  
  if (sarahRent + davidRent > danRent) {
    building.numberOfRoomsAndRent.dan[1] = 1200;
    console.log("Dan's rent has been increased to:", building.numberOfRoomsAndRent.dan[1]);
  } else {
    console.log("No change to Dan's rent:", building.numberOfRoomsAndRent.dan[1]);
  }
  