// src/data/seed.ts
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
  priceCents: number; // NEW
};

const USERS_KEY = "ss_demo_v1_users";
const PHOTOS_KEY = "ss_demo_v1_photos";

export function ensureDemoSeed() {
  if (typeof window === "undefined") return;
  const hasUsers = !!localStorage.getItem(USERS_KEY);
  const hasPhotos = !!localStorage.getItem(PHOTOS_KEY);
  if (hasUsers && hasPhotos) return;

  const users: User[] = [
    { id: "u_pp_1", name: "Kai Moreno", role: "pro_photographer", avatar: "https://picsum.photos/seed/kai/80" },
    { id: "u_pp_2", name: "Maya Steele", role: "pro_photographer", avatar: "https://picsum.photos/seed/maya/80" },
    { id: "u_pp_3", name: "Zane Wilder", role: "pro_photographer", avatar: "https://picsum.photos/seed/zane/80" },
    { id: "u_pp_4", name: "Lea Tanaka", role: "pro_photographer", avatar: "https://picsum.photos/seed/lea/80" },
    { id: "u_pp_5", name: "Nova Quinn", role: "pro_photographer", avatar: "https://picsum.photos/seed/nova/80" },

    { id: "u_ps_1", name: "Ryder Hale", role: "pro_surfer", avatar: "https://picsum.photos/seed/ryder/80" },
    { id: "u_ps_2", name: "Sage Flores", role: "pro_surfer", avatar: "https://picsum.photos/seed/sage/80" },
    { id: "u_ps_3", name: "Koa Silva", role: "pro_surfer", avatar: "https://picsum.photos/seed/koa/80" },
    { id: "u_ps_4", name: "Isla Brooks", role: "pro_surfer", avatar: "https://picsum.photos/seed/isla/80" },
    { id: "u_ps_5", name: "Taj Reed", role: "pro_surfer", avatar: "https://picsum.photos/seed/taj/80" },

    { id: "u_ss_1", name: "Ericeira Surf Co", role: "surf_school", avatar: "https://picsum.photos/seed/ericeira/80" },
    { id: "u_ss_2", name: "Peniche Wave Lab", role: "surf_school", avatar: "https://picsum.photos/seed/peniche/80" },
    { id: "u_ss_3", name: "Hossegor Academy", role: "surf_school", avatar: "https://picsum.photos/seed/hossegor/80" },
    { id: "u_ss_4", name: "Bali Reef School", role: "surf_school", avatar: "https://picsum.photos/seed/bali/80" },
    { id: "u_ss_5", name: "Gold Coast Surf", role: "surf_school", avatar: "https://picsum.photos/seed/goldcoast/80" },

    { id: "u_ap_1", name: "Milo Hart", role: "amateur_photographer", avatar: "https://picsum.photos/seed/milo/80" },
    { id: "u_ap_2", name: "Pia Rivera", role: "amateur_photographer", avatar: "https://picsum.photos/seed/pia/80" },
    { id: "u_ap_3", name: "Theo Nash", role: "amateur_photographer", avatar: "https://picsum.photos/seed/theo/80" },
    { id: "u_ap_4", name: "Ava Kim", role: "amateur_photographer", avatar: "https://picsum.photos/seed/ava/80" },
    { id: "u_ap_5", name: "Ezra Cole", role: "amateur_photographer", avatar: "https://picsum.photos/seed/ezra/80" },

    { id: "u_as_1", name: "Luca Park", role: "amateur_surfer", avatar: "https://picsum.photos/seed/luca/80" },
    { id: "u_as_2", name: "Nia Blue", role: "amateur_surfer", avatar: "https://picsum.photos/seed/nia/80" },
    { id: "u_as_3", name: "Ozzie Lane", role: "amateur_surfer", avatar: "https://picsum.photos/seed/ozzie/80" },
    { id: "u_as_4", name: "Remy Fox", role: "amateur_surfer", avatar: "https://picsum.photos/seed/remy/80" },
    { id: "u_as_5", name: "Sia Moon", role: "amateur_surfer", avatar: "https://picsum.photos/seed/sia/80" },
  ];

  const price = 2500; // €25.00 demo price per photo
  const now = Date.now();
  const daysAgo = (n: number) => new Date(now - n * 864e5).toISOString();
  const u = (role: User["role"], i: number) => users.filter(x => x.role === role)[i % 5].id;

  const photos: Photo[] = [
    { id:"p1",  url:"https://picsum.photos/seed/reef1/1200/900", spot:"Ericeira Reef", likes:128, createdAt:daysAgo(1),  userId:u("pro_photographer",0), category:"pro_photographer", priceCents: price },
    { id:"p2",  url:"https://picsum.photos/seed/reef2/1200/900", spot:"Ericeira Reef", likes:92,  createdAt:daysAgo(2),  userId:u("pro_photographer",1), category:"pro_photographer", priceCents: price },
    { id:"p3",  url:"https://picsum.photos/seed/supe1/1200/900", spot:"Supertubos",    likes:210, createdAt:daysAgo(5),  userId:u("pro_photographer",2), category:"pro_photographer", priceCents: price },
    { id:"p4",  url:"https://picsum.photos/seed/hos1/1200/900",  spot:"Hossegor",      likes:65,  createdAt:daysAgo(7),  userId:u("pro_photographer",3), category:"pro_photographer", priceCents: price },
    { id:"p5",  url:"https://picsum.photos/seed/bali1/1200/900", spot:"Uluwatu",       likes:144, createdAt:daysAgo(11), userId:u("pro_photographer",4), category:"pro_photographer", priceCents: price },

    { id:"p6",  url:"https://picsum.photos/seed/surf1/1200/900", spot:"Pipeline",      likes:187, createdAt:daysAgo(1),  userId:u("pro_surfer",0), category:"pro_surfer", priceCents: price },
    { id:"p7",  url:"https://picsum.photos/seed/surf2/1200/900", spot:"J-Bay",         likes:154, createdAt:daysAgo(3),  userId:u("pro_surfer",1), category:"pro_surfer", priceCents: price },
    { id:"p8",  url:"https://picsum.photos/seed/surf3/1200/900", spot:"Teahupo’o",     likes:232, createdAt:daysAgo(6),  userId:u("pro_surfer",2), category:"pro_surfer", priceCents: price },
    { id:"p9",  url:"https://picsum.photos/seed/surf4/1200/900", spot:"Mavericks",     likes:99,  createdAt:daysAgo(8),  userId:u("pro_surfer",3), category:"pro_surfer", priceCents: price },
    { id:"p10", url:"https://picsum.photos/seed/surf5/1200/900", spot:"Cloudbreak",    likes:121, createdAt:daysAgo(13), userId:u("pro_surfer",4), category:"pro_surfer", priceCents: price },

    { id:"p11", url:"https://picsum.photos/seed/school1/1200/900", spot:"Peniche",    likes:48,  createdAt:daysAgo(0), userId:u("surf_school",0), category:"surf_school", priceCents: price },
    { id:"p12", url:"https://picsum.photos/seed/school2/1200/900", spot:"Ericeira",   likes:33,  createdAt:daysAgo(2), userId:u("surf_school",1), category:"surf_school", priceCents: price },
    { id:"p13", url:"https://picsum.photos/seed/school3/1200/900", spot:"Hossegor",   likes:29,  createdAt:daysAgo(4), userId:u("surf_school",2), category:"surf_school", priceCents: price },
    { id:"p14", url:"https://picsum.photos/seed/school4/1200/900", spot:"Bali",       likes:72,  createdAt:daysAgo(8), userId:u("surf_school",3), category:"surf_school", priceCents: price },
    { id:"p15", url:"https://picsum.photos/seed/school5/1200/900", spot:"Gold Coast", likes:55,  createdAt:daysAgo(12),userId:u("surf_school",4), category:"surf_school", priceCents: price },

    { id:"p16", url:"https://picsum.photos/seed/amphoto1/1200/900", spot:"Ericeira",  likes:22, createdAt:daysAgo(0), userId:u("amateur_photographer",0), category:"amateur_photographer", priceCents: price },
    { id:"p17", url:"https://picsum.photos/seed/amphoto2/1200/900", spot:"Supertubos",likes:14, createdAt:daysAgo(1), userId:u("amateur_photographer",1), category:"amateur_photographer", priceCents: price },
    { id:"p18", url:"https://picsum.photos/seed/amphoto3/1200/900", spot:"Hossegor",  likes:9,  createdAt:daysAgo(2), userId:u("amateur_photographer",2), category:"amateur_photographer", priceCents: price },
    { id:"p19", url:"https://picsum.photos/seed/amphoto4/1200/900", spot:"Bali",      likes:31, createdAt:daysAgo(7), userId:u("amateur_photographer",3), category:"amateur_photographer", priceCents: price },
    { id:"p20", url:"https://picsum.photos/seed/amphoto5/1200/900", spot:"J-Bay",     likes:17, createdAt:daysAgo(9), userId:u("amateur_photographer",4), category:"amateur_photographer", priceCents: price },

    { id:"p21", url:"https://picsum.photos/seed/amsurf1/1200/900", spot:"Ericeira",   likes:11, createdAt:daysAgo(0), userId:u("amateur_surfer",0), category:"amateur_surfer", priceCents: price },
    { id:"p22", url:"https://picsum.photos/seed/amsurf2/1200/900", spot:"Supertubos", likes:8,  createdAt:daysAgo(2), userId:u("amateur_surfer",1), category:"amateur_surfer", priceCents: price },
    { id:"p23", url:"https://picsum.photos/seed/amsurf3/1200/900", spot:"Hossegor",   likes:6,  createdAt:daysAgo(3), userId:u("amateur_surfer",2), category:"amateur_surfer", priceCents: price },
    { id:"p24", url:"https://picsum.photos/seed/amsurf4/1200/900", spot:"Bali",       likes:19, createdAt:daysAgo(5), userId:u("amateur_surfer",3), category:"amateur_surfer", priceCents: price },
    { id:"p25", url:"https://picsum.photos/seed/amsurf5/1200/900", spot:"J-Bay",      likes:12, createdAt:daysAgo(10),userId:u("amateur_surfer",4), category:"amateur_surfer", priceCents: price },

    { id:"p26", url:"https://picsum.photos/seed/spot1/1200/900", spot:"Ribeira d’Ilhas", likes:77, createdAt:daysAgo(0), userId:u("pro_photographer",0), category:"spots", priceCents: price },
    { id:"p27", url:"https://picsum.photos/seed/spot2/1200/900", spot:"Coxos",           likes:84, createdAt:daysAgo(1), userId:u("pro_photographer",1), category:"spots", priceCents: price },
    { id:"p28", url:"https://picsum.photos/seed/spot3/1200/900", spot:"Supertubos",      likes:102,createdAt:daysAgo(4), userId:u("pro_photographer",2), category:"spots", priceCents: price },
    { id:"p29", url:"https://picsum.photos/seed/spot4/1200/900", spot:"Nazaré",          likes:190,createdAt:daysAgo(6), userId:u("pro_photographer",3), category:"spots", priceCents: price },
    { id:"p30", url:"https://picsum.photos/seed/spot5/1200/900", spot:"Lagide",          likes:58, createdAt:daysAgo(9), userId:u("pro_photographer",4), category:"spots", priceCents: price },
    { id:"p31", url:"https://picsum.photos/seed/spot6/1200/900", spot:"Belharra",        likes:73, createdAt:daysAgo(3), userId:u("pro_photographer",1), category:"spots", priceCents: price },
    { id:"p32", url:"https://picsum.photos/seed/spot7/1200/900", spot:"G-Land",          likes:149,createdAt:daysAgo(5), userId:u("pro_photographer",2), category:"spots", priceCents: price },
    { id:"p33", url:"https://picsum.photos/seed/spot8/1200/900", spot:"Mundaka",         likes:112,createdAt:daysAgo(7), userId:u("pro_photographer",3), category:"spots", priceCents: price },
    { id:"p34", url:"https://picsum.photos/seed/spot9/1200/900", spot:"Jeffreys Bay",    likes:131,createdAt:daysAgo(8), userId:u("pro_photographer",4), category:"spots", priceCents: price },
    { id:"p35", url:"https://picsum.photos/seed/spot10/1200/900",spot:"Teahupo’o",       likes:240,createdAt:daysAgo(11),userId:u("pro_photographer",0), category:"spots", priceCents: price },
    { id:"p36", url:"https://picsum.photos/seed/spot11/1200/900",spot:"Raglan",          likes:97, createdAt:daysAgo(12),userId:u("pro_photographer",1), category:"spots", priceCents: price },
  ];

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
