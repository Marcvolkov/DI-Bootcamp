// Grab DOM elements
const card    = document.getElementById('card');
const findBtn = document.getElementById('findBtn');

// Total characters in API
const MAX_CHAR = 83;

// Utility: show loading state
function showLoading() {
  card.innerHTML = `
    <i class="fas fa-spinner fa-pulse" style="font-size: 2rem;"></i>
    <p>Loading...</p>
  `;
}

// Utility: show error state
function showError() {
  card.innerHTML = `
    <p style="font-size: 1.2rem; color: #f28;">Oh No! That person isn't available.</p>
  `;
}

// Render character data into the card
function showCharacter({ name, height, gender, birth_year, homeworld }) {
  card.innerHTML = `
    <h2>${name}</h2>
    <p>Height: ${height}</p>
    <p>Gender: ${gender}</p>
    <p>Birth Year: ${birth_year}</p>
    <p>Home World: ${homeworld}</p>
  `;
}

// Fetch a random character + their homeworld
async function fetchRandomCharacter() {
  try {
    const id = Math.floor(Math.random() * MAX_CHAR) + 1;
    // 1) fetch character
    const resChar = await fetch(`https://www.swapi.tech/api/people/${id}`);
    if (!resChar.ok) throw new Error('Character fetch failed');
    const { result } = await resChar.json();
    const props = result.properties;

    // 2) fetch homeworld
    const resWorld = await fetch(props.homeworld);
    if (!resWorld.ok) throw new Error('Homeworld fetch failed');
    const { result: worldResult } = await resWorld.json();

    // 3) display
    showCharacter({
      name:       props.name,
      height:     props.height,
      gender:     props.gender,
      birth_year: props.birth_year,
      homeworld:  worldResult.properties.name
    });
  } catch (err) {
    console.error(err);
    showError();
  }
}

// Wire up button
findBtn.addEventListener('click', () => {
  showLoading();
  fetchRandomCharacter();
});
