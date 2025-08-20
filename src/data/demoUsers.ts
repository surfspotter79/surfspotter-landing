import type { Album, DemoUser, Photo, Portfolio, Role, Stack } from "../types/users";

// ---- Stable surfing images (Unsplash) ----
const PHOTOS: string[] = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542181961-9590d0d71e1c?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1478562853135-c3c9e3ef7905?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500375592092-26a5d45f08d3?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1455218873509-8097305ee378?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519690889869-f10631b2c3c7?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1600&auto=format&fit=crop"
];

// ---- helpers ----
const euro = (min = 9, max = 49) => Math.round((Math.random() * (max - min) + min) / 1) * 1;
const pick = <T,>(a: T[], n: number) => a.slice(0, n);
const uid = () => Math.random().toString(36).slice(2, 9);
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Make photos with IDs + price
function makePhotos(urls: string[]): Photo[] {
  return urls.map((url, i) => ({
    id: `ph_${Math.random().toString(36).slice(2, 9)}_${i}`,
    url,
    title: "Surf Shot",
    price: Math.round(Math.random()*40)+9,
    likes: Math.floor(Math.random()*450)+25,            // NEW
    uploadedAt: new Date(Date.now() - Math.random()*1000*60*60*24*30).toISOString() // 0–30 days
  }));
}

function makePortfolio(photoUrls: string[], titleA = "Morning Session", titleB = "Evening Glass-Off"): Portfolio {
  const half = Math.max(5, Math.min(10, Math.floor(photoUrls.length / 2)));
  const albumA: Album = { id: `al_${uid()}`, title: titleA, photos: makePhotos(pick(photoUrls, half)) };
  const albumB: Album = { id: `al_${uid()}`, title: titleB, photos: makePhotos(photoUrls.slice(half, Math.min(photoUrls.length, half * 2))) };

  const allPhotoIds = [...albumA.photos, ...albumB.photos].map(p => p.id);
  const stack1: Stack = { id: `st_${uid()}`, title: "Best of", photoIds: pick(allPhotoIds, Math.min(6, allPhotoIds.length)) };
  const stack2: Stack = { id: `st_${uid()}`, title: "Barrels", photoIds: pick(allPhotoIds.reverse(), Math.min(5, allPhotoIds.length)) };

  return { albums: [albumA, albumB], stacks: [stack1, stack2] };
}

type SeedSpec = { role: Role; names: string[]; avatarStart: number; prefix: string };

const SPECS: SeedSpec[] = [
  { role: "pro_photographer", names: ["Alex Ramos","Mia Duarte","Jonah Blake","Sara Timmons","Leo Martins"], avatarStart: 10, prefix: "prophoto" },
  { role: "surf_school",      names: ["WaveLab School","Aloha Surf Co","Blue Reef Academy","NorthPoint Surf","Sunrise Surf Camp"], avatarStart: 20, prefix: "school" },
  { role: "pro_surfer",       names: ["Tia Keahi","Marco Gillem","Nina Sato","Duke Varela","Kai Hudson"], avatarStart: 30, prefix: "prosurfer" },
  { role: "amateur_photographer", names: ["Clara N.","Ricky P.","Lena V.","Owen J.","Noa B."], avatarStart: 40, prefix: "amphoto" },
  { role: "amateur_surfer",   names: ["Marty K.","Iris Q.","Sven L.","Paula D.","Kenji M."], avatarStart: 50, prefix: "amsurfer" },
  { role: "basic_user",       names: ["Visitor A","Visitor B","Visitor C","Visitor D","Visitor E"], avatarStart: 60, prefix: "basic" }
];

// Build users programmatically (2 albums, ~10 photos each, 2 stacks)
const demoUsers: DemoUser[] = SPECS.flatMap(spec =>
  spec.names.map((name, idx) => {
    const id = slug(`${spec.prefix}-${name}`);
    const email = `demo+${spec.prefix}${idx + 1}@surfspotter.app`;
    const avatarUrl = `https://i.pravatar.cc/200?img=${spec.avatarStart + idx}`;
    // rotate the photo pool so each user gets different images
    const offset = (idx * 3) % PHOTOS.length;
    const urls = [...PHOTOS.slice(offset), ...PHOTOS.slice(0, offset)];
    const portfolio = makePortfolio(pick(urls, 12));
    return {
      id,
      name,
      role: spec.role,
      email,
      password: "demo1234",
      avatarUrl,
      portfolio,
      cart: [],
      orders: []
    } as DemoUser;
  })
);

// ---- localStorage helpers ----
const LS_KEY = "surfspotter.demo.users";

export function seedDemosIfEmpty(): DemoUser[] {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) {
    localStorage.setItem(LS_KEY, JSON.stringify(demoUsers));
    return demoUsers;
  }
  try {
    return JSON.parse(raw) as DemoUser[];
  } catch {
    localStorage.setItem(LS_KEY, JSON.stringify(demoUsers));
    return demoUsers;
  }
}

export function loadUsers(): DemoUser[] {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return seedDemosIfEmpty();
  try { return JSON.parse(raw) as DemoUser[]; }
  catch { return seedDemosIfEmpty(); }
}

export function saveUsers(users: DemoUser[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(users));
}

export function getUserById(id: string): DemoUser | undefined {
  return loadUsers().find(u => u.id === id);
}

// Optional: clear & reseed (attach to window for quick debugging)
declare global { interface Window { __seedSurfspotter?: () => void } }
if (typeof window !== "undefined") {
  window.__seedSurfspotter = () => { localStorage.removeItem(LS_KEY); seedDemosIfEmpty(); alert("Demo data reseeded."); };
}
