const API_KEY = 'hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My';
const searchTerm = 'sun';
const limit = 10;
const offset = 2;
const rating = 'g';

const url = `https://api.giphy.com/v1/gifs/search` +
  `?api_key=${API_KEY}` +
  `&q=${encodeURIComponent(searchTerm)}` +
  `&limit=${limit}` +
  `&offset=${offset}` +
  `&rating=${rating}`;

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} — ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    // data.data is an array of 10 GIF objects (starting at index 2)
    // data.meta contains status/info
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
