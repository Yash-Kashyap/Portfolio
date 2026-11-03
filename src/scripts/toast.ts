let toastTimer: number | undefined;

export function showToast(msg: string, ms = 2400, showLink = false) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  const toastLink = document.getElementById('toast-link');
  if (!toast || !toastText) return;

  clearTimeout(toastTimer);
  toastText.textContent = msg;

  if (toastLink) {
    if (showLink) {
      toastLink.classList.remove('hidden');
      toastLink.onclick = () => hideToast();
    } else {
      toastLink.classList.add('hidden');
    }
  }

  toast.style.opacity = '1';
  toast.style.pointerEvents = 'auto';

  toastTimer = window.setTimeout(() => {
    hideToast();
  }, ms);
}

export function hideToast() {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.style.opacity = '0';
    toast.style.pointerEvents = 'none';
  }
}

export function initReturningVisitorToast() {
  try {
    if (localStorage.getItem('yk-visited')) {
      setTimeout(() => {
        showToast("Oh hey, you're back 👋 Want to see PikkNDrop again?", 6000, true);
      }, 1800);
    }
    localStorage.setItem('yk-visited', '1');
  } catch (e) {}
}

