// Optimized Cursor Glow Effect
const cursorGlow = document.getElementById('cursor-glow');
let isMoving = false;

function updateCursor(e) {
  if (!isMoving) {
    requestAnimationFrame(() => {
      if (cursorGlow) {
        cursorGlow.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
      }
      isMoving = false;
    });
    isMoving = true;
  }
}

// Throttled mouse move
document.addEventListener('mousemove', updateCursor);

document.addEventListener('mouseenter', () => {
  if (cursorGlow) cursorGlow.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
  if (cursorGlow) cursorGlow.style.opacity = '0';
});