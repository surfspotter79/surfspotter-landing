// src/data/seed.ts
// Real surf photos via Unsplash random; optional Cloudinary watermark (baked-in).
// Works out of the box; set VITE_CLOUD_NAME to enable Cloudinary fetch + watermark.

export type Category =
  | "pro_photographer"
  | "pro_surfer"
  | "surf_school"
  | "amateur_photographer"
  | "amateur_surfer"
  | "spots";

export type User = {
  id: string;
  name: string;
  role: Exclude<Category, "spots">;
  avatar: string;
};

export type Photo = {
  id: string;
  url: string;
  spot: string;
  likes: number;
  createdAt: string; // ISO
  userId: string;
  category: Category;
  priceCents: number;
};

// ------- helpers: Unsplash + optional Cloudinary watermark -------

const UNSPLASH_BASE = "https://source.unsplash.com";

// Surf photo URL (random but stable-ish with sig)
function surf(i: number, tags: string[] = []) {
  const q = ["surfing", "surfer", "wave", "ocean", ...tags].join(",");
  return `${UNSPLASH_BASE}/1200x900/?${encodeURIComponent(q)}&sig=${i}`;
}

// If VITE_CLOUD_NAME is set, fetch image through Cloudinary with watermark baked into pixels.
function wm(u: string) {
  const name = import.meta.env.VITE_CLOUD_NAME;
  if (!name) return u; // fall back to direct Unsplash
  // Transformations: fit, quality, format, then text overlay bottom-right.
  const t = [
    "w_1200",
    "h_900",
    "c_fill",
    "q_auto",
    "f_auto",
    "l_text:Montserrat_90_bold:SurfSpotter",
    "co_white",
    "o_35",
    "g_south_east",
    "x_40",
    "y_40"
  ].join(",");
  return `https://res.cloudinary.com/${name}/image/fetch/${t}/${encodeURIComponent(u)}`;
}

// ------- storage keys -------

const USERS_KEY = "ss_demo_v2_users";
const PHOTOS_KEY = "ss_demo_v2_photos";

// ------- users (same structure, 5 per role) -------

export function demoUsers(): User[] {
  return [
    // Pro Photographers
    { id: "u_pp_1", name: "Kai Moreno", role: "pro_photographer", avatar: "https://picsum.photos/seed/kai/80" },
    { id: "u_pp_2", name: "Maya Steele", role: "pro_photographer", avatar: "https://picsum.photos/seed/maya/80" },
    { id: "u_pp_3", name: "Zane Wilder", role: "pro_photographer", avatar: "https://picsum.photos/seed/zane/80" },
    { id: "u_pp_4", name: "Lea Tanaka", role: "pro_photographer", avatar: "https://picsum.photos/seed/lea/80" },
    { id: "u_pp_5", name: "Nova Quinn", role: "pro_photographer", avatar: "https://picsum.photos/seed/nova/80" },

    // Pro Surfers
    { id: "u_ps_1", name: "Ryder Hale", role: "pro_surfer", avatar: "https://picsum.photos/seed/ryder/80" },
    { id: "u_ps_2", name: "Sage Flores", role: "pro_surfer", avatar: "https://picsum.photos/seed/sage/80" },
    { id: "u_ps_3", name: "Koa Silva", role: "pro_surfer", avatar: "https://picsum.photos/seed/koa/80" },
    { id: "u_ps_4", name: "Isla Brooks", role: "pro_surfer", avatar: "https://picsum.photos/seed/isla/80" },
    { id: "u_ps_5", name: "Taj Reed", role: "pro_surfer", avatar: "https://picsum.photos/seed/taj/80" },

    // Surf Schools
    { id: "u_ss_1", name: "Ericeira Surf Co", role: "surf_school", avatar: "https://picsum.photos/seed/ericeira/80" },
    { id: "u_ss_2", name: "Peniche Wave Lab", role: "surf_school", avatar: "https://picsum.photos/seed/peniche/80" },
    { id: "u_ss_3", name: "Hossegor Academy", role: "surf_school", avatar: "https://picsum.photos/seed/hossegor/80" },
    { id: "u_ss_4", name: "Bali Reef School", role: "surf_school", avatar: "https://picsum.photos/seed/bali/80" },
    { id: "u_ss_5", name: "Gold Coast Surf", role: "surf_school", avatar: "https://picsum.photos/seed/goldcoast/80" },

    // Amateur Photographers
    { id: "u_ap_1", name: "Milo Hart", role: "amateur_photographer", avatar: "https://picsum.photos/seed/milo/80" },
    { id: "u_ap_2", name: "Pia Rivera", role: "amateur_photographer", avatar: "https://picsum.photos/seed/pia/80" },
    { id: "u_ap_3", name: "Theo Nash", role: "amateur_photographer", avatar: "https://picsum.photos/seed/theo/80" },
    { id: "u_ap_4", name: "Ava Kim", role: "amateur_photographer", avatar: "https://picsum.photos/seed/ava/80" },
    { id: "u_ap_5", name: "Ezra Cole", role: "amateur_photographer", avatar: "https://picsum.photos/seed/ezra/80" },

    // Amateur Surfers
    { id: "u_as_1", name: "Luca Park", role: "amateur_surfer", avatar: "https://picsum.photos/seed/luca/80" },
    { id: "u_as_2", name: "Nia Blue", role: "amateur_surfer", avatar: "https://picsum.photos/seed/nia/80" },
    { id: "u_as_3", name: "Ozzie Lane", role: "amateur_surfer", avatar: "https://picsum.photos/seed/ozzie/80" },
    { id: "u_as_4", name: "Remy Fox", role: "amateur_surfer", avatar: "https://picsum.photos/seed/remy/80" },
    { id: "u_as_5", name: "Sia Moon", role: "amateur_surfer", avatar: "https://picsum.photos/seed/sia/80" },
  ];
}

// helper: pick user id round-robin for a role
function userFor(role: User["role"], index: number, users: User[]): string {
  const list = users.filter(u => u.role === role);
  return list[index % list.length].id;
}

export function ensureDemoSeed() {
  if (typeof window === "undefined") return;
  const hasUsers = !!localStorage.getItem(USERS_KEY);
  const hasPhotos = !!localStorage.getItem(PHOTOS_KEY);
  if (hasUsers && hasPhotos) return;

  const users = demoUsers();
  const price = 2500; // €25.00
  const now = Date.now();
  const daysAgo = (n: number) => new Date(now - n * 864e5).toISOString();

  // Define a few iconic spots (used as keywords to steer Unsplash)
  const SPOTS = [
    "Ericeira Reef",
    "Supertubos",
    "Hossegor",
    "Uluwatu",
    "Pipeline",
    "Teahupo'o",
    "Mavericks",
    "Cloudbreak",
    "Nazaré",
    "Jeffreys Bay",
    "Raglan",
    "Lagide",
    "Coxos",
    "Belharra",
    "Mundaka",
    "G-Land"
  ];

  // Generate ~36 photos across categories with real surf images
  const photos: Photo[] = [];
  let i = 1;

  function pushBatch(role: User["role"], count: number, spotNames: string[], extraTags: string[] = []) {
    for (let k = 0; k < count; k++) {
      const spot = spotNames[(i + k) % spotNames.length];
      const tags = [spot.replace(/\s+/g, "_").toLowerCase(), ...extraTags];
      const id = `p${i}`;
      photos.push({
        id,
        url: wm(surf(i, tags)),
        spot,
        likes: Math.floor(60 + (i * 13) % 200),
        createdAt: daysAgo((i * 3) % 14),
        userId: userFor(role, i, users),
        category: role === "pro_surfer" || role === "amateur_surfer" ? role : (role as Category),
        priceCents: price
      });
      i++;
    }
  }

  // Distribute photos
  pushBatch("pro_photographer", 8, ["Ericeira Reef", "Supertubos", "Hossegor", "Uluwatu"], ["pro","photography"]);
  pushBatch("pro_surfer",       6, ["Pipeline", "J-Bay", "Teahupo'o", "Mavericks", "Cloudbreak"], ["pro","action"]);
  pushBatch("surf_school",      5, ["Peniche", "Ericeira", "Hossegor", "Bali", "Gold Coast"], ["lesson","longboard"]);
  pushBatch("amateur_photographer", 5, ["Ericeira", "Supertubos", "Hossegor", "Bali", "J-Bay"], ["amateur","shore"]);
  pushBatch("amateur_surfer",   5, ["Ericeira", "Supertubos", "Hossegor", "Bali", "J-Bay"], ["session","fun"]);
  // “spots” category (curated peaks)
  for (const spot of SPOTS.slice(0, 7)) {
    photos.push({
      id: `p${i}`,
      url: wm(surf(i, [spot.replace(/\s+/g,"_").toLowerCase(), "landscape"])),
      spot,
      likes: Math.floor(70 + (i * 11) % 220),
      createdAt: daysAgo((i * 2) % 12),
      userId: userFor("pro_photographer", i, demoUsers()),
      category: "spots",
      priceCents: price
    });
    i++;
  }

  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(PHOTOS_KEY, JSON.stringify(photos));
}

export function getUsers(): User[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); } catch { return []; }
}

export function getPhotos(): Photo[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(PHOTOS_KEY) || "[]"); } catch { return []; }
}

export function filterAndSortPhotos(cat: Category, sort: "mostLiked" | "latest"): Photo[] {
  let list = getPhotos();
  list = (cat === "spots") ? list.filter(p => p.category === "spots") : list.filter(p => p.category === cat);
  if (sort === "mostLiked") list.sort((a,b)=> b.likes - a.likes);
  else list.sort((a,b)=> +new Date(b.createdAt) - +new Date(a.createdAt));
  return list;
}

export function getPhoto(id: string): Photo | undefined {
  return getPhotos().find(p => p.id === id);
}

export function getStackFor(photo: Photo): Photo[] {
  // simple stack: same user + same spot
  return getPhotos().filter(p => p.userId === photo.userId && p.spot === photo.spot);
}
