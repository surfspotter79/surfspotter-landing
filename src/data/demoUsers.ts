// src/data/demoUsers.ts
export type Role =
  | "pro-photographer"
  | "pro-surfer"
  | "surf-school"
  | "amateur-photographer"
  | "amateur-surfer"
  | "user";

export interface DemoUser {
  id: string;
  role: Role;
  name: string;
  email: string;
  password: string; // DEMO ONLY
  avatar: string;
  portfolio: {
    albums: { id: string; name: string; photoUrls: string[] }[];
    stacks: { id: string; name: string; photoUrls: string[] }[];
  };
  cart: { id: string; photoUrl: string; price: number }[];
  orders: { id: string; total: number; items: number; createdAt: string }[];
}

const P = (x: TemplateStringsArray) => x[0]; // tiny template helper for multi-line urls

const stock = [
  "https://images.pexels.com/photos/390051/surfer-wave-sunrise-surfing-390051.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1654701/pexels-photo-1654701.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1654702/pexels-photo-1654702.jpeg?auto=compress&cs=tinysrgb&w=1200",
];

const AV = (n:number)=>`https://i.pravatar.cc/240?img=${n}`;

const make = (o: Partial<DemoUser> & Pick<DemoUser, "id"|"role"|"name"|"email"|"password">): DemoUser => ({
  avatar: AV(Math.floor(Math.random()*70)+1),
  portfolio: {
    albums: [{ id: "a1", name: "Highlights", photoUrls: stock }],
    stacks: [{ id: "s1", name: "Best of 2025", photoUrls: stock.slice().reverse() }],
  },
  cart: [],
  orders: [],
  ...o,
}) as DemoUser;

export const demoUsers: DemoUser[] = [
  // Pro Photographers
  make({ id:"u1", role:"pro-photographer", name:"Alex Morel",   email:"alex.morel@demo.surfspotter.app",   password:"demo1234" }),
  make({ id:"u2", role:"pro-photographer", name:"Maya Tanaka",  email:"maya.tanaka@demo.surfspotter.app",  password:"demo1234" }),
  make({ id:"u3", role:"pro-photographer", name:"Luca Ferreira",email:"luca.ferreira@demo.surfspotter.app",password:"demo1234" }),
  make({ id:"u4", role:"pro-photographer", name:"Zanele Khoza", email:"zanele.khoza@demo.surfspotter.app", password:"demo1234" }),
  make({ id:"u5", role:"pro-photographer", name:"Owen McCarthy",email:"owen.mccarthy@demo.surfspotter.app",password:"demo1234" }),

  // Surf Schools
  make({ id:"u6", role:"surf-school", name:"WaveRide Peniche", email:"school.peniche@demo.surfspotter.app", password:"demo1234" }),
  make({ id:"u7", role:"surf-school", name:"Ericeira Surf Academy", email:"school.ericeira@demo.surfspotter.app", password:"demo1234" }),
  make({ id:"u8", role:"surf-school", name:"Bali Reef School", email:"school.bali@demo.surfspotter.app", password:"demo1234" }),
  make({ id:"u9", role:"surf-school", name:"Hossegor Surf Camp", email:"school.hossegor@demo.surfspotter.app", password:"demo1234" }),
  make({ id:"u10", role:"surf-school", name:"Santa Cruz Surf Co.", email:"school.santacruz@demo.surfspotter.app", password:"demo1234" }),

  // Pro Surfers
  make({ id:"u11", role:"pro-surfer", name:"Kai Thompson", email:"kai.thompson@demo.surfspotter.app", password:"demo1234" }),
  make({ id:"u12", role:"pro-surfer", name:"Ines Duarte",  email:"ines.duarte@demo.surfspotter.app",  password:"demo1234" }),
  make({ id:"u13", role:"pro-surfer", name:"Mateo Silva",  email:"mateo.silva@demo.surfspotter.app",  password:"demo1234" }),
  make({ id:"u14", role:"pro-surfer", name:"Nia Kaimana",  email:"nia.kaimana@demo.surfspotter.app",  password:"demo1234" }),
  make({ id:"u15", role:"pro-surfer", name:"Tomi Hasegawa",email:"tomi.hasegawa@demo.surfspotter.app",password:"demo1234" }),

  // Amateur Photographers
  make({ id:"u16", role:"amateur-photographer", name:"Julie Martin", email:"julie.martin@demo.surfspotter.app", password:"demo1234" }),
  make({ id:"u17", role:"amateur-photographer", name:"Benji Ortega", email:"benji.ortega@demo.surfspotter.app", password:"demo1234" }),
  make({ id:"u18", role:"amateur-photographer", name:"Clara Rossi", email:"clara.rossi@demo.surfspotter.app", password:"demo1234" }),
  make({ id:"u19", role:"amateur-photographer", name:"Hugo Costa", email:"hugo.costa@demo.surfspotter.app", password:"demo1234" }),
  make({ id:"u20", role:"amateur-photographer", name:"Lina Park", email:"lina.park@demo.surfspotter.app", password:"demo1234" }),

  // Amateur Surfers
  make({ id:"u21", role:"amateur-surfer", name:"Max Leblanc", email:"max.leblanc@demo.surfspotter.app", password:"demo1234" }),
  make({ id:"u22", role:"amateur-surfer", name:"Sofia Mendes", email:"sofia.mendes@demo.surfspotter.app", password:"demo1234" }),
  make({ id:"u23", role:"amateur-surfer", name:"Theo Rossi",   email:"theo.rossi@demo.surfspotter.app",  password:"demo1234" }),
  make({ id:"u24", role:"amateur-surfer", name:"Ava Nakamura", email:"ava.nakamura@demo.surfspotter.app",password:"demo1234" }),
  make({ id:"u25", role:"amateur-surfer", name:"Leo Richter",  email:"leo.richter@demo.surfspotter.app", password:"demo1234" }),

  // Basic Users
  make({ id:"u26", role:"user", name:"Emily Chen",  email:"emily.chen@demo.surfspotter.app",  password:"demo1234" }),
  make({ id:"u27", role:"user", name:"Daniel Novak",email:"daniel.novak@demo.surfspotter.app", password:"demo1234" }),
  make({ id:"u28", role:"user", name:"Sara Lopez",  email:"sara.lopez@demo.surfspotter.app",   password:"demo1234" }),
  make({ id:"u29", role:"user", name:"Paul Dubois", email:"paul.dubois@demo.surfspotter.app",  password:"demo1234" }),
  make({ id:"u30", role:"user", name:"Omar Haddad", email:"omar.haddad@demo.surfspotter.app",  password:"demo1234" }),
];

export const DEMO_PASSWORD_HINT = "demo1234";

// --- DEMO persistence helpers (localStorage) ---

const LS_KEY = "surfspotter.demo.users";

// Ensure demo users exist once in localStorage.
// Returns the current list.
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

// Get users (seed if needed).
export function loadUsers(): DemoUser[] {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return seedDemosIfEmpty();
  try {
    return JSON.parse(raw) as DemoUser[];
  } catch {
    return seedDemosIfEmpty();
  }
}

// Save users after edits (albums/stacks, etc.)
export function saveUsers(users: DemoUser[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(users));
}
