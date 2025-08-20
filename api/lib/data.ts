// api/lib/data.ts (optional helper)
export type Photographer = { id: string; name?: string; email?: string; stripeAccountId?: string };
export type Photo = { id: string; title: string; priceCHF: number; photographerId: string; downloadUrl: string };

const photographers = new Map<string, Photographer>();
const photos = new Map<string, Photo>();

export function upsertPhotographer(p: Photographer) {
  photographers.set(p.id, { ...photographers.get(p.id), ...p });
  return photographers.get(p.id)!;
}
export function getPhotographer(id: string) {
  return photographers.get(id) ?? null;
}
export function upsertPhoto(p: Photo) {
  photos.set(p.id, { ...photos.get(p.id), ...p });
  return photos.get(p.id)!;
}
export function getPhoto(id: string) {
  return photos.get(id) ?? null;
}

// Seed examples so the demo works
upsertPhotographer({ id: 'photog_1', name: 'Alice Example' });
upsertPhoto({ id: 'photo_1', title: 'Sunset Over Zürich', priceCHF: 25, photographerId: 'photog_1', downloadUrl: 'https://example.com/download/photo_1.zip' });