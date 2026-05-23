<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# field-cto project conventions

- **Package manager:** Bun (`bun install`, `bun dev`, `bun run build`)
- **Content:** editable copy lives in `content/` (JSON + Markdown)
- **Sections:** page sections in `src/components/sections/`
- **Layout:** sticky anchor nav in `src/components/layout/`
- **Theme:** monochrome CSS variables in `src/app/globals.css` — no color accents
- **Single page:** all sections composed in `src/app/page.tsx` with `#anchor` IDs

## Learned User Preferences

- Plan Linear issues in a project before starting implementation work
- Strict monochrome (B&W/grayscale only) — no color accents; visual interest via typography, spacing, and borders
- Contact form only via Resend — no Calendly embed
- Site copy should speak directly to Cursor hiring, engineering, GTM, and leadership (especially the Connect/contact section); lead with **Field CTO · AI Adoption Strategist** in hero/meta, not resume job title
- When showcasing skills built in other tooling, describe them as Cursor custom skills without naming the original source tools
- Use official Cursor brand assets on key site surfaces (`public/brand/cursor/`, `CursorLogo` component)
- Site must be mobile-optimized — layouts, sticky nav, anchor scroll, and mobile menu across all breakpoints

## Learned Workspace Facts

- Personal positioning site at cursorfieldcto.com for David Solheim — Field CTO / AI Adoption Strategist (Cursor and similar AI dev-tool companies)
- Stack: Next.js 16 App Router, React 19, Tailwind CSS v4, Resend contact form (Server Action + Zod), deployed on Vercel
- Linear tracking: Teton Web team, project `cursorfieldcto.com — Field CTO Site`
- Content files: `site.json` (hero/nav/meta/headshot/heroVideo), `contact.json` (Connect section + form copy), `about.md`, `expertise.json`, `experience.json`, `resume.json`
- Assets: headshot at `public/david_headshot.jpg` (path in `site.json`); resume PDF at `public/resume/david-solheim-resume.pdf`; cover letter at `public/resume/david-solheim-cover-letter.pdf`
- Contact form requires env vars `RESEND_API_KEY` and `CONTACT_TO_EMAIL`
- Vercel Framework Preset must be **Next.js** — if set to Other/public, root URL serves static files only and returns NOT_FOUND
- Page flow: Hero → About → Expertise → Experience → Resume → Connect (`#connect`); hero video at `public/david-introduction.mp4` (poster: headshot)
