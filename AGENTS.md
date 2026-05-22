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
