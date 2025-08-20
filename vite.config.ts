import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',        // <- no more dist/internal
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html', // maintenance/root entry
        live: 'live.html',  // orange app at /live
      },
    },
  },
})
