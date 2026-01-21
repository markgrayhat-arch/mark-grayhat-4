// Lightweight site script: AOS init, mobile menu toggle, counters
document.addEventListener('DOMContentLoaded', function () {
  // Initialize AOS (if library loaded)
  if (window.AOS && typeof AOS.init === 'function') {
    AOS.init({ once: true });
  }

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggle && navMenu) {
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('open');
    });
  }

  // Simple stat counter animation
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.getAttribute('data-target') || '0', 10);
    if (isNaN(target) || target <= 0) {
      el.textContent = String(target);
      return;
    }
    let current = 0;
    const duration = 1200;
    const stepTime = Math.max(10, Math.floor(duration / target));
    const timer = setInterval(() => {
      current += Math.ceil(target / (duration / stepTime));
      if (current >= target) {
        el.textContent = String(target);
        clearInterval(timer);
      } else {
        el.textContent = String(current);
      }
    }, stepTime);
  });

  // Minimal accessibility: hide decorative icons from assistive tech
  document.querySelectorAll('i').forEach(i => {
    // If icon is purely decorative (no title/aria-label and inside non-interactive element)
    const hasLabel = i.hasAttribute('aria-label') || i.hasAttribute('title') || i.closest('a') || i.closest('button');
    if (!hasLabel) {
      i.setAttribute('aria-hidden', 'true');
      i.setAttribute('focusable', 'false');
    }
  });

  // Placeholder: matrix rain - only add a minimal fallback if element exists
  const matrix = document.getElementById('matrixRain');
  if (matrix) {
    // If full matrix script will be added later, leave placeholder opacity; otherwise fallback is handled in CSS
    matrix.style.opacity = matrix.style.opacity || '0.05';
  }
});
