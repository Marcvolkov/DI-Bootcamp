function myMove() {
    const box       = document.getElementById("animate");
    const container = document.getElementById("container");
    const maxRight  = container.clientWidth - box.clientWidth; // 400 - 50 = 350
    let pos = 0;
  
    const id = setInterval(frame, 1);
  
    function frame() {
      if (pos >= maxRight) {
        clearInterval(id);
      } else {
        pos++;
        box.style.left = pos + "px";
      }
    }
  }
  