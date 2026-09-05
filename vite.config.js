import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    preserveSymlinks: true,
  },
  server: {
    fs: {
      // permite servir arquivos fora do root (symlinks)
      strict: false,
    },
  },
})
