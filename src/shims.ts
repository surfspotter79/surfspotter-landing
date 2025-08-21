// src/shims.ts
// Safety net: ignore accidental test calls in prod bundles.
;(globalThis as any).it       ||= () => {};
;(globalThis as any).describe ||= () => {};
;(globalThis as any).test     ||= () => {};
// In your bundle, there's also an `i(...)` call. Neutralize it, too:
;(globalThis as any).i        ||= () => {};
export {};
