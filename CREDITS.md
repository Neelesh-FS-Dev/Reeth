# Credits

## Imagery

All photographs in this build are **generated placeholder artwork**. They are abstract evening
compositions in the Reeth palette, created by `scripts/make-placeholder-art.mjs`. No third-party
photographs are included.

Source originals: `media-src/images/`. Derivatives: `public/images/` (AVIF, WebP, and JPEG at
480, 768, 1200, and 1800px).

When real photography replaces these, record each photographer, source, and licence below. Search
queries for free stock sources (Unsplash or Pexels) are in `src/data/placeholders.ts`. Nothing has
been downloaded from those services.

| Local name | Stand-in for | Source | Licence |
|---|---|---|---|
| `hero`, `intro`, `about-*`, `catering-hero`, `careers-hero`, `reels-hero`, `og-image` | Page and home imagery | Generated placeholder artwork | Created for this project (owner's to replace) |
| `highlight-*`, `menu-*`, `event-*`, `gallery-*`, `team-*` | Dishes, events, gallery, team | Generated placeholder artwork | As above |

## Video

`public/video/reel-1..4.mp4`, `.webm`, and `-poster.jpg` are **generated placeholder clips**
(ffmpeg `gradients` source, via `scripts/make-placeholder-reels.sh`). They contain no footage of
people or places.

## Fonts

Loaded from Google Fonts. All three families are licensed under the SIL Open Font License 1.1.

- Fraunces (display), by Undercase Type
- DM Sans (body), by Colophon Foundry
- Pinyon Script (accent), by Jan Kolmar

## Icons

- Icons are from [lucide-react](https://lucide.dev) (ISC licence).
- Social glyphs (Instagram, Facebook, YouTube) are simple inline SVG drawings in
  `src/components/brand/SocialIcons.tsx`.
