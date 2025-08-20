import { NextResponse } from 'next/server'
import { getSpotForecasts } from '@/lib/data'

// revalidate the response at most once per minute (tune later)
export const revalidate = 60

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const region = searchParams.get('region')?.toLowerCase()

  const data = await getSpotForecasts()
  const filtered = region
    ? data.filter((d) => d.spot.region.toLowerCase().includes(region))
    : data

  return NextResponse.json(filtered)
}
