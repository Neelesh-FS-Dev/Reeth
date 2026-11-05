# Reeth: concept website

A sales-pitch sample for **Reeth**, a restaurant and bar in Baner, Pune ("Spice & Spirit").
Built with React 19, Vite 8, TypeScript, Tailwind CSS v4, Radix UI, GSAP with ScrollTrigger,
Lenis, and the owner's photos and reel videos. Forms use react-hook-form with zod, and submission is mocked.

## Setup

```bash
pnpm install
pnpm dev           # local dev server
pnpm build         # type-check, generate sitemap, production build to dist/
pnpm preview       # serve the build on :4173
pnpm test          # Vitest unit and component tests
pnpm test:e2e      # Playwright (Chromium and WebKit; starts a build + preview itself)
pnpm lint          # ESLint (typescript-eslint, jsx-a11y, react-hooks)
pnpm typecheck     # tsc -b --noEmit
pnpm format        # Prettier write
pnpm images        # regenerate placeholder artwork and image derivatives
pnpm screenshots   # responsive capture pass into tests/screenshots/
```

Requirements: Node 22 or later, pnpm 10 or later, and ffmpeg (only for regenerating reel videos).

## Project layout

- `src/data/`: all business content (`site.config.ts`, `menu.ts`, `events.ts`, `reels.ts`,
  `gallery.ts`, `team.ts`, `roles.ts`, `packages.ts`, `highlights.ts`, `regions.ts`, `about.ts`,
  `copy.ts`, `placeholders.ts`). Components do not hard-code business facts.
- `src/components/`: `ui/` (shadcn-style primitives on Radix), `layout/`, `brand/`, `home/`,
  `menu/`, `events/`, `reels/`, `gallery/`, `about/`, `catering/`, `careers/`, `contact/`.
- `src/animations/`: GSAP registration, Lenis bridge, and the reveal, counter, parallax,
  magnetic, and hero-entrance hooks.
- `src/lib/`: validators (zod), formatters (INR, IST dates), mocked `submitEnquiry`, SEO and
  JSON-LD, and the image manifest helpers.
- `media-src/`: source originals (placeholder artwork and reel clips). Not shipped.
- `public/`: derivatives that ship (`images/`, `video/`, `favicon.svg`, `robots.txt`,
  `sitemap.xml` generated from the route list).
- `tests/unit/`, `tests/e2e/`, `tests/screenshots/`.

## Design decisions

**Tokens.** The brief's palette is defined as `--color-*` variables in `src/styles/tokens.css`,
with semantic tokens on top (`--bg`, `--fg`, `--accent`, and so on). Tailwind maps them in
`src/styles/globals.css` (`bg-bg`, `text-fg`, `bg-accent`, `text-brand-navy`). The Night theme is
`[data-theme="night"]` on a section. There is no site-wide toggle.

**Contrast (WCAG 2.2 AA).** `tests/unit/contrast.test.ts` locks the pairs in. Two adjustments
came out of the measurements:

- Terracotta text on cream is 4.31:1, which fails. Text accents on light surfaces use ember
  (`--accent-text`, 8.8:1). Terracotta stays for buttons, where on-accent text is 4.79:1.
- Saffron on cream is about 1.9:1, which fails the 3:1 focus-indicator requirement. The light
  focus ring is ember. The Night focus ring stays saffron (7.1:1 on navy).

**Type.** Fraunces (display), DM Sans (body), and Pinyon Script (eyebrows, at most one per
section). Loaded from Google Fonts with `display=swap`. Display sizes use `clamp()`.

**Motion.**
- Lenis is driven from the GSAP ticker, with `lagSmoothing(0)`. It is disabled under reduced motion.
- The hero entrance is a line-mask reveal (under 1.6s). Scroll reveals fire once at 80%.
- The regional journey pins on desktop (1024px and up) and scrubs horizontally. Elsewhere it is a
  scroll-snap carousel.
- Page transition: the route fades in (opacity only, 0.45s). The earlier cream curtain was removed
  after review. There is no fade-out before navigation.
- Framer Motion is not used. Tab and sheet transitions are CSS keyframes, which keeps the
  dependency count down.

**Hero media.** The hero is a split layout: copy on the left and a vertical reel on the right (`src/components/home/HeroVideo.tsx`). The reel loops muted while it is on screen, pauses off screen, and has play/pause and sound buttons. Three.js was removed at the owner's request, along with its packages.

**Forms.** `react-hook-form` with `zodResolver`, `aria-invalid` and `aria-describedby` wired per
field, and focus on the first invalid field on submit. `submitEnquiry()` in `src/lib/api.ts` resolves
after 800ms and has a `// TODO` marking the backend hook. A payload containing the text
`simulate error` rejects, so the error state can be tested. Phone validation accepts 10-digit Indian
mobiles (first digit 6 to 9) with an optional +91. The CV field accepts PDF only, at most 5MB.

**Menu.** A single list of dishes and drinks, each with its name, description, price, and a veg or
non-veg mark. Category tabs, filter chips, and tag badges were removed at the owner's request.

**Night section.** `data-theme="night"` on the hero, events, about states, footer, and reserve band.

**Reduced motion.** `prefers-reduced-motion` disables the marquee, parallax, pinning, the hero video autoplay,
the page fade. Opacity fades remain.

## Deviations from the brief

| Brief | What was done | Why |
|---|---|---|
| shadcn/ui via the CLI | Components written by hand in the shadcn pattern on Radix | No network-dependent CLI step; same primitives and API shape |
| Framer Motion for tab switching | CSS keyframes | Fewer dependencies |
| TypeScript 7 | TypeScript 6.0 (`~6.0.0`) | typescript-eslint only supports `<6.1` |
| Prettier, ESLint with jsx-a11y | ESLint 10 flat config with jsx-a11y and Prettier | As specified; oxlint from the scaffold was removed |
| Unsplash or Pexels photos | Generated abstract placeholder artwork (see `CREDITS.md`) | No photography supplied, and no image downloads were made |
| Real reel footage | Generated gradient clips (ffmpeg) | Same |
| Lighthouse 90+ on every category | Not run (see Verification) | Needs a browser-run Lighthouse pass |
| `prefers-color-scheme` respected | Not applied | Brand decision: light by default, Night only in designated sections |
| Line-by-line text split | Lines are defined manually in `copy.ts` | Measuring line breaks is brittle across fonts |
| Route transition: wipe | Opacity fade-in only | Owner feedback |
| Focus ring saffron | Ember on light, saffron on Night | Contrast (above) |
| Hero: 3D orb | Removed; the hero shows a reel video instead | Owner feedback |

## Pending client details (PLACEHOLDER)

Each of these is marked `PLACEHOLDER` in code. Search for the marker to find them.

- Phone: `+91 XXXXX XXXXX` (`site.config.ts`)
- Email: `hello@reeth.example`
- Address: `Baner, Pune, Maharashtra, India`. Street and postal code to follow.
- Legal name: `Reeth Restaurant & Bar`
- Opening hours: `12:00 to 00:00, all days` (indicative)
- Menu prices: indicative, with a note on the menu page
- Catering per-guest prices and package names
- Event dates and descriptions (`events.ts`), which are sample dates
- Team names and portraits (generic names, in `team.ts`)
- Reservation and ordering links: `#`
- Map: a placeholder card with a Google Maps search link. No live embed until the address is confirmed.
- Canonical domain: `https://reeth.example` (`site.config.ts`, `scripts/generate-seo.mjs`)
- Social links: Instagram is `@reeth.india`. Facebook and YouTube are `#`.
- Logo: a placeholder roundel in `src/components/brand/Logo.tsx`

## Swapping assets (no component edits)

1. **Photos.** Replace `media-src/images/<name>.jpg` with the same filename (1800px wide or
   larger, landscape or 4:5). Run `pnpm images`. The derivatives (AVIF, WebP, and JPEG at 480,
   768, 1200, and 1800px) are written to `public/images/`. The names are listed in
   `scripts/make-placeholder-art.mjs`. `src/data/placeholders.ts` has the search query for each one.
2. **Reels.** Put footage in `media-src/video-originals/` (named `reel-1.mp4` and so on) and run
   `scripts/optimize-video.sh`. This writes H.264 MP4, MP4 only, and a JPEG poster to `public/video/`.
   Then update titles and dates in `src/data/reels.ts`.
3. **Text and facts.** Edit `src/data/*.ts`. `src/data/site.config.ts` holds contact details, hours,
   and the social links.
4. **Logo.** Replace the SVG body in `src/components/brand/Logo.tsx`.
5. **Favicon.** Replace `public/favicon.svg`.

## Removing the demo banner

Set `showDemoBanner: false` in `src/data/site.config.ts`. The ribbon is `src/components/layout/DemoBanner.tsx`,
which renders nothing when the flag is off. The text is `demoBannerText`, and the link is `demoBannerLinkText` (`demoBannerUrl`, currently https://neeleshyadav.in/).

## Verification

Run on the final build (`pnpm build`, then Playwright against `pnpm preview`):

- **Static checks.** `pnpm typecheck`: passes. `pnpm lint`: zero errors and zero warnings.
- **Unit and component tests.** `pnpm test`: 47 passed. These cover validators, formatters,
  event helpers, WCAG contrast for the brand pairs, the reel modal (arrow keys,
  Escape, muted controlled video), and the reservation form (errors linked by `aria-describedby`,
  event prefill).
- **E2E.** `pnpm test:e2e`: 73 passed, 1 skipped, across Chromium and WebKit. The skip is the
  keyboard skip-link check on WebKit, because Safari does not tab-focus links by default. That path
  is covered on Chromium.
  - Smoke: every route returns 200 (or the 404 page), has exactly one H1, and logs no console errors.
    JSON-LD and Open Graph tags are present.
  - No horizontal scroll at 320, 360, and 390px on the main routes.
  - Forms: reservation success and error paths, focus on the first invalid field, and the catering
    guest-count rule.
  - Navigation: the mobile sheet opens, traps focus, closes on Escape, and navigates.
  - Skip link moves focus to `#main`.
  - Reduced motion: the home page renders with no errors, and reveal content is visible after scroll.
- **Accessibility.** axe-core (WCAG 2.0 A and AA, plus WCAG 2.2 AA) with zero serious or critical
  violations on every route in Chromium and WebKit. The night-theme sections on the events page are
  checked separately.
- **Responsive captures.** `tests/screenshots/` holds full-page screenshots of all 8 routes at 360,
  390, 768, 1024, 1280, and 1440px (48 files). The overflow check passes on every route at every width.
  Tap targets: undersized targets are listed in the console output rather than failing the run.
  Several text links are shorter than 44px.
- **Performance (measured, not Lighthouse).** First-load JavaScript (entry and preloads) is
  170.5 KB gzipped, under the 180 KB budget. Three.js has been removed. Lighthouse scores have not been measured yet.
- **Not verified.** Lighthouse. Firefox (not in the Playwright config). Real device testing. Phone
  landscape (844 by 390) has not been captured.

## Known limitations

- Imagery and reel footage are generated placeholders. They are for layout and mood only, not for
  real business content.
- Forms are mocked. Nothing is sent, stored, or emailed.
- The interactive map is a placeholder card, not a live embed.
- The menu has no category or diet filtering, by owner request.
- Lighthouse, Firefox, and phone-landscape verification are still open.
