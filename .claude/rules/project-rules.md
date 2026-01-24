# 📏 Project Rules - Dulce Antojo

## Reglas Obligatorias

Estas reglas SIEMPRE deben seguirse. No hay excepciones.

---

### 1. Server Components por Defecto

```typescript
// ✅ SIEMPRE empezar sin 'use client'
// Solo añadir cuando sea estrictamente necesario

// Razones válidas para 'use client':
// - useState, useEffect, useReducer
// - Event handlers (onClick, onChange, onSubmit)
// - Browser APIs (localStorage, window, document)
// - Custom hooks que usan state
// - Librerías que requieren client (react-hook-form)
```

---

### 2. No Barrel Exports

```typescript
// ❌ NUNCA
import { Button, Card, Input } from '@/components/ui'

// ✅ SIEMPRE
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
```

---

### 3. Validación con Zod

```typescript
// ❌ NUNCA aceptar datos sin validar
const data = await request.json()
await db.insert(data)

// ✅ SIEMPRE validar con Zod
const result = schema.safeParse(data)
if (!result.success) return error
await db.insert(result.data)
```

---

### 4. CSS Variables para Colores

```typescript
// ❌ NUNCA hardcodear colores
className="bg-[#F8B4C4] text-[#4A9B8C]"

// ✅ SIEMPRE usar variables CSS o Tailwind config
className="bg-pink-primary text-teal-primary"
```

---

### 5. next/image para Imágenes

```typescript
// ❌ NUNCA usar <img> nativo
<img src="/photo.jpg" />

// ✅ SIEMPRE usar next/image
import Image from 'next/image'
<Image 
  src="/photo.jpg" 
  alt="Descripción clara"
  width={800}
  height={600}
/>
```

---

### 6. Alt Text Descriptivo

```typescript
// ❌ NUNCA
alt=""
alt="image"
alt="photo"

// ✅ SIEMPRE descripción útil
alt="Mini pancakes con fresas y chocolate para eventos en Houston"
```

---

### 7. Loading States

```typescript
// ❌ NUNCA dejar UX sin feedback
<Button onClick={submit}>Enviar</Button>

// ✅ SIEMPRE mostrar estado
<Button onClick={submit} disabled={isLoading}>
  {isLoading ? 'Enviando...' : 'Enviar'}
</Button>
```

---

### 8. Error Boundaries

```typescript
// ✅ Cada sección importante necesita manejo de errores
// Crear error.tsx para rutas críticas

// app/servicios/error.tsx
'use client'
export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Algo salió mal</h2>
      <button onClick={reset}>Intentar de nuevo</button>
    </div>
  )
}
```

---

### 9. Mobile First

```typescript
// ❌ NUNCA desktop first
className="w-[800px] md:w-full"

// ✅ SIEMPRE mobile first
className="w-full md:w-[800px]"
```

---

### 10. Parallel Data Fetching

```typescript
// ❌ NUNCA waterfall
const services = await getServices()
const testimonials = await getTestimonials()

// ✅ SIEMPRE paralelo
const [services, testimonials] = await Promise.all([
  getServices(),
  getTestimonials()
])
```

---

## Convenciones de Nomenclatura

### Archivos y Carpetas
- **Componentes:** `kebab-case.tsx` (service-card.tsx)
- **Páginas:** `page.tsx` en carpeta de ruta
- **Layouts:** `layout.tsx`
- **Types:** `types.ts` o dentro del componente

### Variables y Funciones
- **Variables:** `camelCase`
- **Constantes:** `SCREAMING_SNAKE_CASE`
- **Componentes:** `PascalCase`
- **Hooks:** `useCamelCase`

### CSS Classes
- **Tailwind:** usar utilidades directamente
- **Custom:** BEM si es necesario (`block__element--modifier`)

---

## Estructura de Imports

```typescript
// 1. React/Next imports
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// 2. Third-party libraries
import { z } from 'zod'
import { useForm } from 'react-hook-form'

// 3. UI Components
import { Button } from '@/components/ui/button'

// 4. Local components
import { ServiceCard } from '@/components/services/service-card'

// 5. Utilities and helpers
import { cn } from '@/lib/utils'

// 6. Types
import type { Service } from '@/types'

// 7. Constants/Data
import { services } from '@/lib/data'
```

---

## Comentarios

```typescript
// ✅ Comentarios útiles - explicar POR QUÉ
// Usamos cache() aquí porque este dato se usa en múltiples componentes
export const getService = cache(async (slug) => {...})

// ❌ Comentarios obvios - NO
// Obtiene el servicio por slug
async function getService(slug: string) {...}

// ✅ TODO con contexto
// TODO(randy): Agregar validación de fecha mínima cuando el cliente confirme requisitos

// ❌ TODO genérico
// TODO: fix this later
```

---

## Git Commits

```bash
# Formato
<type>(<scope>): <description>

# Types
feat:     Nueva funcionalidad
fix:      Bug fix
docs:     Documentación
style:    Formateo (no afecta lógica)
refactor: Refactoring
perf:     Performance
test:     Tests
chore:    Mantenimiento

# Ejemplos
feat(contact): add contact form with zod validation
fix(nav): mobile menu not closing on link click
docs(readme): update setup instructions
perf(images): optimize hero section images
```

### Important Rules:
- DO NOT mention Claude, Anthropic, OpenAI or any AI/company in commits
- DO NOT use "Co-Authored-By" with AI references
- Keep commits clean and professional

---

## Checklist Pre-Deploy

- [ ] Todos los tests pasan
- [ ] No hay `console.log` en producción
- [ ] Todas las imágenes tienen alt
- [ ] Metadata está configurada
- [ ] Variables de entorno documentadas
- [ ] Build local exitoso
- [ ] Lighthouse score > 90 en todas las métricas
