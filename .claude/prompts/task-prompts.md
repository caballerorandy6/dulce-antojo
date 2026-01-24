# 📝 Prompts Reutilizables

## Instrucciones de Uso
Copia y pega estos prompts cuando necesites realizar tareas específicas.
Reemplaza los valores entre `[corchetes]` con información real.

---

## 🧩 Crear Componente

```
Crea un componente React para [DESCRIPCIÓN DEL COMPONENTE].

Requisitos:
1. Server Component por defecto (solo 'use client' si es necesario)
2. TypeScript con props tipados
3. Tailwind CSS usando los colores del proyecto (pink-primary, teal-primary)
4. Accesible (aria labels, roles apropiados)
5. Responsive (mobile-first)
6. Incluir variants si aplica

Ubicación: src/components/[CARPETA]/[nombre-componente].tsx

Contexto del proyecto: Landing page para Dulce Antojo (carritos de snacks para eventos en Houston TX). Estética rosa pastel, femenina, profesional.
```

---

## 📄 Crear Página

```
Crea una página para [DESCRIPCIÓN DE LA PÁGINA].

Requisitos:
1. Metadata SEO completa (title, description, openGraph)
2. Schema JSON-LD apropiado
3. Secciones bien definidas con Server Components
4. Loading state (loading.tsx)
5. Error boundary (error.tsx)
6. Keywords objetivo: [KEYWORDS]

Estructura esperada:
- Hero section
- [SECCIONES ADICIONALES]
- CTA final

Ruta: app/[RUTA]/page.tsx
```

---

## 📋 Crear Formulario

```
Crea un formulario para [PROPÓSITO DEL FORMULARIO].

Stack requerido:
- React Hook Form
- Zod para validación
- Server Action para submit

Campos:
[LISTA DE CAMPOS CON TIPO Y VALIDACIÓN]

Requisitos:
1. Validación en cliente Y servidor
2. Estados de loading, success, error
3. Mensajes de error accesibles (aria-describedby)
4. Labels visibles para cada campo
5. Mobile-friendly (touch targets 44px+)
6. Envío de email con Resend
```

---

## 🎨 Revisar Diseño

```
Revisa el diseño del componente/página [NOMBRE].

Checklist de revisión:
1. Consistencia con la marca Dulce Antojo
   - Rosa (#F8B4C4) como color principal
   - Teal (#4A9B8C) para texto y acentos
   - Bordes redondeados, sombras suaves
2. Jerarquía visual clara
3. CTAs visibles y contrastantes
4. Responsive en 375px, 768px, 1280px
5. Microinteracciones en hover/focus
6. Imágenes con aspect ratio correcto

Archivo: [RUTA DEL ARCHIVO]
```

---

## ⚡ Auditar Performance

```
Audita el rendimiento del archivo/componente [NOMBRE].

Verificar:
1. Waterfalls de datos (deben ser paralelos)
2. Imports específicos (no barrel exports)
3. Server vs Client Components (justificar 'use client')
4. Dynamic imports para componentes pesados
5. next/image con sizes correctos
6. Cache de queries con React.cache()

Objetivo: LCP < 2.5s, FID < 100ms, CLS < 0.1

Archivo: [RUTA DEL ARCHIVO]
```

---

## ♿ Verificar Accesibilidad

```
Verifica la accesibilidad del componente [NOMBRE].

Checklist WCAG 2.1 AA:
1. Estructura semántica (headings, landmarks)
2. Imágenes con alt descriptivo
3. Contraste de colores (4.5:1 texto, 3:1 UI)
4. Navegación por teclado
5. Focus visible
6. Formularios con labels y errores accesibles
7. Contenido dinámico con aria-live
8. Touch targets >= 44px

Archivo: [RUTA DEL ARCHIVO]
```

---

## 🔍 Optimizar SEO

```
Optimiza el SEO de la página [NOMBRE].

Información:
- URL: [URL FINAL]
- Keywords objetivo: [KEYWORDS]
- Audiencia: [DESCRIPCIÓN]

Implementar:
1. Metadata completa (title < 60 chars, description < 160)
2. Open Graph tags
3. Schema JSON-LD (LocalBusiness, Service, FAQ según aplique)
4. Headings jerárquicos (solo 1 H1)
5. Alt text optimizado para imágenes
6. Internal links relevantes
7. URL amigable

Archivo: [RUTA DEL ARCHIVO]
```

---

## 🧪 Generar Tests

```
Genera tests para el componente/función [NOMBRE].

Stack: Vitest + React Testing Library

Tests a incluir:
1. Renderizado básico
2. Props y variants
3. Interacciones de usuario
4. Estados (loading, error, success)
5. Accesibilidad básica (roles, labels)
6. Edge cases

Cobertura objetivo: > 80%

Archivo a testear: [RUTA]
Archivo de test: [RUTA]/__tests__/[nombre].test.tsx
```

---

## 👨‍💻 Code Review

```
Revisa el código del archivo [NOMBRE].

Criterios de revisión:
1. TypeScript - tipos correctos, sin 'any'
2. Clean code - nombres descriptivos, funciones pequeñas
3. React patterns - composición, hooks correctos
4. Performance - sin waterfalls, imports específicos
5. Seguridad - validación de inputs
6. Mantenibilidad - código legible, bien organizado

Proporcionar:
- ✅ Lo que está bien
- 🟡 Sugerencias opcionales
- 🔴 Cambios requeridos
- Código refactorizado si aplica

Archivo: [RUTA DEL ARCHIVO]
```

---

## 🚀 Pre-Deploy Check

```
Realiza verificación pre-deploy del proyecto.

Checklist completo:
1. Build exitoso sin warnings
2. Tests pasando
3. No console.log en producción
4. Variables de entorno configuradas
5. Metadata SEO en todas las páginas
6. Sitemap generado
7. robots.txt correcto
8. Imágenes optimizadas
9. Lighthouse > 90 en todas las métricas
10. Links funcionando
11. Formularios enviando correctamente
12. Responsive verificado en dispositivos reales

Reportar cualquier issue encontrado.
```

---

## 📦 Agregar Servicio

```
Agrega el servicio [NOMBRE DEL SERVICIO] al catálogo.

Información del servicio:
- Nombre: [NOMBRE]
- Slug: [slug-url]
- Descripción corta: [DESCRIPCIÓN]
- Descripción completa: [DESCRIPCIÓN LARGA]
- Incluye: [LISTA DE LO QUE INCLUYE]
- Imagen: [RUTA O DESCRIPCIÓN]

Actualizar:
1. Datos en lib/data/services.ts
2. Página de detalle si no existe
3. Schema JSON-LD de servicio
4. Sitemap
```

---

## 🌐 Internacionalización

```
Prepara el contenido para [ESPAÑOL/INGLÉS].

Contenido a traducir:
[CONTENIDO]

Requisitos:
1. Mantener el tono de marca (dulce, profesional, festivo)
2. Adaptar expresiones culturalmente
3. Mantener keywords SEO equivalentes
4. No traducir nombres de marca ni productos específicos

Formato de salida:
```json
{
  "es": { ... },
  "en": { ... }
}
```
```
