document.addEventListener('DOMContentLoaded', () => {
    // 1. Change the div’s id from "navBar" to "socialNetworkNavigation"
    const navBarDiv = document.getElementById('navBar');
    navBarDiv.setAttribute('id', 'socialNetworkNavigation');
  
    // 2. Add a new <li>Logout</li> to the <ul>
    const ul = document.querySelector('#socialNetworkNavigation ul');
    const newLi = document.createElement('li');
    newLi.textContent = 'Logout';
    ul.appendChild(newLi);
  
    // 3. Retrieve and display the first & last <li> text
    const firstLi = ul.firstElementChild;
    const lastLi  = ul.lastElementChild;
    console.log('First link text:', firstLi.textContent);
    console.log('Last link text:',  lastLi.textContent);
  });
  