// 1) Data source
const robots = [
    { id: 1,  name: 'Leanne Graham',      email: 'Sincere@april.biz',        image: 'https://robohash.org/1?200x200' },
    { id: 2,  name: 'Ervin Howell',       email: 'Shanna@melissa.tv',       image: 'https://robohash.org/2?200x200' },
    { id: 3,  name: 'Clementine Bauch',   email: 'Nathan@yesenia.net',      image: 'https://robohash.org/3?200x200' },
    { id: 4,  name: 'Patricia Lebsack',   email: 'Julianne.OConner@kory.org',image: 'https://robohash.org/4?200x200' },
    { id: 5,  name: 'Chelsey Dietrich',   email: 'Lucio_Hettinger@annie.ca', image: 'https://robohash.org/5?200x200' },
    { id: 6,  name: 'Mrs. Dennis Schulist',email: 'Karley_Dach@jasper.info',  image: 'https://robohash.org/6?200x200' },
    { id: 7,  name: 'Kurtis Weissnat',    email: 'Telly.Hoeger@billy.biz',   image: 'https://robohash.org/7?200x200' },
    { id: 8,  name: 'Nicholas Runolfsdottir V',email: 'Sherwood@rosamond.me',image: 'https://robohash.org/8?200x200' },
    { id: 9,  name: 'Glenna Reichert',    email: 'Chaim_McDermott@dana.io',  image: 'https://robohash.org/9?200x200' },
    { id: 10, name: 'Clementina DuBuque', email: 'Rey.Padberg@karina.biz',   image: 'https://robohash.org/10?200x200' }
  ];
  
  // 2) Grab elements
  const container = document.getElementById('cardContainer');
  const searchBox = document.getElementById('searchBox');
  
  // 3) Render function
  function render(list) {
    container.innerHTML = ''; // clear
    list.forEach(robot => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${robot.image}" alt="${robot.name}" />
        <div class="info">
          <h2>${robot.name}</h2>
          <p>${robot.email}</p>
        </div>
      `;
      container.appendChild(card);
    });
  }
  
  // 4) Initial display
  render(robots);
  
  // 5) Filter on input
  searchBox.addEventListener('input', e => {
    const term = e.target.value.toLowerCase();
    const filtered = robots.filter(r =>
      r.name.toLowerCase().includes(term)
    );
    render(filtered);
  });
  