# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page for **Dulce Antojo** - Mexican dessert and snack cart service for events in Houston, TX.

- **Domain:** dulcesantojosnackcarts.com
- **Instagram:** @dulceantojo.houstontx
- **Service Area:** Houston, TX (50-mile radius)

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

No test framework is configured.

## Tech Stack

- **Next.js 16** with App Router (images unoptimized in next.config.ts)
- **React 19** with Server Components
- **TypeScript 5**
- **Tailwind CSS 4** (using `@theme inline` syntax in globals.css)
- **shadcn/ui** components in `src/components/ui/`
- **React Hook Form + Zod** for form validation
- **Resend + React Email** for contact form emails
- **Stripe** for payment links and webhooks
- **Turso (libsql)** for database (admin/payments)

## Architecture

### Route Groups
```
src/app/
├── (marketing)/          # Public pages with shared header/footer layout
│   ├── page.tsx          # Homepage
│   ├── services/[slug]/  # Dynamic service pages
│   ├── gallery/
│   ├── contact/
│   ├── about/
│   └── faq/
├── (admin)/admin/        # Admin dashboard (password protected)
├── payment/success/      # Stripe redirect page (outside both groups)
└── api/
    ├── contact/          # Contact form → Resend email
    └── webhooks/stripe/  # Stripe webhook handler
```

### Key Data Flow Patterns

**Contact Form:** Client form (`components/forms/contact-form.tsx`) → POST to `/api/contact` → Zod validation → React Email render → Resend API. Confetti animation on success via dynamic `canvas-confetti` import.

**Stripe Payments:** Admin creates payment link via server action (`actions/payments.ts`) → Customer pays → Stripe webhook (`api/webhooks/stripe/route.ts`) → saves to Turso DB + sends confirmation emails. Email errors are silently caught so webhook always returns 200.

**Admin Auth:** No middleware or session management. Auth is component-state based in `components/admin/admin-login.tsx` (refreshing resets auth). Every DB operation re-verifies admin email exists in `admin_users` table via `verifyAdmin()` in `actions/db-payments.ts`. First visit triggers admin registration setup.

**Database:** Turso tables (`admin_users`, `payments`) are lazily initialized via `ensureDb()` pattern — `initializeDatabase()` in `src/lib/db.ts` uses `.batch()` to create tables on first use. Two payment creation functions exist: `createPaymentLink()` (legacy, uses env `ADMIN_PASSWORD`) and `createPaymentLinkDb()` (current, uses DB auth).

### Key Data Files
- `src/lib/constants.ts` - All business data: services, FAQs, testimonials, event types
- `src/lib/validations.ts` - Zod schemas for forms
- `src/types/index.ts` - TypeScript interfaces
- `src/emails/` - React Email templates

### SEO Components
Located in `src/components/seo/`:
- JSON-LD structured data for LocalBusiness, Service, FAQ, Breadcrumbs
- `src/app/sitemap.ts` and `src/app/robots.ts` for crawlers

## Environment Variables

Required for full functionality:
```
RESEND_API_KEY           # Email sending
CONTACT_EMAIL_FROM       # Sender email
CONTACT_EMAIL_TO         # Recipient for contact forms

STRIPE_SECRET_KEY        # Stripe API
STRIPE_WEBHOOK_SECRET    # Webhook verification

TURSO_DATABASE_URL       # Database connection
TURSO_AUTH_TOKEN         # Database auth

ADMIN_PASSWORD           # Simple admin auth (legacy)
NEXT_PUBLIC_APP_URL      # For Stripe redirects
```

## Brand Colors & Theming

Defined in `src/app/globals.css` using Tailwind 4 `@theme inline` syntax. Colors are also set as `:root` CSS custom properties for shadcn/ui compatibility (light and dark mode defined, though dark mode is not actively used).

Key colors: `pink-accent` (#FF6B95), `pink-bg` (#FFE4EC), `magenta` (#E84A7A), `gold` (#C9A86C).

Note: `teal-primary` is mapped to magenta (#E84A7A), not actual teal — legacy naming from a rebranding.

Fonts: Geist Sans (body), Cormorant Garamond (display headings via `.font-display`).

## Critical Rules

### Always
- Server Components by default (`'use client'` only when needed)
- Import shadcn components individually: `from '@/components/ui/button'`
- Validate with Zod before processing data
- Use `next/image` with descriptive alt text
- Mobile-first responsive design
- Parallel data fetching with `Promise.all`

### Never
- Barrel imports from ui folder
- Hardcode colors (use CSS variables/Tailwind theme)
- Create data waterfalls
- Skip alt text on images

### Git Commits
- Format: `<type>(<scope>): <description>` (e.g., `feat(contact): add form validation`)
- Do not include AI references (Claude, Anthropic, OpenAI) in commits
- Show commit message to user before executing
- Wait for approval before committing
