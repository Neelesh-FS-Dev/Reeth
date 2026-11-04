// One-off importer for the owner's photos and videos.
// 1. Moves loose media from the project root into media-src/raw/ (gitignored).
// 2. Copies each mapped photo to media-src/images/<slot>.jpg (picked up by optimize-images).
// 3. Copies unique reel clips to media-src/video-originals/reel-NN.mp4 (picked up by optimize-video).
// 4. Writes src/data/reels.ts for the reel clips.
import { readdirSync, renameSync, copyFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const RAW = join(ROOT, 'media-src', 'raw')
const IMG = join(ROOT, 'media-src', 'images')
const VID = join(ROOT, 'media-src', 'video-originals')
mkdirSync(RAW, { recursive: true })
mkdirSync(IMG, { recursive: true })
mkdirSync(VID, { recursive: true })

// Move loose media out of the project root.
for (const f of readdirSync(ROOT)) {
  if (/\.(jpe?g|png|mp4|mov|webm|heic)$/i.test(f)) renameSync(join(ROOT, f), join(RAW, f))
}

// Photo slot -> raw file (by unique filename prefix). Slots without a close match reuse a nearby photo.
const PHOTO = {
  hero: 'Dc58sIONG9y', intro: 'DcRDvZEt9DM', 'about-teaser': 'DZCv-2ZNTQn', 'about-hero': 'DZNFwiDPJJv',
  'catering-hero': 'De9cwzCDTVV_3', 'careers-hero': 'Ddv33i0RGKx', 'reels-hero': 'DcqATilJbRA', 'og-image': 'DcgUowPthMn',
  'highlight-nadru': 'DafiWobtttV', 'highlight-belgaum': 'DbVJ4KJNWt-', 'highlight-jaipuri': 'Dbs0NNsNVT5', 'highlight-sour': 'DaaqdP3M8BO',
  'team-chef': 'SaveClip.App_846567809', 'team-bar': 'DdWeKxCtxOy', 'team-foh': 'DZNFwiDPJJv',
  'gallery-1': 'DaLA2jCxNo4', 'gallery-2': 'DaSATYXsOHp', 'gallery-3': 'SaveClip.App_844544792', 'gallery-4': 'DYtXzrKIrWP',
  'gallery-5': 'DbnYWB1tevn', 'gallery-6': 'SaveClip.App_846567809', 'gallery-7': 'DdJbMUuSpCi', 'gallery-8': 'SaveClip.App_868385834',
  'gallery-9': 'DdjRsq8tUom', 'gallery-10': 'Deb1eX5tFq5', 'gallery-11': 'Ddv33i0RGKx', 'gallery-12': 'DbaxaLMthO_',
  'menu-chakna-1': 'Dbs0NNsNVT5', 'menu-chakna-2': 'Dd6R16wtsVg', 'menu-chakna-3': 'DaLA2jCxNo4', 'menu-chakna-4': 'DcLuj99NE4b', 'menu-chakna-5': 'DbA9iPctjv4',
  'menu-main-1': 'DafiWobtttV', 'menu-main-2': 'DafiWobtttV', 'menu-main-3': 'DbVJ4KJNWt-', 'menu-main-4': 'DZKZSzotUCE', 'menu-main-5': 'DZKZSzotUCE', 'menu-main-6': 'DafiWobtttV',
  'menu-cocktail-1': 'DaaqdP3M8BO', 'menu-cocktail-2': 'DaSATYXsOHp', 'menu-cocktail-3': 'DZCv-2ZNTQn', 'menu-cocktail-4': 'DdJbMUuSpCi', 'menu-cocktail-5': 'DbaxaLMthO_',
  'menu-barbite-1': 'DcRDvZEt9DM', 'menu-barbite-2': 'DcLuj99NE4b', 'menu-barbite-3': 'DbA9iPctjv4',
  'menu-dessert-1': 'DbnYWB1tevn', 'menu-dessert-2': 'DY4HyfatlcE', 'menu-dessert-3': 'DY4HyfatlcE',
  'event-diwali': 'De9cwzCDTVV_1', 'event-pork-table': 'DdZTNpHDXFk_0', 'event-saraswat': 'DerQikRje2b_0', 'event-workshop': 'DaaqdP3M8BO',
  'event-live-music': 'DdjRsq8tUom', 'event-popup': 'DfFclA-DQWM_0',
  'event-past-1': 'DZNFwiDPJJv', 'event-past-2': 'DcgUowPthMn', 'event-past-3': 'DYtXzrKIrWP', 'event-past-4': 'De9cwzCDTVV_2',
  'event-past-5': 'Ddv33i0RGKx', 'event-past-6': 'De9cwzCDTVV_4',
}

const rawFiles = readdirSync(RAW)
const findRaw = (prefix) => {
  const f = rawFiles.find((n) => n.startsWith(prefix) && /\.jpe?g$/i.test(n))
  if (!f) throw new Error(`no photo for prefix ${prefix}`)
  return join(RAW, f)
}
for (const [slot, prefix] of Object.entries(PHOTO)) copyFileSync(findRaw(prefix), join(IMG, `${slot}.jpg`))
console.log(`photos copied: ${Object.keys(PHOTO).length}`)

// Unique reel clips (duplicates removed: "DckiekqBbB0 (1).mp4" and the SaveClip copy of DfCqoOINLQJ.mp4).
const REELS = [
  ['Da7oBdgNIke', 'New joinee'], ['DaIkDOVMz_D', 'Dining room'], ['DapJie4t4nT', 'Kitchen prep'],
  ['DbGAzB_tvWh', 'Making of the Tilgul Old Fashioned'], ['DbhyPKkNAyA', 'Menu reveal'], ['DbP1ELnN147', 'Team on the steps'],
  ['Dc06xechwdq', 'BNTR x Reeth'], ['DcGIDMdNAyq', 'Pouring at the bar'], ['DckiekqBbB0.mp4', 'Chakna prep'],
  ['Dd_lIT8u__m', 'Tiramisu mishti doi'], ['Ddd8dxqN0w4', 'Behind the scenes'], ['DdEah08PLk2', 'Cocktail making workshop'],
  ['DdMNSKizAKV', 'Chef’s plate'], ['Ddn6BQsxo3N', 'Jaipuri Mirch'], ['DdyuhMgtCD4', 'Reeth, lit up'],
  ['DeD4vX6MRI2', 'Chocolate on the menu'], ['DemdTeGNE5-', 'Red chillies'], ['DeRv7WuN0y7', 'Kitchen collab'],
  ['DfCqoOINLQJ', 'Evening at the entrance'], ['DfNRSlaNwz8', 'Red cocktail pour'], ['DYHepj1Nt0v', 'On the pan'],
  ['DYMhzDKDYaS_0', 'Kadipatta Highball'], ['DZaBrwxN6-9', 'Patta Chaat'], ['DZfGdyut7PE', 'Toddy shop curry'],
]
const videoFiles = rawFiles.filter((n) => /\.mp4$/i.test(n))
const reelEntries = REELS.map(([prefix, title], i) => {
  const f = videoFiles.find((n) => n.startsWith(prefix))
  if (!f) throw new Error(`no video for ${prefix}`)
  const name = `reel-${String(i + 1).padStart(2, '0')}`
  copyFileSync(join(RAW, f), join(VID, `${name}.mp4`))
  return { name, title }
})
console.log(`reel clips copied: ${reelEntries.length}`)

const reelsTs = `import type { ReelItem, GalleryPhoto } from '../types'

// Reel titles are working labels. Rename them here. Dates are the import date (to correct).
export const reels: ReelItem[] = [
${reelEntries
  .map(
    (r) =>
      `  { id: '${r.name}', title: '${r.title.replace(/'/g, "\\'")}', date: '2026-11-04', src: '/video/${r.name}.mp4', webm: '/video/${r.name}.webm', poster: '/video/${r.name}-poster.jpg' },`,
  )
  .join('\n')}
]

// Gallery photos come from the owner's photography. Ratio is width / height.
export const galleryPhotos: GalleryPhoto[] = []
`
writeFileSync(join(ROOT, 'src', 'data', 'reels.ts.generated'), reelsTs)
console.log('wrote src/data/reels.ts.generated')
