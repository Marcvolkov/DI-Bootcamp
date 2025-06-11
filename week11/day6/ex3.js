async function fetchStarship() {
    try {
      const response = await fetch("https://www.swapi.tech/api/starships/9/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data.result);
    } catch (error) {
      console.error("Error fetching starship:", error);
    }
  }
  
  fetchStarship();
  