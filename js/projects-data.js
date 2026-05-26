/* ============================================
   PROJECTS DATA · fuente única de los proyectos
   ----------------------------------------------
   Estructura por proyecto:
     num, preview, recentProject, visibleProject
     company, initial, title, category, year
     client, role, tags, summary
     challenge          → Desafío
     mainObjective      → Objetivo principal
     objectives[]       → Objetivos secundarios
     solution           → Solución
     processes[]        → Procesos realizados
     tools[]            → Herramientas utilizadas
     metrics[]          → { label, value, before, after, change }
     lessons[]          → Aprendizajes
   ============================================ */

window.PROJECTS = {

  'betterfly-onboarding': {
    num: '011', preview: 4,
    recentProject: true, visibleProject: true,
    company: 'Betterfly', initial: 'Bt',
    title: 'Onboarding / Enrolamiento', category: 'Insurtech', year: '2021',
    client: 'Betterfly',
    role: 'Product Designer',
    tags: ['Insurtech', 'Móvil', 'UX Research'],
    summary: 'Optimización del flujo de enrolamiento en Betterfly, reduciendo el abandono de 65% a 10% y el tiempo de completado de 12 a 5 minutos mediante simplificación del proceso y mejora en la comunicación del producto.',

    challenge: 'Mejorar el tiempo en que los usuarios completan el onboarding del producto, optimizando la comprensión del proceso y reduciendo el abandono durante el flujo.',

    mainObjective: 'Aumentar el número de usuarios que completen exitosamente el proceso de enrolamiento, asegurando una comprensión clara del producto contratado a través de sus empleadores.',

    objectives: [
      'Incrementar la comprensión de los beneficios y funcionalidades del producto durante el proceso de onboarding, mediante contenidos claros y contextualizados para cada tipo de usuario.',
      'Reducir los puntos de fricción dentro del flujo de enrolamiento, simplificando tareas, formularios y validaciones para disminuir el abandono del proceso.',
      'Mejorar la orientación y confianza de los usuarios durante el onboarding, incorporando ayudas visuales, feedback en tiempo real y estados de progreso claros.'
    ],

    solution: 'Se diseñó un proceso claro y transparente que explicaba de manera simple los productos incluidos en el plan, optimizando además el flujo mediante la reducción de pasos. Esto permitió disminuir en un 90% la cantidad de usuarios que abandonaban el proceso.',

    processes: [
      'Análisis completo del proceso de onboarding para detectar puntos de fricción, pasos innecesarios y momentos críticos donde los usuarios abandonaban el flujo.',
      'Optimización de la estructura del onboarding reduciendo la cantidad de pasos, acciones y decisiones que el usuario debía completar.',
      'Rediseño de la presentación de la información para explicar de manera clara y transparente los beneficios y productos incluidos en el plan contratado.',
      'Pruebas de usabilidad y seguimiento de métricas clave para evaluar el comportamiento de los usuarios e iterar mejoras continuas.'
    ],

    tools: [
      'Figma',
      'Google Analytics',
      'Hotjar',
      'Maze',
      'Jira'
    ],

    metrics: [
      {
        label: 'Tasa de finalización',
        value: '+43pp',
        before: '35%',
        after: '78%',
        change: '+43%'
      },
      {
        label: 'Abandono del flujo',
        value: '−55pp',
        before: '65%',
        after: '10%',
        change: '−85%'
      },
      {
        label: 'Tiempo de enrolamiento',
        value: '−58%',
        before: '12 min',
        after: '5 min',
        change: '−58%'
      },
      {
        label: 'Comprensión del producto',
        value: '+40pp',
        before: '45%',
        after: '85%',
        change: '+40%'
      }
    ],

    lessons: [
      'El diseño centrado en el usuario puede impactar directamente tanto en la experiencia como en los objetivos de negocio.',
      'A través de research, análisis de comportamiento y validación continua, es posible identificar fricciones clave y transformarlas en oportunidades de mejora.',
      'La simplificación del flujo y una comunicación más clara del producto aumentan la confianza del usuario y reducen significativamente el abandono del proceso.',
      'El trabajo colaborativo con equipos multidisciplinarios es fundamental para construir soluciones escalables, alineadas con las necesidades del usuario y los objetivos estratégicos.'
    ]
  },

};

/* Lista ordenada de slugs para navegación "siguiente proyecto". */
window.PROJECT_ORDER = Object.keys(window.PROJECTS);
