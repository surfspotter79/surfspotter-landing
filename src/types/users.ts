// src/types/users.ts
export type Role =
  | "pro-photographer"
  | "amateur-photographer"
  | "surf-school"
  | "pro-surfer"
  | "surfer";

export type Photo = { id: string; url: string; title?: string };

export type PhotoStack = {
  id: string;
  title: string;
  coverUrl: string;
  photos: Photo[];
};

export interface User {
  id: string;
  role: Role;
  name: string;
  email: string;
  avatarUrl?: string;
  stacks?: PhotoStack[]; // photographers & schools showcase stacks
}
