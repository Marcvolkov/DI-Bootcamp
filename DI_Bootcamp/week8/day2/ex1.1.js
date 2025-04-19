document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const clearBtn  = document.getElementById('clear');
  
    // ─── Part I ────────────────────────────────────────────────────────────────
    // Alert “Hello World” after 2 seconds
    setTimeout(() => {
      alert('Hello World');
    }, 2000);
  
    // ─── Part II ───────────────────────────────────────────────────────────────
    // Add a <p>Hello World</p> after 2 seconds
    setTimeout(() => {
      const p = document.createElement('p');
      p.textContent = 'Hello World';
      container.appendChild(p);
    }, 2000);
  
    // ─── Part III ──────────────────────────────────────────────────────────────
    // Every 2 seconds add <p>Hello World</p>, stop when:
    //   • user clicks “Clear Interval” button
    //   • OR container has 5 paragraphs
    let intervalId = setInterval(() => {
      const p = document.createElement('p');
      p.textContent = 'Hello World';
      container.appendChild(p);
  
      // if we've reached 5 paragraphs, stop
      if (container.querySelectorAll('p').length >= 5) {
        clearInterval(intervalId);
      }
    }, 2000);
  
    // Clear on button click
    clearBtn.addEventListener('click', () => {
      clearInterval(intervalId);
    });
  });
  