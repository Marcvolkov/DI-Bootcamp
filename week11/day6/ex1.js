const GIPHY_API_URL =  
  "https://api.giphy.com/v1/gifs/search" +
  "?q=hilarious" +
  "&rating=g" +
  "&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

fetch(GIPHY_API_URL)
  .then(response => {
    // Check HTTP status
    if (!response.ok) {
      throw new Error(`Network response was not ok (status ${response.status})`);
    }
    return response.json();      // parse JSON body
  })
  .then(data => {
    console.log(data);           // Your JavaScript object
    // e.g. data.data is an array of GIF objects, data.meta has status, etc.
  })
  .catch(error => {
    console.error("Fetch error:", error);
  });
