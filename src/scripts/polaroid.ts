export function initPolaroid() {
  const el = document.getElementById('polaroid');
  if (!el) return;

  const onPointerDown = (e: PointerEvent) => {
    // Only primary button
    if (e.button !== 0) return;
    const sx = e.clientX;
    const sy = e.clientY;
    const [ox, oy] = (el.dataset.xy || '0,0').split(',').map(Number);

    if (el.setPointerCapture) {
      try {
        el.setPointerCapture(e.pointerId);
      } catch (err) {}
    }
    el.style.cursor = 'grabbing';

    const onPointerMove = (ev: PointerEvent) => {
      const x = ox + ev.clientX - sx;
      const y = oy + ev.clientY - sy;
      el.dataset.xy = `${x},${y}`;
      el.style.translate = `${x}px ${y}px`;
    };

    const onPointerUp = (ev: PointerEvent) => {
      el.style.cursor = 'grab';
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      if (el.releasePointerCapture) {
        try {
          el.releasePointerCapture(ev.pointerId);
        } catch (err) {}
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  el.addEventListener('pointerdown', onPointerDown);

  return () => {
    el.removeEventListener('pointerdown', onPointerDown);
  };
}

