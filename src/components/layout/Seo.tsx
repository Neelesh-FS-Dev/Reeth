import { Helmet } from 'react-helmet-async'
import { siteConfig } from '../../data/site.config'
import { routeMeta } from '../../lib/seo'

/** Per-route title, description, Open Graph and Twitter tags. */
export function Seo({ path, jsonLd }: { path: string; jsonLd?: object }) {
  const meta = routeMeta[path] ?? routeMeta['/']
  const url = `${siteConfig.url}${path === '/' ? '' : path}`
  const image = `${siteConfig.url}/images/og-image-1200.jpg`
  return (
    <Helmet>
      <html lang="en-IN" />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={siteConfig.locale} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={image} />
      {jsonLd ? <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> : null}
    </Helmet>
  )
}
