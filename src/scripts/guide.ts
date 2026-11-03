import { GUIDE, POSE, POSE_NAMES } from '../data/site';

const EASE = 'cubic-bezier(.2,.7,0,1)';
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export interface GuideManager {
  updateScroll: (y: number, vh: number, activeProjectIdx: number) => void;
  toggleGuide: () => void;
  isGuideRightAndBig: () => boolean;
  destroy: () => void;
}

export function initGuide(): GuideManager {
  const g = document.getElementById('guide') as HTMLElement | null;
  const gface = document.getElementById('guide-face') as HTMLElement | null;
  const gmini = document.getElementById('guide-mini') as HTMLElement | null;
  const bubble = document.getElementById('guide-bubble') as HTMLElement | null;
  const gtext = document.getElementById('guide-text') as HTMLElement | null;
  const gtag = document.getElementById('guide-tag') as HTMLElement | null;
  const poseImgs = document.querySelectorAll<HTMLImageElement>('[data-pose]');

  let guideOpen = true;
  let gMode: 'hidden' | 'big' | 'mini' = 'hidden';
  let gSide: 'left' | 'right' = 'left';
  let curKey = 'top';
  let typedKey = '';
  let introDone = false;
  let typeTimer: number | undefined;

  let gX: number | null = null;
  let gB = 0;
  let gM = 0;
  let gRot = 0;
  let gVel = 0;
  let gLastY: number | null = null;
  let gRaf: number = 0;

  // Preload poses
  POSE_NAMES.forEach((name) => {
    const img = new Image();
    img.src = `/assets/poses3d/${name}.png`;
  });

  function updatePoses(key: string) {
    const cur = POSE[key] || POSE.top || 'wave';
    const [cn, cf] = cur.split('|');
    const isFlipped = !!cf;

    poseImgs.forEach((img) => {
      const name = img.dataset.pose;
      const on = name === cn;
      const sx = on && isFlipped ? -1 : 1;
      if (on) {
        img.style.opacity = '1';
        img.style.transform = `scale(${sx},1) translateY(0)`;
        img.style.filter = 'blur(0px)';
      } else {
        img.style.opacity = '0';
        img.style.transform = `scale(${sx * 0.94},0.94) translateY(4%)`;
        img.style.filter = 'blur(6px)';
      }
    });
  }

  function typeGuide(key: string) {
    if (!gtext) return;
    key = key || curKey || 'top';
    typedKey = key;
    const guideItem = GUIDE[key] || GUIDE.top;
    const [tag, msg] = guideItem;

    if (gtag) gtag.textContent = tag;

    clearInterval(typeTimer);
    gtext.textContent = '';
    let i = 0;
    typeTimer = window.setInterval(() => {
      i += 2;
      gtext.textContent = msg.slice(0, i);
      if (i >= msg.length) clearInterval(typeTimer);
    }, 22);

    if (bubble && guideOpen) {
      // animate `scale`, not `transform`: transform holds the position set in gLoop
      bubble.animate([{ scale: '.85' }, { scale: '1' }], {
        duration: 450,
        easing: EASE,
      });
    }

    if (gface) {
      gface.animate(
        [
          { translate: '0 0' },
          { translate: '0 -10px' },
          { translate: '0 0' },
        ],
        { duration: 420, easing: 'cubic-bezier(.3,1.6,.5,1)' }
      );
    }
  }

  function setAriaLabels() {
    const label = guideOpen ? 'Hide Yash’s tour' : 'Show Yash’s tour';
    if (gface) gface.setAttribute('title', label);
    if (gmini) gmini.setAttribute('aria-label', label);
  }

  function toggle() {
    guideOpen = !guideOpen;
    setAriaLabels();
    if (guideOpen) {
      typeGuide(curKey);
    } else {
      if (bubble) bubble.style.opacity = '0';
    }
  }

  if (gface) gface.addEventListener('click', toggle);
  if (gmini) gmini.addEventListener('click', toggle);
  setAriaLabels();

  function gLoop() {
    if (!g) return;
    const W = window.innerWidth;
    const mob = W < 768;
    const gx = mob ? 16 : 32;
    const rail = mob ? 0 : 48;
    const gw = g.offsetWidth || 300;
    const gh = g.offsetHeight || 400;

    const tx = gSide === 'left' ? rail + gx - gw * 0.08 : W - gx - gw * 0.92;
    const tb = gMode === 'big' ? 1 : 0;
    const tm = gMode === 'mini' ? 1 : 0;

    if (gX == null) gX = tx;
    const k = gB < 0.05 ? 1 : 0.08;
    gX += (tx - gX) * k;
    gB += (tb - gB) * 0.1;
    gM += (tm - gM) * 0.16;
    gRot +=
      (clamp(gVel * 0.25 + (tx - gX) * 0.02, -7, 7) - gRot) * 0.12;
    gVel *= 0.85;

    const bob = Math.sin(performance.now() / 600) * 4;

    g.style.opacity = gB > 0.02 ? '1' : '0';
    g.style.transform = `translate3d(${gX.toFixed(1)}px,${(
      (1 - gB) * gh * 1.05 +
      bob
    ).toFixed(1)}px,0)`;

    if (gface) gface.style.transform = `rotate(${gRot.toFixed(2)}deg)`;
    if (gmini) gmini.style.transform = `scale(${Math.max(0, gM).toFixed(3)})`;

    if (bubble) {
      const show = guideOpen && (gB > 0.7 || gM > 0.7);
      bubble.style.opacity = show ? '1' : '0';
      const bw = bubble.offsetWidth || 240;
      let bx: number;
      let by: number;

      if (gB >= gM) {
        bx = gSide === 'left' ? gX + gw * 0.7 : gX + gw * 0.3 - bw;
        by = gh * 0.82 - (1 - gB) * gh + bob;
        bubble.style.borderRadius =
          gSide === 'left' ? '16px 16px 16px 4px' : '16px 16px 4px 16px';
      } else {
        bx = rail + gx + 78;
        by = (mob ? 84 : 24) + 8;
        bubble.style.borderRadius = '16px 16px 16px 4px';
      }

      bubble.style.transform = `translate3d(${Math.max(
        8,
        Math.min(W - bw - 8, bx)
      ).toFixed(1)}px,${(-by).toFixed(1)}px,0)`;
    }

    gRaf = requestAnimationFrame(gLoop);
  }

  gRaf = requestAnimationFrame(gLoop);

  // Intro delay before initial typing
  setTimeout(() => {
    introDone = true;
    typeGuide(curKey);
  }, 1600);

  function updateScroll(y: number, vh: number, activeProjectIdx: number) {
    let key = 'top';
    const sectionIds = [
      'what',
      'work',
      'services',
      'process',
      'about',
      'mission',
      'contact',
      'footer',
    ];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < vh * 0.5) {
        key = id;
      }
    });

    if (key === 'work') {
      key = 'work' + activeProjectIdx;
    }

    if (key !== curKey) {
      curKey = key;
      updatePoses(key);
      if (introDone && key !== typedKey && key !== 'top') {
        typeGuide(key);
      }
    }

    const mob = window.innerWidth < 768;
    let mode: 'hidden' | 'big' | 'mini' = 'mini';
    let side: 'left' | 'right' = gSide || 'left';

    if (key === 'top') {
      mode = 'hidden';
    } else if (key === 'what') {
      mode = 'big';
      side = 'left';
    } else if (key.startsWith('work')) {
      mode = 'big';
      // Even project index (0, 2, 4) -> guide is on the right
      // Odd project index (1, 3) -> guide is on the left
      const pIdx = Number(key.replace('work', ''));
      side = pIdx % 2 !== 0 ? 'left' : 'right';
    } else if (key === 'contact') {
      mode = 'big';
      side = 'right';
    }

    if (mob && mode === 'big') {
      mode = 'mini';
    }

    gMode = mode;
    gSide = side;

    gVel = y - (gLastY == null ? y : gLastY);
    gLastY = y;
  }

  // Initial pose set
  updatePoses('top');

  return {
    updateScroll,
    toggleGuide: toggle,
    isGuideRightAndBig: () => gMode === 'big' && gSide === 'right',
    destroy() {
      cancelAnimationFrame(gRaf);
      clearInterval(typeTimer);
      if (gface) gface.removeEventListener('click', toggle);
      if (gmini) gmini.removeEventListener('click', toggle);
    },
  };
}

