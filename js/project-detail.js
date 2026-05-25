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
  set('num',          p.num);
  set('category',     p.category);
  set('title',        p.title);
  set('title-cover',  p.title);
  set('year',         p.year);
  set('year2',        p.year);
  set('client',       p.client);
  set('role',         p.role);
  set('duration',     p.duration || '—');
  set('team',         p.team || '—');
  set('summary',      p.summary);
  set('challenge',    p.challenge);
  set('opportunity',  p.opportunity || '');
  set('solution',     p.solution);
  set('conclusion',   p.conclusion || '');

  // ── Company badge ────────────────────────────
  set('company',         p.company || '');
  set('company-initial', p.initial || (p.company ? p.company[0] : ''));

  // ── Document title + meta ────────────────────
  document.title = `${p.title} — Patricio Bustamante`;
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', `${p.title} — Patricio Bustamante`);
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', p.summary);

  // ── Cover gradient ───────────────────────────
  const cover = document.getElementById('pj-cover');
  if (cover) cover.classList.add('preview-' + p.preview);

  // ── Servicios → skill-pills ──────────────────
  const servicesHost = document.querySelector('[data-pj="services"]');
  if (servicesHost && Array.isArray(p.services)) {
    servicesHost.innerHTML = p.services
      .map(s => `<span class="skill-pill">${esc(s)}</span>`)
      .join('');
  }

  // ── Problem data stats ───────────────────────
  const problemDataHost = document.querySelector('[data-pj="problemData"]');
  if (problemDataHost && Array.isArray(p.problemData)) {
    problemDataHost.innerHTML = p.problemData.map(d => `
      <div class="pj-stat-card">
        <div class="pj-stat-value">${esc(d.value)}</div>
        <div class="pj-stat-label">${esc(d.label)}</div>
      </div>`).join('');
  }

  // ── Objetivos ────────────────────────────────
  const objectivesHost = document.querySelector('[data-pj="objectives"]');
  if (objectivesHost && Array.isArray(p.objectives)) {
    objectivesHost.innerHTML = p.objectives
      .map(o => `<li class="pj-list-item">${esc(o)}</li>`)
      .join('');
  }

  // ── Fases del proceso ────────────────────────
  const phasesHost = document.querySelector('[data-pj="phases"]');
  if (phasesHost && Array.isArray(p.phases)) {
    phasesHost.innerHTML = p.phases
      .map((ph, i) => `<li class="pj-phase-item">
        <span class="pj-phase-num">0${i + 1}</span>
        <span class="pj-phase-name">${esc(ph)}</span>
      </li>`)
      .join('');
  }

  // ── Principios ───────────────────────────────
  const principlesHost = document.querySelector('[data-pj="principles"]');
  if (principlesHost && Array.isArray(p.principles)) {
    principlesHost.innerHTML = p.principles
      .map(pr => `<li class="pj-principle-item">
        <span class="pj-principle-mark" aria-hidden="true">—</span>
        ${esc(pr)}
      </li>`)
      .join('');
  }

  // ── Research ─────────────────────────────────
  const researchHost = document.querySelector('[data-pj="research"]');
  if (researchHost && p.research) {
    const r = p.research;
    const findingsHtml = Array.isArray(r.findings)
      ? `<ul class="pj-finding-list">${r.findings.map(f => `<li>${esc(f)}</li>`).join('')}</ul>`
      : '';
    const personasHtml = Array.isArray(r.personas)
      ? `<div class="pj-persona-grid">${r.personas.map(pe => `
          <div class="pj-persona-card">
            <div class="pj-persona-name">${esc(pe.name)}, ${esc(String(pe.age))}</div>
            <div class="pj-persona-role">${esc(pe.profession)}</div>
            <div class="pj-persona-goal"><strong>Quiere:</strong> ${esc(pe.goal)}</div>
            <div class="pj-persona-pain"><strong>Le frustra:</strong> ${esc(pe.frustration)}</div>
          </div>`).join('')}</div>`
      : '';
    researchHost.innerHTML = `
      <p class="pj-research-count"><strong>${esc(String(r.users))}</strong> usuarios entrevistados</p>
      <h4 class="pj-sub-title">Hallazgos principales</h4>
      ${findingsHtml}
      <h4 class="pj-sub-title">Personas</h4>
      ${personasHtml}`;
  }

  // ── Conceptos ────────────────────────────────
  const conceptsHost = document.querySelector('[data-pj="concepts"]');
  if (conceptsHost && Array.isArray(p.concepts)) {
    conceptsHost.innerHTML = p.concepts
      .map((c, i) => `<li class="pj-concept-item">
        <span class="pj-concept-num">${i + 1}</span>
        <span>${esc(c)}</span>
      </li>`)
      .join('');
  }

  // ── Concepto ganador ─────────────────────────
  const winnerHost = document.querySelector('[data-pj="winningConcept"]');
  if (winnerHost && p.winningConcept) {
    winnerHost.innerHTML = `<p class="pj-winner-concept"><strong>Ganador:</strong> ${esc(p.winningConcept)}</p>`;
  }

  // ── Flujos ───────────────────────────────────
  const flowsHost = document.querySelector('[data-pj="flows"]');
  if (flowsHost && Array.isArray(p.flows)) {
    flowsHost.innerHTML = p.flows
      .map(f => `<li class="pj-list-item">${esc(f)}</li>`)
      .join('');
  }

  // ── Decisiones clave ─────────────────────────
  const decisionsHost = document.querySelector('[data-pj="decisions"]');
  if (decisionsHost && Array.isArray(p.decisions)) {
    decisionsHost.innerHTML = p.decisions.map(d => `
      <div class="pj-decision-card">
        <div class="pj-decision-text">${esc(d.decision)}</div>
        <div class="pj-decision-impact">${esc(d.impact)}</div>
      </div>`).join('');
  }

  // ── Design System ────────────────────────────
  const dsHost = document.querySelector('[data-pj="designSystem"]');
  if (dsHost && p.designSystem) {
    const ds = p.designSystem;
    dsHost.innerHTML = `
      <div class="pj-ds-grid">
        <div class="pj-ds-item">
          <span class="pj-ds-value">${esc(String(ds.colors))}</span>
          <span class="pj-ds-label">Colores</span>
        </div>
        <div class="pj-ds-item">
          <span class="pj-ds-value">${esc(String(ds.components))}</span>
          <span class="pj-ds-label">Componentes</span>
        </div>
        <div class="pj-ds-item pj-ds-item--wide">
          <span class="pj-ds-value pj-ds-value--sm">${esc(ds.typography)}</span>
          <span class="pj-ds-label">Tipografía</span>
        </div>
      </div>`;
  }

  // ── Testing / Validación ─────────────────────
  const testingHost = document.querySelector('[data-pj="testing"]');
  if (testingHost && p.testing) {
    const t = p.testing;
    const iconMap = { success: '✓', warning: '△', error: '✕' };
    const findingsHtml = Array.isArray(t.findings)
      ? t.findings.map(f => `
          <li class="pj-test-finding pj-test-finding--${esc(f.status)}">
            <span class="pj-test-icon" aria-hidden="true">${iconMap[f.status] || '·'}</span>
            <span>${esc(f.text)}</span>
          </li>`).join('')
      : '';
    const iterationsHtml = Array.isArray(t.iterations)
      ? t.iterations.map(it => `<li class="pj-list-item">${esc(it)}</li>`).join('')
      : '';
    const metricsHtml = Array.isArray(t.metrics)
      ? `<table class="pj-metrics-table" role="table">
          <thead>
            <tr>
              <th scope="col">Métrica</th>
              <th scope="col">Target</th>
              <th scope="col">Resultado</th>
            </tr>
          </thead>
          <tbody>
            ${t.metrics.map(m => `
              <tr>
                <td>${esc(m.metric)}</td>
                <td>${esc(m.target)}</td>
                <td class="pj-metric-result">${esc(m.result)}</td>
              </tr>`).join('')}
          </tbody>
        </table>`
      : '';
    testingHost.innerHTML = `
      <p class="pj-testing-meta">
        <strong>${esc(String(t.users))}</strong> usuarios · ${esc(t.type)}
      </p>
      <h4 class="pj-sub-title">Hallazgos</h4>
      <ul class="pj-test-finding-list">${findingsHtml}</ul>
      ${iterationsHtml ? `<h4 class="pj-sub-title">Iteraciones realizadas</h4><ul class="pj-iteration-list">${iterationsHtml}</ul>` : ''}
      ${metricsHtml ? `<h4 class="pj-sub-title">Métricas · Target vs. Resultado</h4>${metricsHtml}` : ''}`;
  }

  // ── Outcome cards ────────────────────────────
  const outcomeHost = document.querySelector('[data-pj="outcome"]');
  if (outcomeHost && Array.isArray(p.outcome)) {
    outcomeHost.innerHTML = p.outcome.map(o => `
      <div class="outcome-card">
        <div class="outcome-metric">${esc(o.metric)}</div>
        <div class="outcome-label">${esc(o.label)}</div>
      </div>`).join('');
  }

  // ── Testimonios ──────────────────────────────
  const testimonialsHost = document.querySelector('[data-pj="testimonials"]');
  if (testimonialsHost && Array.isArray(p.testimonials) && p.testimonials.length) {
    testimonialsHost.innerHTML = `
      <div class="pj-testimonial-list">
        ${p.testimonials.map(t => `
          <figure class="pj-testimonial">
            <blockquote class="pj-testimonial-quote">"${esc(t.quote)}"</blockquote>
            <figcaption class="pj-testimonial-author">
              <strong>${esc(t.author)}</strong> · ${esc(t.role)}
            </figcaption>
          </figure>`).join('')}
      </div>`;
  }

  // ── Lecciones ────────────────────────────────
  const lessonsHost = document.querySelector('[data-pj="lessons"]');
  if (lessonsHost && Array.isArray(p.lessons) && p.lessons.length) {
    lessonsHost.innerHTML = `
      <div class="pj-lessons-block">
        <h3 class="pj-sub-title">Lo que aprendí</h3>
        <ol class="pj-lesson-list">
          ${p.lessons.map(l => `<li class="pj-list-item">${esc(l)}</li>`).join('')}
        </ol>
      </div>`;
  }

  // ── Próximos pasos ───────────────────────────
  const nextStepsHost = document.querySelector('[data-pj="nextSteps"]');
  if (nextStepsHost && Array.isArray(p.nextSteps)) {
    nextStepsHost.innerHTML = p.nextSteps
      .map(s => `<li class="pj-list-item">${esc(s)}</li>`)
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
