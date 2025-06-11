(function(username) {
    const navbar = document.getElementById('navbar');
  
    // Create the container div
    const userBox = document.createElement('div');
    userBox.className = 'user-box';
  
    // Create the image (you could replace the URL with the real profile URL)
    const img = document.createElement('img');
    img.src = 'https://via.placeholder.com/32'; 
    img.alt = username + "'s avatar";
  
    // Create the text node
    const nameSpan = document.createElement('span');
    nameSpan.textContent = `Welcome, ${username}!`;
  
    // Append image and name to the box
    userBox.appendChild(img);
    userBox.appendChild(nameSpan);
  
    // Finally, append the user-box to the navbar
    navbar.appendChild(userBox);
  })('John');
  