// ===== Loader =====
const loaderBar = document.getElementById('loaderBar');
const loader = document.getElementById('loader');
let progress = 0;

const loaderInterval = setInterval(() => {
  progress += Math.random() * 12 + 3;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loaderInterval);
    setTimeout(() => {
      loader.classList.add('done');
      setTimeout(() => { loader.style.display = 'none'; }, 1200);
    }, 300);
  }
  loaderBar.style.width = progress + '%';
}, 80);

// ===== Custom Cursor =====
const cursor = document.getElementById('cursor');
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
  // Lerp frame-rate independent: misma suavidad a 60, 120 o 144 Hz
  const k = 1 - Math.pow(0.82, delta / 16.67);
  cursorX += (mouseX - cursorX) * k;
  cursorY += (mouseY - cursorY) * k;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  requestAnimationFrame(animateCursor);
}
requestAnimationFrame(animateCursor);

// Cursor states
document.querySelectorAll('a, button, .project, .magnetic').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});
document.querySelectorAll('p, .about-body, .hero-intro').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('text'); cursor.classList.remove('hover'); });
  el.addEventListener('mouseleave', () => cursor.classList.remove('text'));
});

// ===== Project Preview =====
const preview = document.getElementById('preview');
const previewInner = document.getElementById('previewInner');
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

// ===== Magnetic Buttons =====
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

// ===== Scroll Reveal =====
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

// ===== Smooth Scroll for Nav Links =====
document.querySelectorAll('.nav-links a, .nav-logo').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

// ===== Nav background on scroll =====
let lastScroll = 0;
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 100) {
    nav.style.padding = '16px 48px';
  } else {
    nav.style.padding = '24px 48px';
  }
  lastScroll = currentScroll;
}, { passive: true });
