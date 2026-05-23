# cursorfieldcto.com

Single-page personal positioning site for Field CTO / AI Adoption Strategist roles.

## Stack

- Next.js 16 (App Router, Server Components)
- TypeScript
- Tailwind CSS v4
- React 19
- Bun
- Resend (contact form)

## Development

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and set:

- `RESEND_API_KEY` — Resend API key
- `CONTACT_TO_EMAIL` — inbox for contact form submissions

## Content

Editable content lives in `content/`:

- `site.json` — hero, nav, meta, CTAs
- `about.md` — about narrative
- `expertise.json` — capability cards
- `experience.json` — professional experience
- `resume.json` — resume highlights + PDF path
- `contact.json` — connect section and form copy

Add your resume PDF to `public/resume/david-solheim-resume.pdf`.
Add introduction video to `public/david-introduction.mp4`.

## Scripts

```bash
bun dev
bun run build
bun start
bun run lint
```

## Deployment

Hosted on Vercel at [cursorfieldcto.com](https://cursorfieldcto.com).

### Launch checklist

- [ ] Add resume PDF to `public/resume/david-solheim-resume.pdf`
- [ ] Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` in Vercel project env
- [ ] Point `cursorfieldcto.com` DNS to Vercel
- [ ] Run `bun run build` locally before promoting to production
