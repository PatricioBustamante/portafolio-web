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
