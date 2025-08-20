export type Role = "photographer" | "school" | "surfer" | "visitor";

export type Photo = {
  id: string;
  src: string;          // url
  w?: number;
  h?: number;
  caption?: string;
};

export type Stack = {
  id: string;
  title: string;
  createdAt: string;
  coverSrc: string;
  photos: Photo[];
};

export type User = {
  id: string;
  username: string;
  displayName: string;
  role: Role;
  avatar: string;
  location?: string;
  bio?: string;
  stacks: Stack[];      // seeded demo stacks
};
