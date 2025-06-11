// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // 1. Retrieve the form and console.log it
    const form = document.getElementById('userForm');
    console.log('Form element:', form);
  
    // 2. Retrieve the inputs by their id and console.log them
    const inputFname = document.getElementById('fname');
    const inputLname = document.getElementById('lname');
    console.log('Inputs by ID:', inputFname, inputLname);
  
    // 3. Retrieve the inputs by their name attribute and console.log them
    const inputByName1 = document.getElementsByName('firstname')[0];
    const inputByName2 = document.getElementsByName('lastname')[0];
    console.log('Inputs by name:', inputByName1, inputByName2);
  
    // 4. Handle form submission
    form.addEventListener('submit', function(event) {
      // Prevent the browser from reloading the page on form submit
      event.preventDefault();
  
      // 5. Get and trim the values
      const firstName = inputFname.value.trim();
      const lastName  = inputLname.value.trim();
  
      // 6. Ensure they are not empty
      if (!firstName || !lastName) {
        alert('Please fill in both first and last name.');
        return;
      }
  
      // 7. Create an <li> for each and append to the <ul>
      const ul = document.querySelector('.usersAnswer');
      ul.innerHTML = ''; // clear any previous entries
  
      const li1 = document.createElement('li');
      li1.textContent = firstName;
      const li2 = document.createElement('li');
      li2.textContent = lastName;
  
      ul.appendChild(li1);
      ul.appendChild(li2);
  
      // (Optional) reset the form fields
      form.reset();
    });
  });
  