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

   Campos de visibilidad:
     recentProject  true → aparece en Home (proyectos recientes)
     visibleProject true → aparece en la página Work
   ============================================ */

window.PROJECTS = {
  'betterfly-onboarding': {
    num: '011', preview: 4,
    recentProject: true, visibleProject: true,
    company: 'Betterfly', initial: 'Bt',
    title: 'Betterfly Onboarding v2', category: 'Insurtech', year: '2021',
    role: 'Product Designer (UX/UI)', client: 'Betterfly',
    duration: '4 meses',
    team: '1 Product Designer, 1 PM, 2 Ingenieros Frontend',
    services: ['UX Research', 'User Testing', 'Wireframing', 'UI Design', 'Sistema de Diseño', 'Prototipado'],
    tags: ['Insurtech', 'Móvil', 'UX Research'],
    summary: 'Rediseño del flujo de enrolamiento para usuarios nuevos de seguro digital. De 12 pasos a 5, reduciendo el abandono de 60% a 10%.',
    challenge: 'El flujo de onboarding original era complejo: 12 pasos con múltiples pantallas sin contexto claro, términos de seguros sin explicar y validaciones confusas. 60% de los usuarios abandonaba sin completar el registro y el proceso tomaba 15 minutos en promedio.',
    opportunity: 'Simplificar y clarificar el flujo para que usuarios nuevos entiendan rápidamente qué es Betterfly y puedan completar su registro y obtener una cotización en menos de 3 minutos.',
    solution: 'Simplifiqué el onboarding de 12 pasos a 5 consolidando pasos redundantes y usando validaciones asincrónicas. Agregué una pantalla de bienvenida con propuesta de valor clara, tooltips contextuales para términos de seguros y un resumen simplificado de T&C de 200 palabras en lugar de 5.000.',
    conclusion: 'Este proyecto demostró que en InsureTech la simplicidad no es el enemigo de la regulación — es su aliado. Al reducir el onboarding de 12 pasos a 5, agregar educación contextual y enfocarse en la propuesta de valor, logramos aumentar la conversión en 500%, reducir el tiempo en 81% y mejorar el NPS de 3.1 a 4.6, manteniendo el cumplimiento regulatorio.',
    outcome: [
      { metric: '−50pp', label: 'abandono (60% → 10%)' },
      { metric: '−81%', label: 'tiempo de setup (15 → 2.8 min)' },
      { metric: '4.6/5', label: 'satisfacción post-onboarding' }
    ],
    problemData: [
      { value: '60%', label: 'abandono en onboarding' },
      { value: '15 min', label: 'tiempo promedio de setup' },
      { value: '32%', label: 'completaban perfil de salud' }
    ],
    objectives: [
      'Reducir abandono de 60% a máximo 15% (meta: 10%)',
      'Reducir tiempo de setup de 15 minutos a menos de 3 minutos',
      'Aumentar completitud de perfil de salud a 75% en primeras 24h',
      'Lograr NPS de 4.5/5 en post-onboarding survey'
    ],
    phases: ['Research', 'Ideación', 'Diseño', 'Testing & Iteración'],
    principles: [
      'Claridad: explicar cada paso y por qué es necesario',
      'Simplicidad: reducir pasos al mínimo necesario',
      'Educación: contextualizar términos de seguros con ejemplos',
      'Confianza: mostrar transparencia y seguridad en cada etapa'
    ],
    research: {
      users: 25,
      findings: [
        '72% no entendía qué diferenciaba a Betterfly de otros seguros — no había propuesta de valor clara al inicio.',
        '68% se perdía en términos como Cobertura, Deducible, Prima, Póliza y Siniestro.',
        'El onboarding tenía 12 pasos, muchos redundantes. Los usuarios reportaban fatiga y validaciones múltiples.'
      ],
      personas: [
        {
          name: 'Alejandro', age: 30, profession: 'IT Professional',
          goal: 'Contratar un seguro de salud sin complicaciones burocráticas, con buen cubrimiento y precio justo.',
          frustration: 'Los procesos burocráticos y términos incomprensibles. No quiere perder 20 minutos en registro.'
        },
        {
          name: 'Carla', age: 28, profession: 'Student / Part-time worker',
          goal: 'Un seguro básico de salud asequible, simple de contratar desde el celular.',
          frustration: 'Apps complicadas. Si necesita 15 pasos para empezar, abandona. Especialmente en móvil.'
        }
      ]
    },
    concepts: [
      'Wizard Lineal — 12 pasos en secuencia. Descartado: muy largo, sin contexto educativo.',
      'Modular — 5 pasos grandes con sub-componentes. Mejor balance entre claridad y complejidad. [GANADOR]',
      'Progressive Profiling — recolectar información mínima primero. Descartado: crea fricción en cotización que requiere datos completos.'
    ],
    winningConcept: 'Modular: 5 pasos claros con educación contextual en cada pantalla, preferido por 80% de usuarios en testing.',
    flows: [
      'Flujo 1 — Registro: Welcome Screen → Email/Password → Verification → Profile Setup → Security Settings',
      'Flujo 2 — Salud: Basic Health Questions → Medical History → Current Medications → Lifestyle → Health Summary',
      'Flujo 3 — Cotización: Choose Plan → Review Coverage → Enter Payment Info → Confirm Policy → Success'
    ],
    decisions: [
      {
        decision: 'Agregar Welcome Screen con propuesta de valor',
        impact: '+57pp en comprensión de la propuesta (28% → 85%). Un solo paso con ROI altísimo.'
      },
      {
        decision: 'Simplificar de 12 pasos a 5 con validaciones asincrónicas',
        impact: '−91% en tiempo de setup: de 15 minutos a 2.8 minutos promedio.'
      },
      {
        decision: 'Tooltips contextuales con definición + ejemplo práctico para términos técnicos',
        impact: '82% de usuarios entendió los términos de seguros (vs 32% baseline).'
      },
      {
        decision: 'T&C simplificados: resumen de 200 palabras + link al documento completo',
        impact: '94% de usuarios completó el paso (vs 58% antes). Sin perder cumplimiento regulatorio.'
      }
    ],
    designSystem: {
      colors: 3,
      components: 8,
      typography: 'Inter Bold 32px / Regular 14-16px / Medium 12px'
    },
    testing: {
      users: 35,
      type: 'Moderated Testing + A/B en producción',
      findings: [
        { status: 'success', text: 'Welcome Screen: 92% llegó a completar onboarding (vs 40% antes). Usuarios reportaron "finalmente entiendo de qué se trata".' },
        { status: 'warning', text: 'Tooltips de términos: algunos usuarios no notaban el info icon — iterado a color naranja con animación.' },
        { status: 'success', text: 'Resumen de T&C: 94% completó el paso sin revisar el documento legal completo.' },
        { status: 'warning', text: '8% no recibía email de confirmación — se agregó "Reenviar email" y SMS como alternativa.' }
      ],
      iterations: [
        'Info icons con color naranja + animación pulse al tocar — +45% en uso de tooltips',
        'SMS como fallback en verificación de email + botón reenviar visible — −67% en fricción en ese paso',
        'Layout vertical en mobile para progress bar — +12% completion en pantallas pequeñas'
      ],
      metrics: [
        { metric: 'Completion Rate', target: '85%', result: '92% ✓' },
        { metric: 'Time to Complete', target: '< 5 min', result: '2.8 min ✓' },
        { metric: 'User Satisfaction', target: '4.0/5', result: '4.6/5 ✓' },
        { metric: 'Health Profile Completion', target: '70%', result: '76% ✓' },
        { metric: 'Plan Selection Rate', target: '75%', result: '88% ✓' }
      ]
    },
    testimonials: [
      {
        quote: 'El proceso anterior era frustrante. No entendía por qué necesitaban tanta información. Ahora es directo al punto. Me tomó menos de 3 minutos. Muy impresionante.',
        author: 'Alejandro S.', role: '30, IT Professional'
      },
      {
        quote: 'Finalmente una app de seguros que no es complicada. Los términos explicados ayudan mucho. Recomendaría a mis amigas.',
        author: 'Carla M.', role: '28, Student'
      },
      {
        quote: 'El tooltip de "deducible" fue clave. Entendí finalmente cómo funcionaba. Sin eso, hubiera abandonado.',
        author: 'María T.', role: '35, Accountant'
      }
    ],
    lessons: [
      'Educación inline es crítica en InsureTech: un tooltip con 1 frase + ejemplo práctico es más efectivo que largos documentos de ayuda.',
      'Menos pasos > contenido perfecto: cada paso adicional reduce entre 5–10% el completion rate.',
      'Welcome screens funcionan: una pantalla de 30 segundos aumentó la comprensión de 28% a 85%.',
      'Asincronía es tu amiga: validaciones en background mejoran la velocidad percibida significativamente.',
      'Regulación ≠ Complejidad: se puede ser simple y cumplir regulación simultáneamente con educación clara.'
    ],
    nextSteps: [
      'Q1 2022: Social Onboarding con referral program integrado durante registro',
      'Q2 2022: Multi-Language Support — Español, Portugués e Inglés para expansión regional',
      'Q3 2022: Advanced Health Pathways para seguro de vida y hogar',
      'Q4 2022: Business Accounts para pólizas colectivas con dashboard de administrador'
    ]
  },

  'orbita-finance': {
    num: '001', preview: 1,
    recentProject: false, visibleProject: true,
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
    recentProject: false, visibleProject: true,
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
