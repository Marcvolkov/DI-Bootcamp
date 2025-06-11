const users = [
    { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
    { firstName: 'Chloe',   lastName: 'Alnaji', role: 'Full Stack Resident' },
    { firstName: 'Jonathan',lastName: 'Baughn', role: 'Enterprise Instructor' },
    { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
    { firstName: 'Robert',  lastName: 'Hajek',  role: 'Full Stack Resident' },
    { firstName: 'Wes',     lastName: 'Reid',   role: 'Instructor' },
    { firstName: 'Zach',    lastName: 'Klabunde', role: 'Instructor' }
  ];
  
  // 1. Map to ["Hello Bradley", ...]
  const welcomeStudents = users.map(u => `Hello ${u.firstName}`);
  console.log(welcomeStudents);
  // → ["Hello Bradley", "Hello Chloe", "Hello Jonathan", "Hello Michael", "Hello Robert", "Hello Wes", "Hello Zach"]
  
  // 2. Filter only Full Stack Residents
  const fullStackResidents = users.filter(u => u.role === 'Full Stack Resident');
  console.log(fullStackResidents);
  /* → [
    { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
    { firstName: 'Chloe',   lastName: 'Alnaji', role: 'Full Stack Resident' },
    { firstName: 'Robert',  lastName: 'Hajek',  role: 'Full Stack Resident' }
  ] */
  
  // 3. Bonus: Chain filter + map to get last names of Full Stack Residents
  const fsResidentLastNames = 
    users
      .filter(u => u.role === 'Full Stack Resident')
      .map(u => u.lastName);
  
  console.log(fsResidentLastNames);
  // → ["Bouley", "Alnaji", "Hajek"]
  