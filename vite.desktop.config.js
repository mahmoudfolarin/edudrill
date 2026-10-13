import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist_desktop_client',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.desktop.html')
    }
  }
})
