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
