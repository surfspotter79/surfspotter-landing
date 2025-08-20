import Link from 'next/link'

export default function RegionFilter({
  regions,
  active,
}: { regions: string[]; active?: string }) {
  return (
    <nav className="mx-auto max-w-5xl px-6 pb-4">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href="/"
            className={`rounded-full border px-3 py-1 text-sm ${
              !active ? 'bg-white/10 border-white/30' : 'border-white/10 hover:bg-white/5'
            }`}
          >
            All
          </Link>
        </li>
        {regions.map((r) => (
          <li key={r}>
            <Link
              href={`/?region=${encodeURIComponent(r)}`}
              className={`rounded-full border px-3 py-1 text-sm ${
                active === r ? 'bg-white/10 border-white/30' : 'border-white/10 hover:bg-white/5'
              }`}
            >
              {r}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
