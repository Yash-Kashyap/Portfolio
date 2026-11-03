import { WA, EMAIL, MISSIONS, SERVICES } from '../data/site';
import { showToast } from './toast';

export interface ContactState {
  mission: number | null;
  selectedServices: number[];
  msg: string;
  waHref: string;
  mailHref: string;
}

const state: {
  mission: number | null;
  selectedServices: number[];
} = {
  mission: null,
  selectedServices: [],
};

export function getContactState(): ContactState {
  const titles = state.selectedServices.map((i) => SERVICES[i]?.title).filter(Boolean);
  let msg =
    state.mission !== null
      ? `Hi Yash, I need: ${MISSIONS[state.mission]} for my business.`
      : 'Hi Yash, I need a website for my business.';

  if (titles.length) {
    msg += ` I'm interested in: ${titles.join(', ')}.`;
  }

  const subject =
    state.mission !== null
      ? 'Project: ' + MISSIONS[state.mission]
      : 'New project enquiry';

  const waHref = `${WA}?text=${encodeURIComponent(msg)}`;
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg)}`;

  return {
    mission: state.mission,
    selectedServices: [...state.selectedServices],
    msg,
    waHref,
    mailHref,
  };
}

export function updateContactUI() {
  const current = getContactState();

  // Update all WhatsApp links
  document.querySelectorAll<HTMLAnchorElement>('[data-wa-link]').forEach((el) => {
    el.href = current.waHref;
  });

  // Update all Mail links
  document.querySelectorAll<HTMLAnchorElement>('[data-mail-link]').forEach((el) => {
    el.href = current.mailHref;
  });

  // Update Mission radio buttons
  document.querySelectorAll<HTMLButtonElement>('[data-mission-btn]').forEach((btn) => {
    const idx = Number(btn.dataset.missionBtn);
    const isSelected = state.mission === idx;
    btn.setAttribute('aria-checked', isSelected ? 'true' : 'false');

    const dotEl = btn.querySelector('[data-mission-dot]');
    if (dotEl) {
      dotEl.textContent = isSelected ? '● Selected' : '○';
    }

    if (isSelected) {
      btn.style.backgroundColor = 'var(--ink)';
      btn.style.color = 'var(--paper)';
      btn.style.borderColor = 'var(--ink)';
    } else {
      btn.style.backgroundColor = 'transparent';
      btn.style.color = 'var(--ink)';
      btn.style.borderColor = 'var(--hair)';
    }
  });

  // Update Mission status text
  const statusEl = document.getElementById('mission-status');
  if (statusEl) {
    if (state.mission !== null) {
      statusEl.textContent = `✓ Mission selected: ${MISSIONS[state.mission]}`;
      statusEl.style.color = 'var(--ink)';
    } else {
      statusEl.textContent = 'Select a mission — I’ll pre-fill the message for you';
      statusEl.style.color = 'var(--mute)';
    }
  }

  // Update Services cards
  document.querySelectorAll<HTMLElement>('[data-service-card]').forEach((card) => {
    const idx = Number(card.dataset.serviceCard);
    const isSelected = state.selectedServices.includes(idx);
    card.setAttribute('aria-pressed', isSelected ? 'true' : 'false');

    const tagEl = card.querySelector<HTMLElement>('[data-service-tag]');
    if (tagEl) {
      tagEl.textContent = isSelected ? '✓ Added' : '+ Add to message';
      tagEl.style.backgroundColor = isSelected ? '#F1EDE4' : 'var(--acc)';
      tagEl.style.color = '#0F0E0C';
    }

    if (isSelected) {
      card.style.borderColor = 'var(--acc)';
      card.style.boxShadow =
        '0 0 0 1px var(--acc), 0 30px 60px -30px rgba(255,74,28,.45)';
    } else {
      card.style.borderColor = 'var(--hair)';
      card.style.boxShadow = 'none';
    }
  });

  window.dispatchEvent(
    new CustomEvent('portfolio:contact-update', { detail: current })
  );
}

export function setMission(idx: number) {
  state.mission = state.mission === idx ? null : idx;
  updateContactUI();
}

export function toggleService(idx: number) {
  const exists = state.selectedServices.includes(idx);
  if (exists) {
    state.selectedServices = state.selectedServices.filter((x) => x !== idx);
  } else {
    state.selectedServices.push(idx);
    const title = SERVICES[idx]?.title || 'Service';
    showToast(`Added “${title}” to your message ✓`, 2400);
  }
  updateContactUI();
}

export function initMissionAndServices() {
  // Mission radio clicks
  document.querySelectorAll<HTMLButtonElement>('[data-mission-btn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.missionBtn);
      setMission(idx);
    });
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const idx = Number(btn.dataset.missionBtn);
        setMission(idx);
      }
    });
  });

  // Services card clicks
  document.querySelectorAll<HTMLElement>('[data-service-card]').forEach((card) => {
    card.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).closest('a')) return;
      const idx = Number(card.dataset.serviceCard);
      toggleService(idx);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if ((e.target as HTMLElement).closest('a')) return;
        e.preventDefault();
        const idx = Number(card.dataset.serviceCard);
        toggleService(idx);
      }
    });
  });

  // Copy email button
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const done = () => showToast('Copied! Talk soon.');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(EMAIL).then(done, done);
      } else {
        done();
      }
    });
  }

  // Social rows hover effect
  document.querySelectorAll<HTMLAnchorElement>('[data-social-row]').forEach((row) => {
    const arrow = row.querySelector<HTMLElement>('[data-social-arrow]');
    row.addEventListener('mouseenter', () => {
      row.style.backgroundColor = 'var(--acc)';
      row.style.color = '#fff';
      if (arrow) arrow.style.transform = 'rotate(45deg)';
    });
    row.addEventListener('mouseleave', () => {
      row.style.backgroundColor = 'transparent';
      row.style.color = 'var(--ink)';
      if (arrow) arrow.style.transform = 'rotate(0deg)';
    });
  });

  updateContactUI();
}

