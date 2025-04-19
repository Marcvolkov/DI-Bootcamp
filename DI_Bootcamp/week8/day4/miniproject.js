// 1) Configuration
const COLORS = [
    'red','orangered','orange',
    'yellow','yellowgreen','lightgreen',
    'green','turquoise','aqua',
    'skyblue','dodgerblue','blue',
    'navy','purple','magenta',
    'pink','lightpink','lightgray',
    'gray','black','white'
  ];
  const CANVAS_SIZE = 48 * 48; // 48×48 cells
  
  // 2) State
  let selectedColor = COLORS[0];
  let isDrawing = false;
  
  // 3) Grab containers
  const paletteEl = document.querySelector('.palette');
  const canvasEl  = document.querySelector('.canvas');
  const clearBtn  = document.getElementById('clear');
  
  // 4) Build the color palette
  COLORS.forEach(c => {
    const swatch = document.createElement('div');
    swatch.className = 'color';
    swatch.style.backgroundColor = c;
    if (c === selectedColor) swatch.classList.add('selected');
    swatch.addEventListener('click', () => {
      // update selection
      document.querySelector('.palette .selected')
        .classList.remove('selected');
      swatch.classList.add('selected');
      selectedColor = c;
    });
    paletteEl.appendChild(swatch);
  });
  
  // 5) Build the canvas grid
  for (let i = 0; i < CANVAS_SIZE; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    // paint-on-click
    cell.addEventListener('mousedown', () => {
      isDrawing = true;
      cell.style.backgroundColor = selectedColor;
    });
    // paint-on-drag
    cell.addEventListener('mouseover', () => {
      if (isDrawing) {
        cell.style.backgroundColor = selectedColor;
      }
    });
    // stop drawing on mouseup anywhere
    document.addEventListener('mouseup', () => isDrawing = false);
  
    canvasEl.appendChild(cell);
  }
  
  // 6) Clear button
  clearBtn.addEventListener('click', () => {
    document.querySelectorAll('.canvas .cell')
      .forEach(cell => cell.style.backgroundColor = 'white');
  });
  