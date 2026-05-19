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
