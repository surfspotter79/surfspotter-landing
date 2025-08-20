import { getSpotForecasts } from '@/lib/data'
import SpotCard from '@/components/SpotCard'
import RegionFilter from '@/components/RegionFilter'

export default async function Home({ searchParams }: { searchParams?: { region?: string } }) {
  const all = await getSpotForecasts()
  const regions = Array.from(new Set(all.map((s) => s.spot.region)))
  const region = searchParams?.region
  const spots = region
    ? all.filter((s) => s.spot.region.toLowerCase().includes(region.toLowerCase()))
    : all

  return (
    <main className="min-h-dvh bg-black text-white">
      <header className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="text-3xl font-bold tracking-tight">Surfspotter</h1>
        <p className="text-white/60">Best windows near you — prototype</p>
      </header>

      <RegionFilter regions={regions} active={region} />

      <section className="mx-auto grid max-w-5xl gap-4 px-6 pb-24 sm:grid-cols-2">
        {spots.map((s) => (
          <SpotCard key={s.spot.id} data={s} />
        ))}
      </section>
    </main>
  )
}
