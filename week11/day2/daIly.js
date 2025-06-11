document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');
    const out  = document.getElementById('output');
  
    form.addEventListener('submit', event => {
      event.preventDefault();
  
      // 1. Retrieve values
      const name     = document.getElementById('name').value.trim();
      const lastname = document.getElementById('lastname').value.trim();
  
      // 2. Build object
      const data = { name, lastname };
  
      // 3. Convert to JSON and append to DOM
      out.textContent = JSON.stringify(data);
  
      // (Optional) reset form
      // form.reset();
    });
  });
  