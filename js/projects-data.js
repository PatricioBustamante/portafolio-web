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
    recentProject: true, visibleProject: true,
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
    recentProject: true, visibleProject: true,
    company: 'Mesa', initial: 'Ms',
    title: 'Mesa Co', category: 'E-commerce', year: '2024',
    role: 'Product Designer', client: 'Mesa',
    services: ['UX/UI Design', 'Prototipado', 'Testing'],
    tags: ['E-commerce', 'UX/UI', 'Prototipado'],
    summary: 'Rediseño de plataforma de e-commerce para productos gourmet. Enfoque en experiencia móvil y optimización de checkout.',
    challenge: 'La plataforma original tenía una tasa de abandono del carrito del 75% y una experiencia móvil deficiente que no reflejaba la calidad premium de los productos.',
    solution: 'Rediseñé la experiencia móvil con un enfoque en la simplicidad y el storytelling visual, y optimicé el proceso de checkout para reducir fricción.',
    outcome: [
      { metric: '−75%', label: 'abandono del carrito' },
      { metric: '+30%', label: 'conversiones móviles' },
      { metric: '4.8', label: 'rating de usuarios' }
    ]
  }
};

/* Lista ordenada de slugs para navegación "siguiente proyecto". */
window.PROJECT_ORDER = Object.keys(window.PROJECTS);
