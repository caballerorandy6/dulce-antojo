# Dulce Antojo — Snack Carts for Events

**Website and payments for a Mexican dessert and snack cart business in Houston, TX** — service pages, gallery, contact form with email, and an admin panel that creates Stripe payment links for customers.

**Live:** [dulce-antojo-snack-carts.vercel.app](https://dulce-antojo-snack-carts.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38b2ac?logo=tailwindcss)
![Stripe](https://img.shields.io/badge/Stripe-635bff?logo=stripe&logoColor=white)
![Turso](https://img.shields.io/badge/Turso-libSQL-4ff8d2)

## What it does

### Public site
- Landing page with video hero, services, testimonials and calls to action.
- A page for each service (mini pancakes, churros, paletas, elote cups, ramen, sundaes and more), plus gallery, about and FAQ.
- Contact form validated with Zod, emailed with Resend and React Email, with a confetti animation on success.
- Local SEO: JSON-LD for LocalBusiness, Service, FAQ and breadcrumbs, sitemap and robots.

### Admin panel and payments
- Password-protected admin (bcrypt) with a signed httpOnly session cookie (HMAC, 8-hour expiry). Registering the first admin requires a setup token.
- The admin creates a **Stripe payment link** for a customer (name, amount, description).
- When the customer pays, a **Stripe webhook** saves the payment in Turso and sends confirmation emails. If saving fails, the webhook returns 500 so Stripe retries; a unique session ID keeps retries from creating duplicates or sending emails twice.

## Tech stack

| Area | Tools |
|---|---|
| Framework | Next.js 16 (App Router, Server Components, Server Actions), React 19, TypeScript |
| UI | Tailwind CSS 4, shadcn/ui (Radix), lucide-react, Lordicon/Lottie animations |
| Forms | React Hook Form, Zod |
| Email | Resend, React Email |
| Payments | Stripe payment links and webhooks |
| Database | Turso (libSQL) |
| Hosting | Vercel |

## Project structure

```
src/
  app/
    (marketing)/        public pages: home, services/[slug], gallery, about, contact, faq
    (admin)/admin/      admin dashboard
    payment/success/    page after a Stripe payment
    api/contact/        contact form → email
    api/webhooks/stripe/ Stripe webhook
    actions/            server actions (auth, payments)
  components/           UI, sections, forms and SEO components
  emails/               React Email templates
  lib/                  business data, database, session, Stripe, validation
scripts/                image optimization
```

## Getting started

**Requirements:** Node.js 20.9+ and a Turso database (or a local libSQL file).

```bash
git clone https://github.com/caballerorandy6/dulce-antojo.git
cd dulce-antojo
npm install
# create .env.local with the variables below
npm run dev      # http://localhost:3000
```

The database tables are created automatically on first use.

### Environment variables

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Email sending |
| `CONTACT_EMAIL_FROM`, `CONTACT_EMAIL_TO` | Sender and recipient of contact emails |
| `NEXT_PUBLIC_APP_URL` | Site URL |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Payment links and webhook |
| `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` | Database |
| `SESSION_SECRET` | Signs the admin session cookie |
| `ADMIN_SETUP_TOKEN` | Required to register the first admin |

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint |

## Author

**Randy Caballero** — Full-Stack Developer, Houston, TX
[rcweb.dev](https://rcweb.dev) · [LinkedIn](https://linkedin.com/in/caballerorandy) · [GitHub](https://github.com/caballerorandy6)
