import type { GuideManager } from './guide';

const EASE = 'cubic-bezier(.2,.7,0,1)';
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export function initScroll(guideManager: GuideManager) {
  const header = document.getElementById('header');
  const pct = document.getElementById('scroll-pct');
  const pill = document.getElementById('floating-pill');
  const contact = document.getElementById('contact');
  const svc = document.getElementById('services');
  const track = document.getElementById('services-track');
  const trackWrap = document.getElementById('services-track-wrap');
  const svcCount = document.getElementById('services-counter');
  const svcBar = document.getElementById('services-bar');
  const stmt = document.getElementById('stmt-text');

  let lastY = window.scrollY;
  let rafId = 0;
  let activeProject = 0;
  let isMenuOpen = false;

  const reducedMotion = matchMedia('(prefers-reduced-motion:reduce)').matches;

  function updateMenuState(open: boolean) {
    isMenuOpen = open;
  }

  function setServiceProgress(p: number) {
    const n = Math.min(5, Math.floor(p * 4.999) + 1);
    if (svcCount) svcCount.textContent = `0${n} / 05`;
    if (svcBar) svcBar.style.width = `${20 + p * 80}%`;
  }

  // Handle mobile track scroll
  if (trackWrap) {
    trackWrap.addEventListener(
      'scroll',
      (e) => {
        if (window.innerWidth < 768) {
          const w = e.currentTarget as HTMLElement;
          const max = Math.max(1, w.scrollWidth - w.clientWidth);
          setServiceProgress(w.scrollLeft / max);
        }
      },
      { passive: true }
    );
  }

  function measureServices() {
    if (svc && track && trackWrap) {
      if (window.innerWidth < 768) {
        svc.style.height = 'auto';
      } else {
        const over = track.scrollWidth - trackWrap.clientWidth;
        svc.style.height = `${Math.round(window.innerHeight + Math.max(0, over))}px`;
      }
    }
  }

  measureServices();
  window.addEventListener('resize', measureServices);

  // Reveals setup
  const revealElements = Array.from(
    document.querySelectorAll<HTMLElement>('[data-rv], [data-chat]')
  );

  revealElements.forEach((el) => {
    if (reducedMotion) {
      el.dataset.done = 'true';
      return;
    }
    if (el.dataset.rv === 'wipe') {
      el.style.clipPath = 'inset(0 0 100% 0)';
    } else {
      el.style.opacity = '0';
    }
  });

  function triggerReveal(el: HTMLElement) {
    el.dataset.done = 'true';
    if (reducedMotion) {
      el.style.opacity = '1';
      el.style.clipPath = '';
      return;
    }

    if (el.dataset.rv === 'wipe') {
      const a = el.animate(
        [
          { clipPath: 'inset(0 0 100% 0)', transform: 'scale(1.08)' },
          { clipPath: 'inset(0 0 0% 0)', transform: 'scale(1)' },
        ],
        { duration: 1000, easing: EASE }
      );
      a.onfinish = () => {
        el.style.clipPath = '';
      };
    } else if (el.dataset.chat === 'yash') {
      const ty = el.previousElementSibling as HTMLElement | null;
      const isTyping = ty && ty.hasAttribute('data-typing');
      const show = () => {
        if (isTyping && ty) ty.style.display = 'none';
        el.style.opacity = '1';
        el.animate(
          [
            { opacity: 0, transform: 'translateY(12px) scale(.96)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 500, easing: EASE }
        );
      };
      if (isTyping && ty) {
        ty.style.display = 'flex';
        setTimeout(show, 850);
      } else {
        setTimeout(show, 250);
      }
    } else {
      el.style.opacity = '1';
      el.animate(
        [
          { opacity: 0, transform: 'translateY(12px)' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 500, easing: EASE }
      );
    }
  }

  function checkReveals(vh: number) {
    revealElements.forEach((el) => {
      if (el.dataset.done) return;
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.86 && r.bottom > 0) {
        triggerReveal(el);
      }
    });
  }

  function tick() {
    const y = window.scrollY;
    const vh = window.innerHeight;
    const max = document.documentElement.scrollHeight - vh;

    // Header hide on scroll down
    if (header) {
      const menu = document.getElementById('mobile-menu');
      const menuOpen = !!(menu && menu.style.display === 'flex');
      const hide = y > lastY && y > 140 && !menuOpen;
      header.style.transform = hide ? 'translateY(-100%)' : 'none';
    }
    lastY = y;

    // Scroll percentage
    if (pct) {
      const percent = Math.round(clamp(y / (max || 1), 0, 1) * 100);
      pct.textContent = `${String(percent).padStart(3, '0')}%`;
    }

    // Active project frame tracking
    const frames = document.querySelectorAll<HTMLElement>('[data-frame]');
    let a = 0;
    frames.forEach((f, i) => {
      if (f.getBoundingClientRect().top < vh * 0.55) {
        a = i;
      }
    });
    if (a !== activeProject) {
      activeProject = a;
      // Dispatch custom event for project frame change
      window.dispatchEvent(
        new CustomEvent('portfolio:project-change', { detail: { index: a } })
      );
    }

    // Parallax on mobile mockup inside desktop project frame
    if (!reducedMotion) {
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const parent = el.parentElement;
        if (!parent) return;
        const r = parent.getBoundingClientRect();
        const offset = (r.top + r.height / 2 - vh / 2) * -0.07;
        el.style.transform = `translateY(${offset.toFixed(1)}px)`;
      });
    }

    // Services track horizontal scroll (desktop)
    if (svc && track && trackWrap && window.innerWidth >= 768) {
      const r = svc.getBoundingClientRect();
      const dist = r.height - vh;
      const p = dist > 0 ? clamp(-r.top / dist, 0, 1) : 0;
      const over = track.scrollWidth - trackWrap.clientWidth;
      track.style.transform = `translate3d(${(-p * over).toFixed(1)}px,0,0)`;
      setServiceProgress(p);
    }

    // Statement words reading effect
    if (stmt) {
      stmt.querySelectorAll<HTMLElement>('[data-w]').forEach((el) => {
        const t = clamp((vh * 0.88 - el.getBoundingClientRect().top) / (vh * 0.42), 0, 1);
        el.style.opacity = (0.2 + 0.8 * t).toFixed(2);
      });
    }

    // Reveals
    checkReveals(vh);

    // Guide tick
    guideManager.updateScroll(y, vh, activeProject);

    // Floating pill hiding
    if (pill && contact) {
      const hide =
        contact.getBoundingClientRect().top < vh * 0.75 ||
        guideManager.isGuideRightAndBig();
      pill.style.opacity = hide ? '0' : '1';
      pill.style.pointerEvents = hide ? 'none' : 'auto';
      pill.style.transform = hide ? 'translateY(12px)' : 'none';
    }
  }

  const onScroll = () => {
    if (!rafId) {
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        tick();
      });
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // Initial tick
  setTimeout(() => {
    tick();
  }, 30);

  return {
    tick,
    updateMenuState,
    destroy() {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measureServices);
    },
  };
}
