/** Indian dietary marks: a green dot in a square for vegetarian, a brown dot in a square for non-veg. */
export function DietaryBadge({ veg }: { veg: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-fg/15 px-2.5 py-1 text-xs font-medium text-fg">
      <span
        aria-hidden="true"
        className="inline-flex size-3.5 items-center justify-center border-2"
        style={{ borderColor: veg ? '#2f6b3a' : '#7A2E1A' }}
      >
        <span className="size-1.5 rounded-full" style={{ background: veg ? '#2f6b3a' : '#7A2E1A' }} />
      </span>
      {veg ? 'Vegetarian' : 'Non-vegetarian'}
    </span>
  )
}
