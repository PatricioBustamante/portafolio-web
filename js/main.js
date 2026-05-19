// ===== Accessibility · motion & input preferences =====
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(pointer: fine)');

function finishLoader() {
  if (!loader) return;
  loader.classList.add('done');
  loader.setAttribute('aria-hidden', 'true');
  setTimeout(() => { loader.style.display = 'none'; }, reduceMotion.matches ? 0 : 1200);
}

// ===== Loader =====
const loaderBar = document.getElementById('loaderBar');
const loader = document.getElementById('loader');

if (reduceMotion.matches) {
  if (loaderBar) loaderBar.style.width = '100%';
  finishLoader();
} else {
  let progress = 0;
  const loaderInterval = setInterval(() => {
    progress += Math.random() * 12 + 3;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loaderInterval);
      setTimeout(finishLoader, 300);
    }
    if (loaderBar) loaderBar.style.width = progress + '%';
  }, 80);
}

// ===== Custom Cursor (only on fine pointer + motion-allowing) =====
const cursor = document.getElementById('cursor');
const CURSOR_PREF_KEY = 'pb:cursor';
const cursorSupported = cursor && finePointer.matches && !reduceMotion.matches;

function readCursorPref() {
  try { return localStorage.getItem(CURSOR_PREF_KEY); } catch { return null; }
}
function writeCursorPref(val) {
  try { localStorage.setItem(CURSOR_PREF_KEY, val); } catch {}
}

// Default: enabled if supported. User can override via footer toggle (persists).
let cursorEnabled = cursorSupported && readCursorPref() !== 'off';

function applyCursorState() {
  if (cursorEnabled) {
    cursor.style.display = '';
    document.body.classList.add('has-custom-cursor');
  } else {
    if (cursor) cursor.style.display = 'none';
    document.body.classList.remove('has-custom-cursor');
  }
  document.querySelectorAll('.cursor-toggle').forEach(btn => {
    btn.setAttribute('aria-pressed', String(cursorEnabled));
    const stateEl = btn.querySelector('.cursor-toggle-state');
    if (stateEl) stateEl.textContent = cursorEnabled ? 'On' : 'Off';
  });
}

if (cursorSupported) {
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let cursorLastTime = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor(timestamp) {
    const delta = cursorLastTime ? Math.min(timestamp - cursorLastTime, 50) : 16.67;
    cursorLastTime = timestamp;
    const k = 1 - Math.pow(0.82, delta / 16.67);
    cursorX += (mouseX - cursorX) * k;
    cursorY += (mouseY - cursorY) * k;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);

  document.querySelectorAll('a, button, .project, .magnetic').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
  document.querySelectorAll('p, .about-body, .hero-intro').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('text'); cursor.classList.remove('hover'); });
    el.addEventListener('mouseleave', () => cursor.classList.remove('text'));
  });

  // Switch to system cursor when navigating by keyboard, restore on mousemove
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && cursorEnabled) {
      document.body.classList.remove('has-custom-cursor');
    }
  });
  document.addEventListener('mousemove', () => {
    if (cursorEnabled) document.body.classList.add('has-custom-cursor');
  });
}

// Wire up the footer toggle. Hide it on unsupported devices.
document.querySelectorAll('.cursor-toggle').forEach(btn => {
  if (!cursorSupported) {
    btn.hidden = true;
    return;
  }
  btn.addEventListener('click', () => {
    cursorEnabled = !cursorEnabled;
    writeCursorPref(cursorEnabled ? 'on' : 'off');
    applyCursorState();
  });
});

applyCursorState();

// ===== Project Preview =====
const preview = document.getElementById('preview');
const previewInner = document.getElementById('previewInner');

if (preview && previewInner && finePointer.matches && !reduceMotion.matches) {
  const previewData = {
    '1': { title: 'Orbita', type: 'Fintech App' },
    '2': { title: 'Nimbus', type: 'SaaS Platform' },
    '3': { title: 'Mesa & Co.', type: 'E-commerce' },
    '4': { title: 'Hojaverde', type: 'Wellness App' },
    '5': { title: 'Atlas', type: 'Web Editorial' }
  };

  let previewX = 0, previewY = 0;
  let targetPreviewX = 0, targetPreviewY = 0;

  function animatePreview() {
    previewX += (targetPreviewX - previewX) * 0.1;
    previewY += (targetPreviewY - previewY) * 0.1;
    preview.style.left = previewX + 'px';
    preview.style.top = previewY + 'px';
    requestAnimationFrame(animatePreview);
  }
  animatePreview();

  document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('mouseenter', () => {
      const num = project.getAttribute('data-preview');
      const data = previewData[num];
      previewInner.className = 'project-preview-inner preview-' + num;
      previewInner.querySelector('.preview-title').textContent = data.title;
      previewInner.querySelector('.preview-type').textContent = data.type;
      preview.classList.add('active');
    });
    project.addEventListener('mouseleave', () => {
      preview.classList.remove('active');
    });
    project.addEventListener('mousemove', (e) => {
      targetPreviewX = e.clientX;
      targetPreviewY = e.clientY - 20;
    });
  });
}

// ===== Magnetic Buttons (skip if reduced motion or coarse pointer) =====
if (finePointer.matches && !reduceMotion.matches) {
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

// ===== Scroll Reveal =====
if (reduceMotion.matches) {
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
    el.classList.add('visible');
  });
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
    revealObserver.observe(el);
  });
}

// ===== Smooth Scroll for Nav Links =====
document.querySelectorAll('.nav-links a, .nav-logo').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: reduceMotion.matches ? 'auto' : 'smooth',
          block: 'start'
        });
        // Move focus to target for keyboard users
        if (target.hasAttribute('tabindex') === false) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    }
  });
});

// ===== Local Time =====
function updateTime() {
  const now = new Date();
  const options = { timeZone: 'America/Santiago', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const time = now.toLocaleTimeString('en-US', options);
  const el = document.getElementById('localTime');
  if (el) el.textContent = time + ' CLT';
}
updateTime();
setInterval(updateTime, 1000);

// ===== Mobile nav (hamburger) =====
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

function setMenuOpen(open) {
  document.body.classList.toggle('menu-open', open);
  if (navToggle) {
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  }
}

if (navToggle && navLinksEl) {
  navToggle.addEventListener('click', () => {
    setMenuOpen(!document.body.classList.contains('menu-open'));
  });

  navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
      setMenuOpen(false);
    }
  });

  const desktopMQ = window.matchMedia('(min-width: 769px)');
  desktopMQ.addEventListener('change', (e) => {
    if (e.matches) setMenuOpen(false);
  });
}

// ===== Nav background on scroll =====
const nav = document.querySelector('.nav');
const navScrollMQ = window.matchMedia('(min-width: 769px)');
window.addEventListener('scroll', () => {
  if (!navScrollMQ.matches) {
    nav.style.padding = '';
    return;
  }
  nav.style.padding = window.pageYOffset > 100
    ? 'var(--space-2) var(--container-px)'
    : 'var(--space-3) var(--container-px)';
}, { passive: true });
