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
   Cada entrada alimenta tanto la lista (work.html)
   como el template de detalle (proyecto.html).
   El "preview" mapea al gradiente .preview-{n}.
   El orden del objeto define el orden y el
   "siguiente proyecto" en el detalle.
   ============================================ */

window.PROJECTS = {
  'orbita-finance': {
    num: '001', preview: 1,
    company: 'Orbita', initial: 'Or',
    title: 'Orbita Finance', category: 'Fintech', year: '2026',
    role: 'Lead Product Designer', client: 'Orbita (startup fintech)',
    services: ['Sistema de Diseño', 'Diseño móvil', 'Investigación', 'Prototipado'],
    tags: ['Fintech', 'Móvil', 'Sistema de Diseño'],
    summary: 'Rediseño completo de app de banca digital. Sistema de diseño desde cero y +40 pantallas optimizadas para conversión.',
    challenge: 'La app heredada tenía una tasa de abandono alta en el onboarding y un código visual inconsistente entre equipos. No existía una fuente única de verdad para los componentes.',
    solution: 'Construí un sistema de diseño escalable en Figma con tokens y componentes documentados, y rediseñé los flujos críticos de apertura de cuenta, transferencias y pagos centrándome en reducir fricción.',
    outcome: [
      { metric: '+40', label: 'pantallas rediseñadas' },
      { metric: '−28%', label: 'abandono en onboarding' },
      { metric: '1', label: 'design system unificado' }
    ]
  },
  'nimbus-studio': {
    num: '002', preview: 2,
    company: 'Nimbus', initial: 'Nb',
    title: 'Nimbus Studio', category: 'SaaS', year: '2025',
    role: 'Senior Product Designer', client: 'Nimbus',
    services: ['Estrategia de producto', 'App Web', 'Librería de componentes'],
    tags: ['SaaS', 'App Web', 'Estrategia'],
    summary: 'Plataforma SaaS para equipos creativos. Estrategia de producto, dashboard y librería de componentes.',
    challenge: 'Equipos creativos necesitaban una herramienta de gestión que no se sintiera como software corporativo, sino flexible y visual.',
    solution: 'Definí la estrategia de producto junto a stakeholders, diseñé el dashboard principal y entregué una librería de componentes reutilizable para acelerar el desarrollo.',
    outcome: [
      { metric: '3', label: 'meses a MVP' },
      { metric: '60+', label: 'componentes' },
      { metric: '4.6', label: 'rating de usuarios beta' }
    ]
  },
  'mesa-co': {
    num: '003', preview: 3,
    company: 'Mesa & Co.', initial: 'M&',
    title: 'Mesa & Co.', category: 'E-commerce', year: '2025',
    role: 'Product & Brand Designer', client: 'Mesa & Co.',
    services: ['Branding', 'Dirección de arte', 'E-commerce'],
    tags: ['E-commerce', 'Branding'],
    summary: 'E-commerce de mobiliario artesanal. Branding, dirección de arte y experiencia de compra end-to-end.',
    challenge: 'Una marca de mobiliario artesanal quería trasladar la calidez de su producto físico a una tienda online sin perder identidad.',
    solution: 'Desarrollé la identidad de marca, la dirección de arte fotográfica y diseñé toda la experiencia de compra, desde catálogo hasta checkout.',
    outcome: [
      { metric: '+35%', label: 'conversión vs. sitio anterior' },
      { metric: '−20%', label: 'carritos abandonados' },
      { metric: '100%', label: 'experiencia end-to-end' }
    ]
  },
  'hojaverde': {
    num: '004', preview: 4,
    company: 'Hojaverde', initial: 'Hv',
    title: 'Hojaverde', category: 'Bienestar', year: '2024',
    role: 'Product Designer', client: 'Hojaverde',
    services: ['Investigación', 'Prototipado', 'Handoff'],
    tags: ['Bienestar', 'Móvil', 'Investigación'],
    summary: 'App de bienestar y meditación. Research con usuarios, prototipado en alta fidelidad y handoff.',
    challenge: 'El producto debía guiar a usuarios principiantes en meditación sin abrumarlos, manteniéndolos comprometidos a largo plazo.',
    solution: 'Realicé investigación con usuarios para mapear hábitos, prototipé flujos en alta fidelidad y entregué un handoff detallado al equipo de desarrollo.',
    outcome: [
      { metric: '12', label: 'usuarios entrevistados' },
      { metric: '+22%', label: 'retención a 7 días' },
      { metric: 'A11Y', label: 'accesible desde el día 1' }
    ]
  },
  'atlas-coffee': {
    num: '005', preview: 5,
    company: 'Atlas Coffee', initial: 'Ac',
    title: 'Atlas Coffee', category: 'Web Editorial', year: '2024',
    role: 'Product Designer', client: 'Atlas Coffee Roasters',
    services: ['Diseño editorial', 'Microinteracciones', 'Suscripción'],
    tags: ['Web', 'Editorial', 'F&B'],
    summary: 'Sitio web para tostaduría especializada. Diseño editorial, microinteracciones y suscripción mensual.',
    challenge: 'Una tostaduría de especialidad necesitaba un sitio que comunicara el origen y proceso del café, e impulsara su modelo de suscripción.',
    solution: 'Diseñé un sitio editorial con narrativa visual, microinteracciones sutiles y un flujo de suscripción mensual claro y persuasivo.',
    outcome: [
      { metric: '+50%', label: 'suscriptores en 3 meses' },
      { metric: '2.1×', label: 'tiempo en página' },
      { metric: '100', label: 'PageSpeed móvil' }
    ]
  },
  'vertice-health': {
    num: '006', preview: 1,
    company: 'Vértice', initial: 'Vt',
    title: 'Vértice Health', category: 'Healthtech', year: '2024',
    role: 'Senior UX/UI Designer', client: 'Vértice (clínicas privadas)',
    services: ['Flujos críticos', 'Accesibilidad', 'Handoff'],
    tags: ['Healthtech', 'App Web', 'Accesibilidad'],
    summary: 'Plataforma de telemedicina para clínicas privadas. Diseño de flujos críticos, accesibilidad y handoff con dev.',
    challenge: 'La telemedicina requería flujos infalibles para agendar, atender y recetar, accesibles para pacientes de todas las edades.',
    solution: 'Diseñé los flujos críticos priorizando claridad y accesibilidad (WCAG AA), con un handoff cercano al equipo de desarrollo.',
    outcome: [
      { metric: 'AA', label: 'cumplimiento WCAG' },
      { metric: '−40%', label: 'errores de agendamiento' },
      { metric: '3', label: 'flujos críticos rediseñados' }
    ]
  },
  'pulpo-logistics': {
    num: '007', preview: 2,
    company: 'Pulpo', initial: 'Pl',
    title: 'Pulpo Logistics', category: 'Logística', year: '2023',
    role: 'Product Designer', client: 'Pulpo',
    services: ['Dashboard', 'Data Viz', 'B2B'],
    tags: ['Dashboard', 'B2B', 'Data Viz'],
    summary: 'Dashboard operativo para gestión de flotas. Reducción del 32% en tiempos de despacho tras rediseño.',
    challenge: 'Los operadores trabajaban con un dashboard saturado que dificultaba decisiones rápidas sobre flotas en tiempo real.',
    solution: 'Reorganicé la jerarquía de información, diseñé visualizaciones de datos accionables y simplifiqué el flujo de despacho.',
    outcome: [
      { metric: '−32%', label: 'tiempo de despacho' },
      { metric: '+18%', label: 'eficiencia operativa' },
      { metric: 'B2B', label: 'enfoque enterprise' }
    ]
  },
  'marea-editorial': {
    num: '008', preview: 3,
    company: 'Marea', initial: 'Me',
    title: 'Marea Editorial', category: 'Medios', year: '2023',
    role: 'Product Designer', client: 'Marea (medio independiente)',
    services: ['Sistema modular', 'Suscripciones', 'CMS'],
    tags: ['Editorial', 'CMS'],
    summary: 'Rediseño editorial para medio digital independiente. Sistema modular, suscripciones y lectura inmersiva.',
    challenge: 'Un medio independiente necesitaba escalar su publicación con un sistema flexible y monetizar vía suscripciones.',
    solution: 'Diseñé un sistema editorial modular para el CMS, una experiencia de lectura inmersiva y un muro de suscripción no intrusivo.',
    outcome: [
      { metric: '+45%', label: 'lectores recurrentes' },
      { metric: '8', label: 'plantillas modulares' },
      { metric: '+12%', label: 'conversión a suscripción' }
    ]
  },
  'norte-sur-travel': {
    num: '009', preview: 4,
    company: 'Norte Sur', initial: 'NS',
    title: 'Norte Sur Travel', category: 'Viajes', year: '2023',
    role: 'Product Designer', client: 'Norte Sur',
    services: ['Onboarding', 'Motor de itinerarios', 'Reserva'],
    tags: ['Viajes', 'Móvil'],
    summary: 'App de planificación de viajes por Sudamérica. Onboarding, motor de itinerarios y reserva.',
    challenge: 'Planificar un viaje multi-destino por Sudamérica era complejo y fragmentado entre múltiples herramientas.',
    solution: 'Diseñé un onboarding personalizado, un motor visual de itinerarios y un flujo de reserva unificado dentro de una sola app.',
    outcome: [
      { metric: '5', label: 'países cubiertos' },
      { metric: '−50%', label: 'tiempo de planificación' },
      { metric: '4.7', label: 'rating en stores' }
    ]
  },
  'faro-academico': {
    num: '010', preview: 5,
    company: 'Faro', initial: 'Fa',
    title: 'Faro Académico', category: 'EdTech', year: '2023',
    role: 'Product Designer', client: 'Faro (universidades LATAM)',
    services: ['Sistema de componentes', 'Dark mode', 'Accesibilidad'],
    tags: ['EdTech', 'App Web', 'Sistema de Diseño'],
    summary: 'LMS para universidades latinoamericanas. Sistema de componentes accesible y dark mode nativo.',
    challenge: 'Un LMS usado por miles de estudiantes necesitaba consistencia visual, accesibilidad y soporte de dark mode nativo.',
    solution: 'Construí un sistema de componentes accesible con theming claro/oscuro y patrones de aprendizaje consistentes en toda la plataforma.',
    outcome: [
      { metric: 'AA', label: 'accesibilidad' },
      { metric: '2', label: 'temas (claro/oscuro)' },
      { metric: '+30%', label: 'velocidad de desarrollo' }
    ]
  }
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

    this.innerHTML = `
<a href="${href}" class="project" data-preview="${esc(p.preview)}" aria-label="Proyecto ${esc(p.num)}: ${esc(p.title)}, ${esc(p.category)} ${esc(p.year)}">
  <div class="project-num" aria-hidden="true">${esc(p.num)}</div>
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
/* ============================================
   PROJECT DETAIL · rellena proyecto.html
   ----------------------------------------------
   Lee ?slug= de la URL, busca el proyecto en
   window.PROJECTS y completa los [data-pj].
   Si el slug no existe, redirige a work.html.
   ============================================ */

(function () {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const data = window.PROJECTS || {};
  const project = slug && data[slug];

  // Slug inválido o ausente → vuelve a la lista
  if (!project) {
    window.location.replace('work.html');
    return;
  }

  const set = (key, value) => {
    document.querySelectorAll(`[data-pj="${key}"]`).forEach(el => {
      el.textContent = value;
    });
  };

  // Texto plano
  set('num', project.num);
  set('category', project.category);
  set('title', project.title);
  set('title-cover', project.title);
  set('year', project.year);
  set('year2', project.year);
  set('client', project.client);
  set('role', project.role);
  set('summary', project.summary);
  set('challenge', project.challenge);
  set('solution', project.solution);

  // Company badge
  set('company', project.company || '');
  set('company-initial', project.initial || (project.company ? project.company[0] : ''));

  // Document title + meta
  document.title = `${project.title} — Patricio Bustamante`;
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', `${project.title} — Patricio Bustamante`);
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', project.summary);

  // Cover: aplica el gradiente del proyecto (.preview-{n})
  const cover = document.getElementById('pj-cover');
  if (cover) cover.classList.add('preview-' + project.preview);

  // Servicios → skill-pills
  const servicesHost = document.querySelector('[data-pj="services"]');
  if (servicesHost && Array.isArray(project.services)) {
    servicesHost.innerHTML = project.services
      .map(s => `<span class="skill-pill">${s}</span>`)
      .join('');
  }

  // Resultados → outcome cards
  const outcomeHost = document.querySelector('[data-pj="outcome"]');
  if (outcomeHost && Array.isArray(project.outcome)) {
    outcomeHost.innerHTML = project.outcome.map(o => `
      <div class="outcome-card">
        <div class="outcome-metric">${o.metric}</div>
        <div class="outcome-label">${o.label}</div>
      </div>`).join('');
  }

  // Siguiente proyecto (cíclico)
  const order = window.PROJECT_ORDER || Object.keys(data);
  const idx = order.indexOf(slug);
  const nextSlug = order[(idx + 1) % order.length];
  const nextProject = data[nextSlug];
  const nextLink = document.querySelector('[data-pj="next"]');
  const nextTitle = document.querySelector('[data-pj="next-title"]');
  if (nextLink && nextProject) {
    nextLink.setAttribute('href', `proyecto.html?slug=${nextSlug}`);
    if (nextTitle) nextTitle.textContent = nextProject.title;
  }
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

// ===== Project Preview =====
const preview = document.getElementById('preview');
const previewInner = document.getElementById('previewInner');
let previewRafId = null;
let previewTick = null;

if (preview && previewInner && finePointer.matches && !reduceMotion.matches) {
  const previewData = {
    '1': { title: 'Orbita', type: 'App Fintech' },
    '2': { title: 'Nimbus', type: 'Plataforma SaaS' },
    '3': { title: 'Mesa & Co.', type: 'E-commerce' },
    '4': { title: 'Hojaverde', type: 'App de Bienestar' },
    '5': { title: 'Atlas', type: 'Web Editorial' }
  };

  let previewX = 0, previewY = 0;
  let targetPreviewX = 0, targetPreviewY = 0;

  previewTick = function() {
    previewX += (targetPreviewX - previewX) * 0.1;
    previewY += (targetPreviewY - previewY) * 0.1;
    preview.style.left = previewX + 'px';
    preview.style.top = previewY + 'px';
    previewRafId = requestAnimationFrame(previewTick);
  };
  previewRafId = requestAnimationFrame(previewTick);

  document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('mouseenter', () => {
      const num = project.getAttribute('data-preview');
      const data = previewData[num];
      previewInner.className = 'project-preview-inner preview-' + num;
      previewInner.querySelector('.preview-title').textContent = data.title;
      previewInner.querySelector('.preview-type').textContent = data.type;
      preview.classList.add('active');
    });
    project.addEventListener('mouseleave', () => preview.classList.remove('active'));
    project.addEventListener('mousemove', (e) => {
      targetPreviewX = e.clientX;
      targetPreviewY = e.clientY - 20;
    });
  });
}

// Pausa los bucles rAF cuando el usuario cambia de tab
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (cursorRafId) { cancelAnimationFrame(cursorRafId); cursorRafId = null; }
    if (previewRafId) { cancelAnimationFrame(previewRafId); previewRafId = null; }
  } else {
    if (cursorTick && !cursorRafId) cursorRafId = requestAnimationFrame(cursorTick);
    if (previewTick && !previewRafId) previewRafId = requestAnimationFrame(previewTick);
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
