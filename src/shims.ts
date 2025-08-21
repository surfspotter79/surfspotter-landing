// src/shims.ts
// Neutralize stray test functions in case any file still calls them at top level.
;(globalThis as any).it       ||= () => {};
;(globalThis as any).describe ||= () => {};
;(globalThis as any).test     ||= () => {};
;(globalThis as any).i        ||= () => {};
export {};
