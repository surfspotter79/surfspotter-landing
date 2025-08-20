import type { Stack } from "../types";

const KEY = "surfspotter_demo_stacks";

type Store = Record<string, Stack[]>; // userId -> created stacks

const read = (): Store => {
  try { return JSON.parse(localStorage.getItem(KEY) || "{}"); }
  catch { return {}; }
};
const write = (s: Store) => localStorage.setItem(KEY, JSON.stringify(s));

export const getUserStacks = (userId: string): Stack[] => {
  const s = read();
  return s[userId] || [];
};

export const addUserStack = (userId: string, stack: Stack) => {
  const s = read();
  s[userId] = [...(s[userId] || []), stack];
  write(s);
};
