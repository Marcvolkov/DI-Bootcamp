document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('MyForm');
    const radiusInput = document.getElementById('radius');
    const volumeInput = document.getElementById('volume');
  
    form.addEventListener('submit', event => {
      // Prevent page reload so we can handle the calculation in JS
      event.preventDefault();
  
      const r = parseFloat(radiusInput.value);
      if (isNaN(r) || r < 0) {
        alert('Please enter a valid non-negative number for radius.');
        return;
      }
  
      const volume = (4 / 3) * Math.PI * Math.pow(r, 3);
      // Display with two decimal places
      volumeInput.value = volume.toFixed(2);
    });
  });
  