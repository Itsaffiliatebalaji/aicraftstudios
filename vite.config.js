import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    ssr: 'src/server/entry.ts',
    ssrManifest: true,
    rollupOptions: {
      output: {
        dir: 'dist',
        entryFileNames: 'server.bundle.mjs',
        format: 'es'
      }
    }
  }
})
