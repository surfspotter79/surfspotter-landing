// src/data/seed.ts
// Central demo data + helpers. Ensures every photo.url is a valid absolute URL.

export type Photo = {
  id: string;
  url: string;           // can be a full URL or an Unsplash id like "photo-123..."
  spot: string;
  userId: string;        // creator key used by /creator/:id
  author: string;        // display name
  likes: number;
  views: number;
  priceCents: number;
  createdAt: string;     // ISO date
};

// Turn "photo-xxxxx" or "/photo-xxxxx" into a full Unsplash URL.
// If it's already an http(s) URL, return as-is.
function toAbsoluteUrl(u: string, w = 1600): string {
  if (!u) return "";
  if (/^https?:\/\//i.test(u)) return u;
  const id = u.replace(/^\/+/, "");
  if (/^photo-[a-z0-9-]+$/i.test(id)) {
    return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
  }
  // leave any other relative paths alone (e.g. /hero/... you actually have in public/)
  return u;
}

// --- Demo photos -------------------------------------------------------------
// TIP: If you add more, you can still write url: "photo-xxxxx" and it will work.
const PHOTOS_RAW: Photo[] = [
  // pro_photog-3 (Kai)
  {
    id: "p1",
    url: "photo-1500375592092-39e3c2a43a3f",
    spot: "Pipeline",
    userId: "pro_photog-3",
    author: "Kai Nakamura",
    likes: 321,
    views: 12430,
    priceCents: 900,
    createdAt: "2024-11-01",
  },
  {
    id: "p2",
    url: "photo-1441829266145-b7a5f54f2445",
    spot: "Teahupo’o",
    userId: "pro_photog-3",
    author: "Kai Nakamura",
    likes: 280,
    views: 10980,
    priceCents: 900,
    createdAt: "2024-11-05",
  },

  // pro_photog-1 (Sally)
  {
    id: "p3",
    url: "photo-1507525428034-b723cf961d3e",
    spot: "Mavericks",
    userId: "pro_photog-1",
    author: "Sally Nguyen",
    likes: 402,
    views: 15890,
    priceCents: 1100,
    createdAt: "2024-10-21",
  },
  {
    id: "p4",
    url: "photo-1519068737630-e5db30e12e43",
    spot: "J-Bay",
    userId: "pro_photog-1",
    author: "Sally Nguyen",
    likes: 356,
    views: 13950,
    priceCents: 1100,
    createdAt: "2024-10-28",
  },

  // pro_photog-2 (Leo)
  {
    id: "p5",
    url: "photo-1502082553048-f009c37129b9",
    spot: "Uluwatu",
    userId: "pro_photog-2",
    author: "Leo Duarte",
    likes: 297,
    views: 12044,
    priceCents: 800,
    createdAt: "2024-09-14",
  },
  {
    id: "p6",
    url: "photo-1493558103817-58b2924bce98",
    spot: "Nazare",
    userId: "pro_photog-2",
    author: "Leo Duarte",
    likes: 265,
    views: 11230,
    priceCents: 800,
    createdAt: "2024-09-20",
  },
];

// Normalize URLs once.
const PHOTOS: Photo[] = PHOTOS_RAW.map((p) => ({
  ...p,
  url: toAbsoluteUrl(p.url),
}));

// --- API used by the app -----------------------------------------------------

export function getPhotos(): Photo[] {
  return PHOTOS;
}

export function getPhoto(id: string): Photo | undefined {
  return PHOTOS.find((p) => p.id === id);
}

// “Stack” = other photos by the same creator at the same spot (for the bundle button)
export function getStackFor(photo: Photo): Photo[] {
  return PHOTOS.filter(
    (p) => p.userId === photo.userId && p.spot === photo.spot && p.id !== photo.id
  );
}
