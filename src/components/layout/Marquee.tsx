/** Infinite saffron-on-navy text marquee. Static under reduced motion (see globals.css). */
export function Marquee({ items }: { items: string[] }) {
  const row = items.map((text) => (
    <span key={text} className="mx-8 font-display text-4xl text-brand-saffron md:text-6xl">
      {text} <span aria-hidden="true">✶</span>
    </span>
  ))
  return (
    <div className="overflow-hidden bg-brand-navy-deep py-6" role="presentation">
      <div className="marquee-track flex w-max whitespace-nowrap">
        <div className="flex">{row}</div>
        <div className="flex" aria-hidden="true">
          {row}
        </div>
      </div>
    </div>
  )
}
