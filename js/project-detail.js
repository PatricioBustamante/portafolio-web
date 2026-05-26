/* ============================================
   PROJECT DETAIL · rellena proyecto.html
   ============================================ */

(function () {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const data = window.PROJECTS || {};
  const p = slug && data[slug];

  if (!p) { window.location.replace('work.html'); return; }

  const esc = s => String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const set = (key, value) => {
    document.querySelectorAll(`[data-pj="${key}"]`).forEach(el => {
      el.textContent = value;
    });
  };

  // ── Texto plano ──────────────────────────────
  set('num',           p.num);
  set('category',      p.category);
  set('title',         p.title);
  set('title2',        p.title);
  set('title-cover',   p.title);
  set('year',          p.year);
  set('year2',         p.year);
  set('client',        p.client);
  set('role',          p.role);
  set('challenge',     p.challenge);
  set('mainObjective', p.mainObjective || '');
  set('solution',      p.solution);

  // ── Company badge ────────────────────────────
  set('company',         p.company || '');
  set('company-initial', p.initial || (p.company ? p.company[0] : ''));

  // ── Document title + meta ────────────────────
  document.title = `${p.title} — Patricio Bustamante`;
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', `${p.title} — Patricio Bustamante`);
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', p.summary || p.challenge);

  // ── Cover gradient ───────────────────────────
  const cover = document.getElementById('pj-cover');
  if (cover && p.preview) cover.classList.add('preview-' + p.preview);

  // ── Objetivos secundarios ────────────────────
  const objectivesHost = document.querySelector('[data-pj="objectives"]');
  if (objectivesHost && Array.isArray(p.objectives)) {
    objectivesHost.innerHTML = p.objectives
      .map(o => `<li class="pj-list-item">${esc(o)}</li>`)
      .join('');
  }

  // ── Procesos ─────────────────────────────────
  const processesHost = document.querySelector('[data-pj="processes"]');
  if (processesHost && Array.isArray(p.processes)) {
    processesHost.innerHTML = p.processes
      .map(o => `<li class="pj-list-item">${esc(o)}</li>`)
      .join('');
  }

  // ── Herramientas ─────────────────────────────
  const toolsHost = document.querySelector('[data-pj="tools"]');
  if (toolsHost && Array.isArray(p.tools)) {
    toolsHost.innerHTML = p.tools
      .map(t => `<li class="pj-list-item">${esc(t)}</li>`)
      .join('');
  }

  // ── Métricas ─────────────────────────────────
  const metricsHost = document.querySelector('[data-pj="metrics"]');
  if (metricsHost && Array.isArray(p.metrics)) {
    metricsHost.innerHTML = p.metrics.map(m => `
      <div class="pj-metric-card">
        <div class="pj-metric-label">${esc(m.label)}</div>
        <div class="pj-metric-value">${esc(m.value)}</div>
        <div class="pj-metric-row">
          <span class="pj-metric-before"><span>Antes</span>${esc(m.before)}</span>
          <span class="pj-metric-after"><span>Después</span>${esc(m.after)}</span>
        </div>
        <div class="pj-metric-change">${esc(m.change)}</div>
      </div>`).join('');
  }

  // ── Aprendizajes ─────────────────────────────
  const lessonsHost = document.querySelector('[data-pj="lessons"]');
  if (lessonsHost && Array.isArray(p.lessons)) {
    lessonsHost.innerHTML = p.lessons
      .map(l => `<li class="pj-list-item">${esc(l)}</li>`)
      .join('');
  }

  // ── Siguiente proyecto (cíclico) ─────────────
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
