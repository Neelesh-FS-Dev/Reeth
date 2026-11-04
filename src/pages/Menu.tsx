import { Seo } from '../components/layout/Seo'
import { PageHeader } from '../components/layout/PageHeader'
import { Section } from '../components/layout/Section'
import { Container } from '../components/layout/Container'
import { MenuItemCard } from '../components/menu/MenuItemCard'
import { menuItems } from '../data/menu'
import { pageIntros } from '../data/copy'

export default function MenuPage() {
  return (
    <>
      <Seo path="/menu" />
      <PageHeader eyebrow="The menu" title="Chaknas, curries and cocktails" intro={pageIntros.menu} />
      <Section className="!pt-4">
        <Container>
          <p className="mb-8 text-sm text-fg-muted">Sample menu. Prices are indicative, in INR.</p>
          <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {menuItems.map((item) => (
              <li key={item.id}>
                <MenuItemCard item={item} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  )
}
