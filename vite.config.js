import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/fsq': {
        target: 'https://places-api.foursquare.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/fsq/, ''),
      },
      '/gemini': {
        target: 'https://generativelanguage.googleapis.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/gemini/, ''),
      },
    },
  },
})
