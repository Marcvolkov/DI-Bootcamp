window.addEventListener('DOMContentLoaded', () => {
    // 1. Retrieve the div and console.log it
    const container = document.getElementById('container');
    console.log(container);
  
    // Grab both <ul class="list"> elements
    const lists = document.querySelectorAll('ul.list');
    const firstUl = lists[0];
    const secondUl = lists[1];
  
    // 2. Change "Pete" to "Richard"
    firstUl.querySelectorAll('li').forEach(li => {
      if (li.textContent === 'Pete') {
        li.textContent = 'Richard';
      }
    });
  
    // 3. Delete the second <li> of the second <ul>
    const secondUlItems = secondUl.querySelectorAll('li');
    if (secondUlItems[1]) {
      secondUl.removeChild(secondUlItems[1]);
    }
  
    // 4. Change the first <li> of each <ul> to your name
    const myName = 'Mark';
    lists.forEach(ul => {
      const firstLi = ul.querySelector('li');
      if (firstLi) firstLi.textContent = myName;
    });
  
    // 5. Add class "student_list" to both <ul>'s
    lists.forEach(ul => ul.classList.add('student_list'));
  
    // 6. Add classes "university" and "attendance" to the first <ul>
    firstUl.classList.add('university', 'attendance');
  
    // 7. Style the <div>: light blue background and padding
    container.style.backgroundColor = 'lightblue';
    container.style.padding = '20px';
  
    // 8. Hide the <li> that contains "Dan"
    lists.forEach(ul => {
      ul.querySelectorAll('li').forEach(li => {
        if (li.textContent === 'Dan') {
          li.style.display = 'none';
        }
      });
    });
  
    // 9. Add a border to the <li> that contains "Richard"
    firstUl.querySelectorAll('li').forEach(li => {
      if (li.textContent === 'Richard') {
        li.style.border = '1px solid black';
      }
    });
  
    // 10. Change the font size of the whole body
    document.body.style.fontSize = '18px';
  
    // Bonus: if the div’s background is light blue, alert “Hello x and y”
    if (container.style.backgroundColor === 'lightblue') {
      // Get the original users from the first list before we renamed to Mark & Richard
      // (If you want the dynamically changed names, just map firstUl.querySelectorAll('li'))
      const originalNames = ['John', 'Pete'];  
      alert(`Hello ${originalNames.join(' and ')}`);
    }
  });
  