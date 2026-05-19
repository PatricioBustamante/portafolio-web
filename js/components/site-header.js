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
    <a href="${workHref}" class="magnetic${isWork}"${isWork ? ' aria-current="page"' : ''}><span class="nav-num">01</span>Work</a>
    <a href="${aboutHref}" class="magnetic${isAbout}"${isAbout ? ' aria-current="page"' : ''}><span class="nav-num">02</span>About</a>
    <a href="${base}index.html#contact" class="magnetic"><span class="nav-num">03</span>Contact</a>
  </div>

  <p class="nav-status" role="status">
    <span class="status-dot" aria-hidden="true"></span>
    <span class="sr-only">Estado: </span>Open to work
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
