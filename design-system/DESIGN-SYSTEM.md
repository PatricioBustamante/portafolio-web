# Design System — Patricio Bustamante

Sistema de diseño del portafolio, construido sobre tres metodologías:

1. **Design System** — fuente única de verdad para tokens, componentes y patrones.
2. **Atomic Design** (Brad Frost) — jerarquía de componentes de menor a mayor complejidad.
3. **8px Grid System** — todo el espaciado deriva de una grilla base de 8px.

> Página viva: abre [`styleguide.html`](styleguide.html) en el navegador para ver tokens y componentes renderizados.

---

## 1. Arquitectura de archivos (Atomic Design)

El CSS se carga en cascada de menor a mayor especificidad conceptual. **El orden importa.**

```
css/
├── tokens.css      Nivel 0 · Variables (color, espaciado, tipografía, motion, z-index)
├── base.css        Transversal · Reset, foco accesible, skip-link, .sr-only, .reveal, keyframes compartidos
├── atoms.css       Nivel 1 · Piezas indivisibles (dots, pills, tags, labels, iconos-botón, toggle)
├── molecules.css   Nivel 2 · Grupos de átomos (logo, nav-links, status, toggle, cards, headers, timeline-item)
├── organisms.css   Nivel 3 · Secciones completas (loader, nav, hero, marquee, projects, about, contact, footer)
└── layout.css      Templates · section base + todo el responsive
```

Orden de `<link>` en cada HTML:

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/atoms.css">
<link rel="stylesheet" href="css/molecules.css">
<link rel="stylesheet" href="css/organisms.css">
<link rel="stylesheet" href="css/layout.css">
```

### Jerarquía atómica de componentes

| Nivel | Ejemplos |
|-------|----------|
| **Átomos** | `.status-dot`, `.marquee-dot`, `.cursor-dot`, `.skill-pill`, `.project-tag`, `.section-label`, `.project-arrow`, `.contact-arrow`, `.nav-logo-mark`, `.cursor-toggle` |
| **Moléculas** | `.nav-logo`, `.nav-links`, `.nav-status`, `.nav-toggle`, `.section-header`, `.marquee-track`, `.project` (fila), `.project-preview`, `.stat`, `.skills-strip`, `.timeline-item`, `.contact-block`, `.contact-email-link`, `.scroll-cue`, `.hero-meta-right` |
| **Organismos** | `.loader`, `.nav`, `.marquee`, `.hero`, `.page-hero`, `.projects-section`, `.about`, `.contact`, `footer` |
| **Templates** | `section` base + breakpoints en `layout.css` |
| **Páginas** | `index.html`, `pages/work.html`, `pages/about.html` |

> El header y el footer también son componentes transversales reales: se inyectan vía Web Components (`<site-header>`, `<site-footer>`) definidos en `js/components/`. Una sola fuente de verdad para todo el sitio.

---

## 2. 8px Grid System

Toda medida de espaciado (padding, margin, gap, width/height de layout) es múltiplo de **8px**. El medio paso de **4px** (`--space-h`) se usa para ajustes finos.

### Escala (`--space-{n}` = n × 8px)

| Token | px | | Token | px |
|-------|-----|--|-------|-----|
| `--space-h` | 4 | | `--space-10` | 80 |
| `--space-1` | 8 | | `--space-11` | 88 |
| `--space-2` | 16 | | `--space-12` | 96 |
| `--space-3` | 24 | | `--space-14` | 112 |
| `--space-4` | 32 | | `--space-15` | 120 |
| `--space-5` | 40 | | `--space-16` | 128 |
| `--space-6` | 48 | | `--space-18` | 144 |
| `--space-7` | 56 | | `--space-20` | 160 |
| `--space-8` | 64 | | `--space-22` | 176 |
| `--space-9` | 72 | | `--space-24` | 192 |

Anchos de contenido también alineados: 280px (35×8), 336px (42×8), 400px (50×8), 480px (60×8), 560px (70×8), 1440px (180×8).

### Excepciones justificadas

La grilla aplica al **espaciado**. Estas categorías viven fuera de ella por razones legítimas:

- **Tipografía** — escala modular propia (10–180px). Sigue ritmo tipográfico, no espacial.
- **Bordes y outlines** — hairlines de 1px / 2px.
- **Touch targets** — 44×44px (`.nav-toggle`, `.nav-logo` móvil) por **WCAG 2.5.5 AAA**. La accesibilidad manda sobre la grilla.
- **Geometría de iconos** — las barras del hamburguesa (14/17/20/22px) y posiciones internas son medidas de dibujo.
- **Radios** — `--radius-*` son curvaturas, no espaciado.
- **Micro-animaciones** — desplazamientos sutiles de 2px en hover.

---

## 3. Tokens

### Color

| Token | Uso |
|-------|-----|
| `--color-bg` / `--color-bg-inverted` | Superficies clara / oscura |
| `--color-ink` / `--color-ink-soft` / `--color-ink-mute` | Texto sobre claro (contraste AA verificado) |
| `--color-ink-on-dark*` | Texto sobre oscuro (contraste AA verificado) |
| `--color-accent` (#fa3e33) | Marca / acento |
| `--gradient-brand` / `--gradient-brand-warm` | Degradados de marca |

Contrastes verificados para WCAG AA (4.5:1 texto normal). Ver notas en `tokens.css`.

### Tipografía

- **Display:** Fraunces (serif) — títulos.
- **Sans:** Geist — UI / cuerpo.
- **Mono:** Geist Mono — etiquetas, datos, eyebrows.
- Tamaños fijos `--text-2xs`…`--text-3xl` + fluidos `--display-xs`…`--display-xl` (clamp).

### Motion

- Easings: `--ease-out-expo`, `--ease-out-back` (overshoot), `--ease-spring`, `--ease-out-circ`, etc.
- Duraciones: `--duration-fast` (0.2s) … `--duration-slowest` (1.2s).
- Todo respeta `prefers-reduced-motion` (ver `base.css` y `js/main.js`).

### Z-index

`--z-base` (0) · `--z-content` (1) · `--z-floating` (50) · `--z-nav` (100) · `--z-cursor` (9999) · `--z-loader` (10000).

---

## 4. Cómo extender el sistema

1. **¿Nuevo color/tamaño/espaciado?** → agrégalo como token en `tokens.css`. Nunca uses valores mágicos en componentes.
2. **¿Pieza nueva indivisible?** (un badge, un input) → `atoms.css`.
3. **¿Combinas átomos en una unidad?** (un card, un campo con label) → `molecules.css`.
4. **¿Sección de página completa?** → `organisms.css`.
5. **¿Ajuste de layout o breakpoint?** → `layout.css`.
6. **Espaciado:** usa siempre `var(--space-*)`. Si necesitas un valor fuera de grilla, documenta por qué (como las excepciones de arriba).

---

## 5. Accesibilidad

El sistema cumple **WCAG 2.1 AA** (con varios criterios AAA):

- Contraste de color AA en todos los tokens de texto.
- Foco visible (`:focus-visible`), skip-link, landmarks semánticos, ARIA.
- `prefers-reduced-motion` respetado en todas las animaciones.
- Touch targets ≥ 44px (AAA).
- Cursor personalizado desactivable y consciente del teclado.
