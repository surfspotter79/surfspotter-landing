// src/shims.ts
// Prevent accidental test calls (it/describe/test) from crashing prod.
;(globalThis as any).it ||= () => {};
;(globalThis as any).describe ||= () => {};
;(globalThis as any).test ||= () => {};
export {};
