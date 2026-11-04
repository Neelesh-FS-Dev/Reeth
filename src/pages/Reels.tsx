import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Seo } from '../components/layout/Seo'
import { PageHeader } from '../components/layout/PageHeader'
import { Section } from '../components/layout/Section'
import { Container } from '../components/layout/Container'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { ReelCard } from '../components/reels/ReelCard'
import { ReelModal } from '../components/reels/ReelModal'
import { MasonryGallery } from '../components/gallery/MasonryGallery'
import { Lightbox } from '../components/gallery/Lightbox'
import { ToggleChip } from '../components/menu/ToggleChip'
import { reels } from '../data/reels'
import { galleryPhotos } from '../data/gallery'
import { pageIntros } from '../data/copy'
import type { GalleryCategory } from '../types'

const categories: ('All' | GalleryCategory)[] = ['All', 'Food', 'Drinks', 'Ambience', 'Events', 'Team']

export default function ReelsPage() {
  const [params, setParams] = useSearchParams()
  const view = params.get('view') === 'gallery' ? 'gallery' : 'reels'
  const [reelIndex, setReelIndex] = useState<number | null>(null)
  const [photoIndex, setPhotoIndex] = useState<number | null>(null)
  const [category, setCategory] = useState<'All' | GalleryCategory>('All')

  const photos = useMemo(
    () => galleryPhotos.filter((p) => category === 'All' || p.category === category),
    [category],
  )

  return (
    <>
      <Seo path="/reels" />
      <PageHeader
        eyebrow="Reels and gallery"
        title="The room, the bar, the kitchen"
        intro={pageIntros.reels}
        image={{ name: 'reels-hero', alt: 'A dim dining room with warm lamps and a long table' }}
      />
      <Section className="!pt-4">
        <Container>
          <Tabs value={view} onValueChange={(v) => setParams({ view: v }, { replace: true, preventScrollReset: true })}>
            <TabsList>
              <TabsTrigger value="reels">Reels</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>

            <TabsContent value="reels" className="tab-enter mt-10">
              <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {reels.map((r, i) => (
                  <li key={r.id}>
                    <ReelCard reel={r} onOpen={() => setReelIndex(i)} />
                  </li>
                ))}
              </ul>
              <ReelModal reels={reels} index={reelIndex} onIndexChange={setReelIndex} />
            </TabsContent>

            <TabsContent value="gallery" className="tab-enter mt-10">
              <div role="group" aria-label="Filter photos by category" className="mb-8 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <ToggleChip key={c} pressed={category === c} onPressedChange={() => setCategory(c)}>
                    {c}
                  </ToggleChip>
                ))}
              </div>
              {photos.length === 0 ? (
                <p className="text-fg-muted">No photos in this category yet.</p>
              ) : (
                <MasonryGallery
                  items={photos.map((p) => ({ id: p.id, image: p.image, alt: p.alt, caption: p.caption, ratio: p.ratio }))}
                  onOpen={setPhotoIndex}
                />
              )}
              <Lightbox
                items={photos.map((p) => ({ image: p.image, alt: p.alt, caption: p.caption }))}
                index={photoIndex}
                onIndexChange={setPhotoIndex}
              />
            </TabsContent>
          </Tabs>
        </Container>
      </Section>
    </>
  )
}
