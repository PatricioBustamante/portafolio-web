/* ============================================
   <site-header>  · custom element
   Renders the nav in light DOM so existing CSS
   selectors and main.js queries keep working.

   Attributes:
     current   "work" | "about" | (empty for home)
                 → marks the matching nav link with .is-active
   ============================================ */

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const current = (this.getAttribute('current') || '').toLowerCase();
    const inSubpage = window.location.pathname.includes('/pages/');
    const base = inSubpage ? '../' : '';
    const workHref = inSubpage ? 'work.html' : 'pages/work.html';
    const aboutHref = inSubpage ? 'about.html' : 'pages/about.html';
    const isWork = current === 'work' ? ' is-active' : '';
    const isAbout = current === 'about' ? ' is-active' : '';

    this.innerHTML = `
<nav class="nav" aria-label="Principal">
  <a href="${base}index.html" class="nav-logo magnetic" aria-label="Patricio Bustamante — Inicio">
    <img src="${base}assets/isotipo-personal.svg" alt="" class="nav-logo-mark" width="32" height="34">
    <span class="nav-logo-text">Patricio Bustamante</span>
  </a>

  <div class="nav-links" id="navLinks">
    <a href="${workHref}" class="magnetic${isWork}"${isWork ? ' aria-current="page"' : ''}><span class="nav-num">01</span>Proyectos</a>
    <a href="${aboutHref}" class="magnetic${isAbout}"${isAbout ? ' aria-current="page"' : ''}><span class="nav-num">02</span>Sobre mí</a>
    <a href="${base}index.html#contact" class="magnetic"><span class="nav-num">03</span>Contacto</a>
  </div>

  <p class="nav-status" role="status">
    <span class="status-dot" aria-hidden="true"></span>
    <span class="sr-only">Estado: </span>Disponible
  </p>

  <button class="nav-toggle" id="navToggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="navLinks">
    <span class="nav-toggle-bar" aria-hidden="true"></span>
    <span class="nav-toggle-bar" aria-hidden="true"></span>
    <span class="nav-toggle-bar" aria-hidden="true"></span>
  </button>
</nav>`;
  }
}

if (!customElements.get('site-header')) {
  customElements.define('site-header', SiteHeader);
}
/* ============================================
   <site-footer>  · custom element
   Renders the footer in light DOM. Auto-resolves
   relative paths based on URL depth.
   ============================================ */

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const inSubpage = window.location.pathname.includes('/pages/');
    const base = inSubpage ? '../' : '';
    const year = new Date().getFullYear();

    this.innerHTML = `
<footer role="contentinfo">
  <a href="${base}index.html" class="footer-logo magnetic" aria-label="Volver al inicio">
    <img src="${base}assets/isotipo-personal.svg" alt="" class="footer-logo-mark" width="32" height="34">
  </a>
  <p>&copy; ${year} — Patricio Bustamante</p>
  <p class="footer-time" id="localTime" aria-label="Hora local en Chile">--:--:-- CLT</p>
  <button type="button" class="cursor-toggle" aria-pressed="true" aria-label="Activar o desactivar cursor personalizado">
    Cursor <span class="cursor-toggle-state" aria-hidden="true">Activado</span>
  </button>
  <p>Hecho con cariño &middot; Chile</p>
</footer>`;
  }
}

if (!customElements.get('site-footer')) {
  customElements.define('site-footer', SiteFooter);
}
/* ============================================
   PROJECTS DATA · fuente única de los proyectos
   ----------------------------------------------
   Estructura por proyecto:
     num, preview, recentProject, visibleProject
     company, initial, title, category, year
     client, role, tags, summary
     challenge          → Desafío
     mainObjective      → Objetivo principal
     objectives[]       → Objetivos secundarios
     solution           → Solución
     processes[]        → Procesos realizados
     tools[]            → Herramientas utilizadas
     metrics[]          → { label, value, before, after, change }
     lessons[]          → Aprendizajes
   ============================================ */

window.PROJECTS = {

  'betterfly-onboarding': {
    num: '011', preview: 4,
    recentProject: true, visibleProject: true,
    company: 'Betterfly', initial: 'Bt',
    title: 'Onboarding / Enrolamiento', category: 'Insurtech', year: '2021',
    client: 'Betterfly',
    role: 'Product Designer',
    tags: ['Insurtech', 'Móvil', 'UX Research'],
    summary: 'Rediseño del flujo de enrolamiento para usuarios nuevos de seguro digital, reduciendo el abandono de 65% a 10% y el tiempo de completado de 12 a 5 minutos.',

    challenge: 'Mejorar el tiempo en que los usuarios completan el onboarding del producto, optimizando la comprensión del proceso y reduciendo el abandono durante el flujo.',

    mainObjective: 'Aumentar el número de usuarios que completen exitosamente el proceso de enrolamiento, asegurando una comprensión clara del producto contratado a través de sus empleadores.',

    objectives: [
      'Incrementar la comprensión de los beneficios y funcionalidades del producto durante el proceso de onboarding, mediante contenidos claros y contextualizados para cada tipo de usuario.',
      'Reducir los puntos de fricción dentro del flujo de enrolamiento, simplificando tareas, formularios y validaciones para disminuir el abandono del proceso.',
      'Mejorar la orientación y confianza de los usuarios durante el onboarding, incorporando ayudas visuales, feedback en tiempo real y estados de progreso claros.'
    ],

    solution: 'Se diseñó un proceso claro y transparente que explicaba de manera simple los productos incluidos en el plan, optimizando además el flujo mediante la reducción de pasos. Esto permitió disminuir en un 90% la cantidad de usuarios que abandonaban el proceso.',

    processes: [
      'Análisis completo del proceso de onboarding para detectar puntos de fricción, pasos innecesarios y momentos críticos donde los usuarios abandonaban el flujo.',
      'Optimización de la estructura del onboarding reduciendo la cantidad de pasos, acciones y decisiones que el usuario debía completar.',
      'Rediseño de la presentación de la información para explicar de manera clara y transparente los beneficios y productos incluidos en el plan contratado.',
      'Pruebas de usabilidad y seguimiento de métricas clave para evaluar el comportamiento de los usuarios e iterar mejoras continuas.'
    ],

    tools: [
      'Figma',
      'Google Analytics',
      'Hotjar',
      'Maze',
      'Jira'
    ],

    metrics: [
      {
        label: 'Tasa de finalización',
        value: '+43pp',
        before: '35%',
        after: '78%',
        change: '+43%'
      },
      {
        label: 'Abandono del flujo',
        value: '−55pp',
        before: '65%',
        after: '10%',
        change: '−85%'
      },
      {
        label: 'Tiempo de enrolamiento',
        value: '−58%',
        before: '12 min',
        after: '5 min',
        change: '−58%'
      },
      {
        label: 'Comprensión del producto',
        value: '+40pp',
        before: '45%',
        after: '85%',
        change: '+40%'
      }
    ],

    lessons: [
      'El diseño centrado en el usuario puede impactar directamente tanto en la experiencia como en los objetivos de negocio.',
      'A través de research, análisis de comportamiento y validación continua, es posible identificar fricciones clave y transformarlas en oportunidades de mejora.',
      'La simplificación del flujo y una comunicación más clara del producto aumentan la confianza del usuario y reducen significativamente el abandono del proceso.',
      'El trabajo colaborativo con equipos multidisciplinarios es fundamental para construir soluciones escalables, alineadas con las necesidades del usuario y los objetivos estratégicos.'
    ]
  },

};

/* Lista ordenada de slugs para navegación "siguiente proyecto". */
window.PROJECT_ORDER = Object.keys(window.PROJECTS);
/* ============================================
   <project-card>  · custom element
   Renders a project row in light DOM so existing
   CSS selectors and main.js queries keep working.

   Attributes:
     slug   key from window.PROJECTS
            → renders the full project row HTML
   ============================================ */

class ProjectCard extends HTMLElement {
  connectedCallback() {
    const slug = this.getAttribute('slug');
    const p = window.PROJECTS && window.PROJECTS[slug];
    if (!p) return;

    const inSubpage = window.location.pathname.includes('/pages/');
    const href = inSubpage
      ? `proyecto.html?slug=${slug}`
      : `pages/proyecto.html?slug=${slug}`;

    const esc = s => String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

    const tagsHtml = (p.tags || [])
      .map(t => `<span class="project-tag">${esc(t)}</span>`)
      .join('');

    const initial = p.initial || (p.company ? p.company[0] : '');

    const siblings = this.parentElement
      ? Array.from(this.parentElement.children).filter(el => el.tagName === 'PROJECT-CARD')
      : [];
    const listIndex = siblings.indexOf(this) + 1;
    const num = String(listIndex).padStart(2, '0');

    this.innerHTML = `
<a href="${href}" class="project" data-preview="${esc(p.preview)}" aria-label="Proyecto ${num}: ${esc(p.title)}, ${esc(p.category)} ${esc(p.year)}">
  <div class="project-num" aria-hidden="true">${num}</div>
  <div class="project-info">
    <div class="company-badge">
      <span class="company-logo-mark" aria-hidden="true">${esc(initial)}</span>
      <span class="company-badge-name">${esc(p.company || '')}</span>
    </div>
    <div class="project-title">${esc(p.title)}</div>
    <div class="project-subtitle">${esc(p.category)} &middot; ${esc(p.year)}</div>
  </div>
  <div class="project-desc">${esc(p.summary)}</div>
  <div class="project-tags">${tagsHtml}</div>
  <span class="project-arrow magnetic" aria-hidden="true">
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" focusable="false">
      <path d="M3 13L13 3M13 3H5M13 3V11"/>
    </svg>
  </span>
</a>`;
  }
}

if (!customElements.get('project-card')) {
  customElements.define('project-card', ProjectCard);
}
// ===== Auto-render project lists =====
(function renderProjectLists() {
  const projects = window.PROJECTS || {};
  document.querySelectorAll('[data-projects]').forEach(container => {
    const filter = container.getAttribute('data-projects');
    const slugs = Object.keys(projects).filter(slug => {
      const p = projects[slug];
      if (!p.visibleProject) return false;
      if (filter === 'recent') return p.recentProject === true;
      return true;
    });
    container.innerHTML = slugs.map(slug => `<project-card slug="${slug}"></project-card>`).join('');
  });
})();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(pointer: fine)');

// ===== Disable browser zoom (keyboard + scroll) =====
document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey) {
    if (['+', '-', '=', '_', '0'].includes(e.key)) e.preventDefault();
  }
}, { passive: false });
document.addEventListener('wheel', e => {
  if (e.ctrlKey) e.preventDefault();
}, { passive: false });

// ===== Loader =====
const loaderBar = document.getElementById('loaderBar');
const loader = document.getElementById('loader');

function finishLoader() {
  if (!loader) return;
  loader.classList.add('done');
  loader.setAttribute('aria-hidden', 'true');
  setTimeout(() => { loader.style.display = 'none'; }, reduceMotion.matches ? 0 : 1200);
}

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

// ===== Custom Cursor =====
const cursor = document.getElementById('cursor');
const CURSOR_PREF_KEY = 'pb:cursor';
const cursorSupported = cursor && finePointer.matches && !reduceMotion.matches;

function readCursorPref() {
  try { return localStorage.getItem(CURSOR_PREF_KEY); } catch { return null; }
}
function writeCursorPref(val) {
  try { localStorage.setItem(CURSOR_PREF_KEY, val); } catch {}
}

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
    if (stateEl) stateEl.textContent = cursorEnabled ? 'Activado' : 'Desactivado';
  });
}

let cursorRafId = null;
let cursorTick = null;

if (cursorSupported) {
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let cursorLastTime = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  cursorTick = function(timestamp) {
    const delta = cursorLastTime ? Math.min(timestamp - cursorLastTime, 50) : 16.67;
    cursorLastTime = timestamp;
    const k = 1 - Math.pow(0.65, delta / 16.67);
    cursorX += (mouseX - cursorX) * k;
    cursorY += (mouseY - cursorY) * k;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursorRafId = requestAnimationFrame(cursorTick);
  };
  cursorRafId = requestAnimationFrame(cursorTick);

  document.querySelectorAll('a, button, .project, .magnetic').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
  document.querySelectorAll('p, .about-body, .hero-intro').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('text'); cursor.classList.remove('hover'); });
    el.addEventListener('mouseleave', () => cursor.classList.remove('text'));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && cursorEnabled) document.body.classList.remove('has-custom-cursor');
  });
  document.addEventListener('mousemove', () => {
    if (cursorEnabled) document.body.classList.add('has-custom-cursor');
  });
}

document.querySelectorAll('.cursor-toggle').forEach(btn => {
  if (!cursorSupported) { btn.hidden = true; return; }
  btn.addEventListener('click', () => {
    cursorEnabled = !cursorEnabled;
    writeCursorPref(cursorEnabled ? 'on' : 'off');
    applyCursorState();
  });
});

applyCursorState();

// Pausa los bucles rAF cuando el usuario cambia de tab
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (cursorRafId) { cancelAnimationFrame(cursorRafId); cursorRafId = null; }
  } else {
    if (cursorTick && !cursorRafId) cursorRafId = requestAnimationFrame(cursorTick);
  }
});

// ===== Magnetic Buttons =====
if (finePointer.matches && !reduceMotion.matches) {
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

// ===== Scroll Reveal =====
if (reduceMotion.matches) {
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => el.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      // Libera la capa GPU compuesta después de que termina la transición
      entry.target.addEventListener('transitionend', () => {
        entry.target.style.willChange = 'auto';
      }, { once: true });
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .reveal-stagger, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    revealObserver.observe(el);
  });
}

// ===== Hero mark parallax =====
const heroMark = document.querySelector('.hero-mark');
if (heroMark && !reduceMotion.matches) {
  let parallaxFrame = null;
  function updateParallax() {
    parallaxFrame = null;
    const ratio = Math.min(window.scrollY / window.innerHeight, 1);
    heroMark.style.setProperty('--parallax-y', `${-ratio * 60}px`);
    heroMark.style.setProperty('--parallax-x', `${ratio * 40}px`);
  }
  window.addEventListener('scroll', () => {
    if (parallaxFrame === null) parallaxFrame = requestAnimationFrame(updateParallax);
  }, { passive: true });
  updateParallax();
}

// ===== Count-up animation =====
function animateCountUp(el, target, duration = 1400) {
  if (reduceMotion.matches) { el.textContent = target + (el.dataset.suffix || ''); return; }
  const suffix = el.dataset.suffix || '';
  const start = performance.now();
  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    el.textContent = Math.round(target * eased) + suffix;
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length) {
  const statObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const match = el.textContent.trim().match(/^(\d+)(.*)$/);
      if (match) {
        el.dataset.suffix = match[2];
        animateCountUp(el, parseInt(match[1], 10));
      }
      obs.unobserve(el);
    });
  }, { threshold: 0.4 });
  statNumbers.forEach(el => statObserver.observe(el));
}

// ===== Smooth Scroll =====
document.querySelectorAll('.nav-links a, .nav-logo').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    }
  });
});

// ===== Local Time =====
function updateTime() {
  const el = document.getElementById('localTime');
  if (!el) return;
  el.textContent = new Date().toLocaleTimeString('en-US', {
    timeZone: 'America/Santiago', hour12: false,
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  }) + ' CLT';
}
updateTime();
setInterval(updateTime, 1000);

// ===== Mobile nav =====
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

function setMenuOpen(open) {
  document.body.classList.toggle('menu-open', open);
  if (navToggle) {
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  }
  if (open) {
    const firstLink = navLinksEl && navLinksEl.querySelector('a');
    if (firstLink) firstLink.focus();
  } else {
    if (navToggle) navToggle.focus();
  }
}

function trapMenuFocus(e) {
  if (!document.body.classList.contains('menu-open') || e.key !== 'Tab') return;
  const focusables = [navToggle, ...navLinksEl.querySelectorAll('a')].filter(Boolean);
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

if (navToggle && navLinksEl) {
  navToggle.addEventListener('click', () => setMenuOpen(!document.body.classList.contains('menu-open')));
  navLinksEl.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) setMenuOpen(false);
  });
  document.addEventListener('keydown', trapMenuFocus);
  window.matchMedia('(min-width: 769px)').addEventListener('change', (e) => { if (e.matches) setMenuOpen(false); });
}

// ===== Nav scroll =====
const nav = document.querySelector('.nav');
if (nav) {
  const navScrollMQ = window.matchMedia('(min-width: 769px)');
  window.addEventListener('scroll', () => {
    if (!navScrollMQ.matches) { nav.style.padding = ''; return; }
    nav.style.padding = window.scrollY > 100
      ? 'var(--space-2) var(--container-px)'
      : 'var(--space-3) var(--container-px)';
  }, { passive: true });
}
