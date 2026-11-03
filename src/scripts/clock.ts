export function initClock() {
  function updClock() {
    const d = new Date();
    const hms = d.toLocaleTimeString('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    document.querySelectorAll<HTMLElement>('[data-clock]').forEach((el) => {
      el.textContent = el.dataset.clock === 'hms' ? hms : hms.slice(0, 5);
    });
  }
  updClock();
  return setInterval(updClock, 1000);
}

