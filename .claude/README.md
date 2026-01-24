# 🤖 Claude AI Project Setup - Dulce Antojo

## Resumen del Proyecto

**Negocio:** Dulce Antojo - Mini Pancakes & More  
**Tipo:** Landing Page para servicio de carritos de snacks/postres para eventos  
**Ubicación:** Houston, TX  
**Instagram:** @dulceantojo.houstontx

---

## 📁 Estructura de la Carpeta `.claude/`

```
.claude/
├── CLAUDE.md              # Configuración principal del proyecto
├── README.md              # Este archivo
├── agents/                # Sub-agentes especializados
│   ├── design-reviewer.md
│   ├── performance-auditor.md
│   ├── accessibility-checker.md
│   ├── seo-optimizer.md
│   ├── test-writer.md
│   └── code-reviewer.md
├── rules/                 # Reglas obligatorias del proyecto
│   └── project-rules.md
├── prompts/               # Prompts reutilizables
│   └── task-prompts.md
└── data/                  # Datos del negocio
    └── business-data.md
```

---

## 🎯 Sub-Agentes Disponibles

### 1. 🎨 Design Reviewer
**Archivo:** `agents/design-reviewer.md`  
**Propósito:** Revisar UI/UX para consistencia con la marca Dulce Antojo

**Cuándo usar:**
- Al crear nuevos componentes visuales
- Al modificar estilos existentes
- Al implementar animaciones
- Para verificar responsive design

**Invocación:**
```
Actúa como el Design Reviewer Agent. Revisa el componente [NOMBRE] 
ubicado en [RUTA] siguiendo las guías en .claude/agents/design-reviewer.md
```

---

### 2. ⚡ Performance Auditor
**Archivo:** `agents/performance-auditor.md`  
**Propósito:** Optimizar rendimiento siguiendo Vercel Best Practices

**Cuándo usar:**
- Al crear páginas con data fetching
- Al agregar nuevas dependencias
- Al trabajar con imágenes
- Antes de deploy a producción

**Invocación:**
```
Actúa como el Performance Auditor Agent. Audita el archivo [NOMBRE]
siguiendo las guías en .claude/agents/performance-auditor.md
```

**Prioridades:**
1. 🔴 CRÍTICO: Eliminar waterfalls, optimizar bundle
2. 🟡 ALTO: Server Components, dynamic imports
3. 🟢 MEDIO: Re-renders, caching

---

### 3. ♿ Accessibility Checker
**Archivo:** `agents/accessibility-checker.md`  
**Propósito:** Asegurar cumplimiento WCAG 2.1 AA

**Cuándo usar:**
- Al crear componentes interactivos
- Al implementar formularios
- Al agregar imágenes o media
- Al crear modales/overlays

**Invocación:**
```
Actúa como el Accessibility Checker Agent. Verifica la accesibilidad
del componente [NOMBRE] siguiendo .claude/agents/accessibility-checker.md
```

---

### 4. 🔍 SEO Optimizer
**Archivo:** `agents/seo-optimizer.md`  
**Propósito:** Optimizar para búsquedas locales en Houston

**Cuándo usar:**
- Al crear nuevas páginas
- Al escribir contenido
- Al agregar imágenes
- Al configurar metadata

**Keywords objetivo:**
- "snack cart Houston TX"
- "mini pancakes catering Houston"
- "event desserts Houston"
- "carritos de postres Houston"

**Invocación:**
```
Actúa como el SEO Optimizer Agent. Optimiza la página [NOMBRE]
para las keywords [KEYWORDS] siguiendo .claude/agents/seo-optimizer.md
```

---

### 5. 🧪 Test Writer
**Archivo:** `agents/test-writer.md`  
**Propósito:** Escribir tests con Vitest + React Testing Library

**Cuándo usar:**
- Al crear nuevos componentes
- Al implementar lógica de negocio
- Al trabajar en formularios
- Antes de merge de PRs

**Invocación:**
```
Actúa como el Test Writer Agent. Genera tests para [COMPONENTE]
siguiendo las guías en .claude/agents/test-writer.md
```

---

### 6. 👨‍💻 Code Reviewer
**Archivo:** `agents/code-reviewer.md`  
**Propósito:** Revisar calidad de código y mejores prácticas

**Cuándo usar:**
- Al crear cualquier código nuevo
- Al hacer refactoring
- Antes de commits importantes
- Para revisión general de calidad

**Invocación:**
```
Actúa como el Code Reviewer Agent. Revisa el código en [RUTA]
siguiendo las guías en .claude/agents/code-reviewer.md
```

---

## 🚀 Flujos de Trabajo Recomendados

### Crear un Nuevo Componente
```
1. Crear componente básico
2. → Design Reviewer (verificar estética)
3. → Accessibility Checker (verificar a11y)
4. → Code Reviewer (verificar calidad)
5. → Test Writer (generar tests)
```

### Crear una Nueva Página
```
1. Crear estructura de página
2. → SEO Optimizer (metadata, schema)
3. → Performance Auditor (data fetching)
4. → Design Reviewer (layout, responsive)
5. → Accessibility Checker (estructura semántica)
```

### Pre-Deploy Checklist
```
1. → Performance Auditor (toda la app)
2. → SEO Optimizer (todas las páginas)
3. → Accessibility Checker (componentes críticos)
4. → Code Reviewer (archivos modificados)
5. Build local y verificar
```

---

## 🎨 Paleta de Colores

```css
/* Principales */
--pink-primary: #F8B4C4;    /* Rosa del logo */
--pink-light: #FDE8ED;      /* Fondo rosado */
--teal-primary: #4A9B8C;    /* Verde del texto */

/* Secundarios */
--gold-accent: #D4A574;     /* Dorado decorativo */
--cream-bg: #FFF9F9;        /* Fondo crema */

/* Texto */
--text-dark: #4A4A4A;
--text-muted: #7A7A7A;
```

---

## 📦 Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| Next.js 15+ | Framework (App Router) |
| React 19+ | UI Library |
| TypeScript | Type safety |
| TailwindCSS | Estilos |
| shadcn/ui | Componentes UI |
| React Hook Form | Formularios |
| Zod | Validación |
| Resend | Emails |

---

## 📝 Uso Rápido de Prompts

Ver `prompts/task-prompts.md` para prompts listos para copiar y pegar:

- Crear componente
- Crear página
- Crear formulario
- Revisar diseño
- Auditar performance
- Verificar accesibilidad
- Optimizar SEO
- Generar tests
- Code review
- Pre-deploy check

---

## 📊 Datos del Negocio

Ver `data/business-data.md` para:

- Información de contacto
- Catálogo completo de 13 servicios
- Opciones de toppings y sabores
- Categorías (Dulces, Salados, Paquetes)
- Tipos de eventos
- FAQ sugerido
- Testimonios de ejemplo

---

## ⚠️ Reglas Críticas

Ver `rules/project-rules.md` - Las 10 reglas que SIEMPRE deben seguirse:

1. Server Components por defecto
2. No barrel exports
3. Validación con Zod
4. CSS variables para colores
5. next/image para imágenes
6. Alt text descriptivo
7. Loading states
8. Error boundaries
9. Mobile first
10. Parallel data fetching

---

## 🔗 Referencias Externas

- [Vercel React Best Practices](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices)
- [AI SDK 6 Documentation](https://vercel.com/blog/ai-sdk-6)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Next.js Documentation](https://nextjs.org/docs)
