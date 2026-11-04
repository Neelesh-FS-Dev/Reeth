import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react'
import { InstagramIcon as Instagram } from '../brand/SocialIcons'
import { siteConfig } from '../../data/site.config'

/** Address, hours, phone, email and social links. All facts come from site.config.ts. */
export function ContactInfo() {
  const a = siteConfig.address
  return (
    <div className="grid gap-10">
      <div className="grid gap-3">
        <h2 className="flex items-center gap-2 text-2xl">
          <MapPin aria-hidden="true" className="size-5 text-accent-text" /> Find us
        </h2>
        <address className="not-italic text-fg-muted">
          {a.line1}
          <br />
          {a.area}, {a.city}, {a.region}, {a.country}
          {/* PLACEHOLDER: street address and postal code to follow */}
        </address>
      </div>

      <div className="grid gap-3">
        <h2 className="text-2xl">Hours</h2>
        <table className="w-full max-w-sm text-left text-fg-muted">
          <caption className="sr-only">Opening hours</caption>
          <tbody>
            {siteConfig.hours.map((h) => (
              <tr key={h.days} className="border-b border-rule/30">
                <th scope="row" className="py-2 pr-4 font-normal text-fg">
                  {h.days}
                </th>
                <td className="py-2">
                  {h.open} to {h.close}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-sm text-fg-muted">Indicative hours. Confirm holiday and festival timings when booking.</p>
      </div>

      <div className="grid gap-3">
        <h2 className="flex items-center gap-2 text-2xl">
          <Phone aria-hidden="true" className="size-5 text-accent-text" /> Talk to us
        </h2>
        <p className="text-fg-muted">
          <a className="inline-flex min-h-11 items-center underline decoration-rule underline-offset-4 hover:text-accent-text" href={siteConfig.phoneHref}>
            {siteConfig.phone}
          </a>
          <br />
          <a className="inline-flex min-h-11 items-center gap-2 underline decoration-rule underline-offset-4 hover:text-accent-text" href={`mailto:${siteConfig.email}`}>
            <Mail aria-hidden="true" className="size-4" />
            {siteConfig.email}
          </a>
        </p>
        <a
          href={siteConfig.social.instagram}
          rel="noopener"
          className="inline-flex min-h-11 w-fit items-center gap-2 text-fg hover:text-accent-text"
        >
          <Instagram aria-hidden="true" className="size-5" /> {siteConfig.social.handle}
        </a>
      </div>
    </div>
  )
}

/** Map placeholder with a Google Maps link. No live embed until the street address is confirmed. */
export function MapPlaceholder() {
  return (
    <div className="flex min-h-64 flex-col justify-between gap-6 rounded-[2rem] border border-dashed border-rule/60 bg-surface p-8">
      <div>
        <p className="font-display text-2xl">Baner, Pune</p>
        <p className="mt-2 text-fg-muted">The live map appears here once the street address is confirmed.</p>
      </div>
      <a
        href={siteConfig.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 w-fit items-center gap-2 font-medium text-accent-text underline underline-offset-4"
      >
        View on Google Maps <ExternalLink aria-hidden="true" className="size-4" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  )
}
