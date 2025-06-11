// 1. Retrieve the form and console.log it
const form = document.getElementById('userForm');
console.log('Form element:', form);

// 2. Retrieve the inputs by their id and console.log them
const inputFirst = document.getElementById('fname');
const inputLast  = document.getElementById('lname');
console.log('By ID:', inputFirst, inputLast);

// 3. Retrieve the inputs by their name attribute and console.log them
const inputByName = document.getElementsByName('firstname')[0];
const inputByName2 = document.getElementsByName('lastname')[0];
console.log('By name:', inputByName, inputByName2);

// 4. Handle form submission
form.addEventListener('submit', function(event) {
  // preventDefault stops the browser from reloading the page
  // and submitting the form to a server
  event.preventDefault();

  // get values and trim whitespace
  const firstValue = inputFirst.value.trim();
  const lastValue  = inputLast.value.trim();

  // check they’re not empty
  if (!firstValue || !lastValue) {
    alert('Please fill in both first name and last name.');
    return;
  }

  // create <li> elements
  const ul = document.querySelector('.usersAnswer');
  ul.innerHTML = ''; // clear previous answers if any

  const liFirst = document.createElement('li');
  liFirst.textContent = firstValue;

  const liLast = document.createElement('li');
  liLast.textContent = lastValue;

  // append to the <ul>
  ul.appendChild(liFirst);
  ul.appendChild(liLast);

  // (optional) reset the form
  form.reset();
});
