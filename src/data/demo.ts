import type { User, Stack, Photo, Role } from "../types";

const img = (n: number) =>
  `https://images.unsplash.com/photo-150${n}0${(n*17)%99}-surf?auto=format&fit=crop&w=1600&q=60`;

const makePhotos = (seed: number, count = 6): Photo[] =>
  Array.from({ length: count }).map((_, i) => ({
    id: `${seed}-${i}`,
    src: img(seed + i + 3),
    caption: ["dawn", "lineup", "barrel", "spray", "turn", "closeout"][i % 6],
  }));

const makeStack = (id: string, title: string, seed: number): Stack => ({
  id,
  title,
  createdAt: new Date(Date.now() - seed * 864e5).toISOString(),
  coverSrc: img(seed + 1),
  photos: makePhotos(seed, 8),
});

const makeUser = (
  idx: number,
  role: Role,
  displayName: string,
  extra?: Partial<User>
): User => ({
  id: `${role}-${idx}`,
  username: `${role}${idx}`,
  displayName,
  role,
  avatar: `https://i.pravatar.cc/160?img=${(idx * 7) % 70}`,
  location: ["Ericeira, PT", "Peniche, PT", "Biarritz, FR", "Bali, ID", "Gold Coast, AU"][idx % 5],
  bio:
    role === "photographer"
      ? "Surf photographer. Prefer golden hour and heavy water."
      : role === "school"
      ? "Friendly surf school for all levels."
      : role === "surfer"
      ? "Comp surfer chasing right-hand points."
      : "Just browsing epic waves.",
  stacks: [
    makeStack(`${role}-${idx}-a`, "Morning Glass", idx * 3 + 1),
    makeStack(`${role}-${idx}-b`, "Afternoon Push", idx * 3 + 2),
  ],
  ...extra,
});

export const demoPhotographers: User[] = Array.from({ length: 5 }).map((_, i) =>
  makeUser(i + 1, "photographer", `Pro Photographer ${i + 1}`)
);
export const demoSchools: User[] = Array.from({ length: 5 }).map((_, i) =>
  makeUser(i + 1, "school", `Surf School ${i + 1}`)
);
export const demoSurfers: User[] = Array.from({ length: 5 }).map((_, i) =>
  makeUser(i + 1, "surfer", `Pro Surfer ${i + 1}`)
);
export const demoVisitors: User[] = Array.from({ length: 5 }).map((_, i) =>
  makeUser(i + 1, "visitor", `Visitor ${i + 1}`)
);

export const allUsers: User[] = [
  ...demoPhotographers,
  ...demoSchools,
  ...demoSurfers,
  ...demoVisitors,
];
