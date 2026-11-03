export function initCursor() {
  if (
    !matchMedia('(pointer:fine)').matches ||
    matchMedia('(prefers-reduced-motion:reduce)').matches
  ) {
    return;
  }

  document.documentElement.classList.add('nocur');

  const cur = document.getElementById('cur') as HTMLElement | null;
  const curLabel = document.getElementById('cur-label') as HTMLElement | null;
  if (!cur || !curLabel) return;

  let grown = false;

  const onMove = (e: MouseEvent) => {
    cur.style.opacity = '1';
    cur.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;

    const target = e.target as HTMLElement | null;
    const v = !!(target && target.closest && target.closest('[data-view]'));
    const link = !v && !!(target && target.closest && target.closest('a, button'));
    const size = v ? 72 : link ? 22 : 8;

    cur.style.width = size + 'px';
    cur.style.height = size + 'px';
    cur.style.margin = `-${size / 2}px 0 0 -${size / 2}px`;
    cur.style.mixBlendMode = link ? 'difference' : 'normal';

    if (v !== grown) {
      grown = v;
      curLabel.style.opacity = v ? '1' : '0';
    }
  };

  const onLeave = () => {
    cur.style.opacity = '0';
  };

  window.addEventListener('mousemove', onMove);
  document.addEventListener('mouseleave', onLeave);

  return () => {
    window.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseleave', onLeave);
    document.documentElement.classList.remove('nocur');
  };
}

