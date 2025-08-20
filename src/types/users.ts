export type Role =
  | "pro_photographer"
  | "surf_school"
  | "pro_surfer"
  | "amateur_photographer"
  | "amateur_surfer"
  | "basic_user";

export interface Photo {
  id: string;
  url: string;
  title?: string;
  price?: number;      // EUR
  keywords?: string[];
}

export interface Album {
  id: string;
  title: string;
  photos: Photo[];
}

export interface Stack {
  id: string;
  title: string;
  photoIds: string[];  // references into albums
}

export interface Portfolio {
  albums: Album[];
  stacks: Stack[];
}

export interface OrderItem {
  photoId: string;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
}

export interface DemoUser {
  id: string;           // slug
  name: string;
  role: Role;
  email: string;
  password: string;     // demo only
  avatarUrl: string;
  portfolio: Portfolio;
  cart: OrderItem[];
  orders: Order[];
}
