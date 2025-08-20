import { SpotForecast } from './types'
import { mockSpots } from './mock'

// later this can call a real DB/provider; for now it’s mock data
export async function getSpotForecasts(): Promise<SpotForecast[]> {
  return mockSpots
}
