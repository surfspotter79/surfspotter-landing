// src/data/seed.ts
// Minimal demo data + helpers used by Explore and PhotoDetail.

export type Photo = {
  id: string;
  userId: string;
  spot: string;
  url: string;        // large image
  thumbUrl?: string;  // optional smaller thumbnail
  priceCents: number;
  likes: number;
  createdAt: string;  // ISO date
};

// A small surf set (remote images from Unsplash)
// Tip: you can replace any url/thumbUrl with your own later.
const photos: Photo[] = [
  {
    id: "pipe-01",
    userId: "pro-photog-1",
    spot: "Pipeline, Hawaii",
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=60",
    thumbUrl:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=60",
    priceCents: 1199,
    likes: 324,
    createdAt: "2024-12-27T10:00:00.000Z",
  },
  {
    id: "teahupoo-01",
    userId: "pro-photog-2",
    spot: "Teahupo’o, Tahiti",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=60",
    thumbUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=60",
    priceCents: 1599,
    likes: 501,
    createdAt: "2025-01-03T12:00:00.000Z",
  },
  {
    id: "uluwatu-01",
    userId: "pro-photog-1",
    spot: "Uluwatu, Bali",
    url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=60",
    thumbUrl:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=600&q=60",
    priceCents: 999,
    likes: 278,
    createdAt: "2025-01-10T09:00:00.000Z",
  },
  {
    id: "nazare-01",
    userId: "pro-photog-3",
    spot: "Nazaré, Portugal",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=60",
    thumbUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=60",
    priceCents: 1899,
    likes: 742,
    createdAt: "2025-02-05T15:30:00.000Z",
  },
  {
    id: "jbay-01",
    userId: "pro-photog-4",
    spot: "Jeffreys Bay, South Africa",
    url: "https://images.unsplash.com/photo-1478562853135-c3c9e3ef7905?auto=format&fit=crop&w=1600&q=60",
    thumbUrl:
      "https://images.unsplash.com/photo-1478562853135-c3c9e3ef7905?auto=format&fit=crop&w=600&q=60",
    priceCents: 1299,
    likes: 403,
    createdAt: "2025-02-11T08:00:00.000Z",
  },
  {
    id: "hossegor-01",
    userId: "pro-photog-5",
    spot: "Hossegor, France",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=60",
    thumbUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=60",
    priceCents: 899,
    likes: 255,
    createdAt: "2025-02-14T14:00:00.000Z",
  },
  {
    id: "snapper-01",
    userId: "pro-photog-6",
    spot: "Snapper Rocks, Australia",
    url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=60",
    thumbUrl:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=60",
    priceCents: 1099,
    likes: 366,
    createdAt: "2025-02-16T10:45:00.000Z",
  },
  {
    id: "mavericks-01",
    userId: "pro-photog-3",
    spot: "Mavericks, California",
    url: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1600&q=60",
    thumbUrl:
      "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=600&q=60",
    priceCents: 1699,
    likes: 621,
    createdAt: "2025-02-18T07:20:00.000Z",
  },
  {
    id: "mentawai-01",
    userId: "pro-photog-7",
    spot: "Mentawai, Indonesia",
    url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=60",
    thumbUrl:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=60",
    priceCents: 1399,
    likes: 292,
    createdAt: "2025-02-20T11:05:00.000Z",
  },
  {
    id: "tamarama-01",
    userId: "pro-photog-8",
    spot: "Tamarama, Australia",
    url: "https://images.unsplash.com/photo-1500375592092-39e3c2a43a3f?auto=format&fit=crop&w=1600&q=60",
    thumbUrl:
      "https://images.unsplash.com/photo-1500375592092-39e3c2a43a3f?auto=format&fit=crop&w=600&q=60",
    priceCents: 999,
    likes: 211,
    createdAt: "2025-02-21T13:00:00.000Z",
  },
  {
    id: "raglan-01",
    userId: "pro-photog-9",
    spot: "Raglan, New Zealand",
    url: "https://images.unsplash.com/photo-1441829266145-b7a5f54f2445?auto=format&fit=crop&w=1600&q=60",
    thumbUrl:
      "https://images.unsplash.com/photo-1441829266145-b7a5f54f2445?auto=format&fit=crop&w=600&q=60",
    priceCents: 1099,
    likes: 188,
    createdAt: "2025-02-22T09:40:00.000Z",
  },
  {
    id: "ericeira-01",
    userId: "pro-photog-5",
    spot: "Ericeira, Portugal",
    url: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1600&q=60",
    thumbUrl:
      "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=600&q=60",
    priceCents: 899,
    likes: 174,
    createdAt: "2025-02-23T16:10:00.000Z",
  },
];

// Public API used by your components:

export function getPhotos(): Photo[] {
  return photos;
}

export function getPhoto(id: string): Photo | undefined {
  return photos.find((p) => p.id === id);
}

// “Stack” = other photos from the same spot (for the bundle button)
export function getStackFor(photo: Photo): Photo[] {
  return photos.filter((p) => p.spot === photo.spot);
}
