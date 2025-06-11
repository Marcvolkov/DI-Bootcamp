// 1. Global variable to hold all the <strong> elements
let allBoldItems;

// 2. Collect all bold items inside the paragraph
function getBoldItems() {
  // Finds every <strong> inside our specific <p>
  allBoldItems = document.querySelectorAll('#text strong');
}

// 3. Change color of all bold text to blue
function highlight() {
  allBoldItems.forEach(item => {
    item.style.color = 'blue';
  });
}

// 4. Change color of all bold text back to black
function returnItemsToDefault() {
  allBoldItems.forEach(item => {
    item.style.color = 'black';
  });
}

// 5. Wire it all up once the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // a) Gather the bold items
  getBoldItems();

  // b) Get the paragraph
  const paragraph = document.getElementById('text');

  // c) On mouseover, highlight
  paragraph.addEventListener('mouseover', highlight);

  // d) On mouseout, return to default
  paragraph.addEventListener('mouseout', returnItemsToDefault);
});
