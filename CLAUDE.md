# Dulce Antojo - Landing Page Project

## Project Overview
Landing page for **Dulce Antojo** - a Mexican dessert and snack cart service for events in Houston, TX.

- **Instagram:** @dulceantojo.houstontx
- **Location:** Houston, TX (50-mile service radius)
- **Primary Language:** English (Spanish support planned)
- **Type:** Conversion-optimized landing page with local SEO

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15+ | Main framework (App Router) |
| React | 19+ | UI Library |
| TypeScript | 5+ | Type safety |
| TailwindCSS | 4+ | Styling |
| shadcn/ui | latest | UI Components |
| React Hook Form | 7+ | Form handling |
| Zod | 3+ | Schema validation |
| Resend | latest | Email sending |
| Lucide Icons | latest | Iconography |

---

## Brand Design Guide

### Color Palette

```css
:root {
  /* Primary Colors */
  --pink-primary: #F8B4C4;      /* Main logo pink */
  --pink-light: #FDE8ED;        /* Light background */
  --pink-soft: #FADCE5;         /* Soft pink */
  --pink-accent: #E891A8;       /* Accent pink */

  /* Secondary Colors */
  --teal-primary: #4A9B8C;      /* Logo text teal */
  --teal-dark: #2D7A6C;         /* Dark teal for emphasis */
  --gold-accent: #D4A574;       /* Logo border gold */

  /* Neutrals */
  --cream-bg: #FFF9F9;          /* Cream pink background */
  --text-dark: #4A4A4A;         /* Main text */
  --text-muted: #7A7A7A;        /* Secondary text */

  /* States */
  --success: #68B984;
  --error: #E57373;
}
```

**Tailwind Classes:** `pink-primary`, `pink-light`, `pink-accent`, `teal-primary`, `teal-dark`, `gold-accent`, `cream-bg`

### Typography
- **Display/Headings:** Playfair Display or Cormorant Garamond (elegant)
- **Body:** DM Sans or Nunito (readable, friendly)
- **Accents:** Dancing Script (decorative details)

### Visual Style
- **Tone:** Feminine, sweet, professional, festive
- **Aesthetic:** Soft pink, delicate, Instagram-friendly
- **Elements:** Rounded borders, soft shadows, kawaii-style illustrations
- **Icons:** Lucide Icons with soft strokes

---

## Services (13 Total)

### Sweet
1. **Mini Pancakes** - 10 mini pancakes, 4 drizzles, 6 toppings
2. **Paletas Locas** - +10 flavors, 7 toppings, 2 fresh fruits
3. **Paleta Cart Rental** - From 50 popsicles, self-serve
4. **Sorbet** - 6 flavors, 6 toppings, sweet or savory
5. **Sundaes** - 1-2 ice cream flavors, drizzles, 6 toppings
6. **Churro Sundaes** - 2 churros 5in, ice cream, toppings
7. **Churros** - 10in or (2) 5in, drizzles
8. **Fresa Cups** - 8oz strawberries, cream/chocolate

### Savory
9. **Corn in a Cup** - 8oz, corn toppings, 3 chips
10. **Tosti-Elote** - With Tostitos, corn toppings
11. **Snack Cup** - 8oz, 9 toppings, chamoy/tajín
12. **Ramen/Maruchan** - With Mexican toppings

### Packages
13. **Mix & Match** - Custom 2-service package

**All Services Include:** 1-2 hours service, professional attendant, customizable add-ons

---

## Project Structure

```
src/
├── app/
│   ├── (marketing)/        # Public routes group
│   │   ├── page.tsx        # Homepage
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   ├── contact/
│   │   ├── gallery/
│   │   ├── about/
│   │   ├── faq/
│   │   └── layout.tsx      # Header + Footer
│   ├── api/
│   │   └── contact/
│   │       └── route.ts
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/                 # shadcn components
│   ├── sections/           # Page sections
│   │   ├── hero.tsx
│   │   ├── services-grid.tsx
│   │   ├── testimonials.tsx
│   │   └── cta-section.tsx
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── mobile-nav.tsx
│   ├── forms/
│   │   └── contact-form.tsx
│   └── shared/
│       ├── service-card.tsx
│       └── section-header.tsx
├── lib/
│   ├── utils.ts
│   ├── validations.ts      # Zod schemas
│   └── constants.ts        # Business data
├── hooks/
├── types/
│   └── index.ts
```

---

## Critical Rules

### ALWAYS:
1. Use Server Components by default
2. Import specifically from shadcn/ui (no barrel imports)
3. Validate with Zod before sending data
4. Implement loading states and error boundaries
5. Optimize images with next/image
6. Use CSS variables for theme colors
7. Mobile-first responsive design
8. Parallel data fetching with Promise.all

### NEVER:
1. Use `'use client'` without real need
2. Create data waterfalls (use Promise.all)
3. Import full libraries (tree-shaking)
4. Hardcode colors (use CSS variables)
5. Omit alt text on images
6. Ignore mobile-first design
7. Use barrel exports

### GIT COMMITS:
- DO NOT mention Claude, Anthropic, OpenAI or any AI/company in commits
- DO NOT use "Co-Authored-By" with AI references
- Keep commits clean and professional
- ALWAYS show the commit message to the user BEFORE executing git commit
- Wait for user approval before committing

---

## Agents Configuration

Located in `.claude/agents/`:

| Agent | File | Use Case |
|-------|------|----------|
| Design Reviewer | `design-reviewer.md` | UI/UX review |
| Performance Auditor | `performance-auditor.md` | React/Next.js optimization |
| Accessibility Checker | `accessibility-checker.md` | WCAG compliance |
| SEO Optimizer | `seo-optimizer.md` | Local & technical SEO |
| Test Writer | `test-writer.md` | Component testing |
| Code Reviewer | `code-reviewer.md` | Best practices |

---

## SEO - Houston Local

### Target Keywords
- "snack cart Houston TX"
- "mini pancakes catering Houston"
- "event desserts Houston"
- "Mexican dessert carts Houston"
- "churros for events Houston"
- "elote catering Houston"

### Required Schema Markup
- LocalBusiness
- FoodEstablishment
- Service
- Review/Rating

---

## Quick Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
```

---

## Extended Documentation

See `.claude/` folder for:
- `agents/` - Specialized review agents
- `prompts/` - Reusable task prompts
- `data/` - Business data reference
- `rules/` - Detailed project rules
- `skills/` - React best practices
