document.addEventListener('DOMContentLoaded', () => {
    // 1) Array of planets: name, color, number of moons
    const planets = [
      { name: "Mercury", color: "#bebebe", moons: 0 },
      { name: "Venus",   color: "#e5c07b", moons: 0 },
      { name: "Earth",   color: "#61afef", moons: 1 },
      { name: "Mars",    color: "#e06c75", moons: 2 },
      { name: "Jupiter", color: "#d19a66", moons: 4 }, // showing 4 of 79 for demo
      { name: "Saturn",  color: "#c678dd", moons: 3 }, // showing 3 of 82 for demo
      { name: "Uranus",  color: "#56b6c2", moons: 2 }, // showing 2 of 27 for demo
      { name: "Neptune", color: "#98c379", moons: 1 }  // showing 1 of 14 for demo
    ];
  
    // 2) Grab the <section> container
    const container = document.querySelector('.listPlanets');
  
    planets.forEach(planet => {
      // create planet div
      const p = document.createElement('div');
      p.classList.add('planet');
      p.style.backgroundColor = planet.color;
      p.style.display = 'inline-block';
      p.style.margin = '10px';
      
      // optional: label the planet
      const label = document.createElement('span');
      label.textContent = planet.name;
      label.style.color = 'white';
      label.style.fontSize = '14px';
      label.style.position = 'absolute';
      label.style.bottom = '-20px';
      p.appendChild(label);
  
      // append planet to the container
      container.appendChild(p);
  
      // 3) BONUS: create its moons
      for (let i = 0; i < planet.moons; i++) {
        const m = document.createElement('div');
        m.classList.add('moon');
        // spread moons around the planet in a line for demo
        m.style.left = `${10 + i * 25}px`;
        m.style.top  = `${10}px`;
        p.appendChild(m);
      }
    });
  });
  