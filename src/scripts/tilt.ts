export function initTilt() {
  const card = document.getElementById('player-card');
  if (!card) return;

  const onMouseMove = (e: MouseEvent) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `rotateY(${(x * 12).toFixed(2)}deg) rotateX(${(-y * 12).toFixed(2)}deg)`;
  };

  const onMouseLeave = () => {
    card.style.transform = '';
  };

  card.addEventListener('mousemove', onMouseMove);
  card.addEventListener('mouseleave', onMouseLeave);

  return () => {
    card.removeEventListener('mousemove', onMouseMove);
    card.removeEventListener('mouseleave', onMouseLeave);
  };
}

