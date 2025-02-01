import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    cors: true,
  },
  build: {
    rollupOptions: {
      external: ["/firebase-messaging-sw.js"],
    },
  },
  publicDir: "public", 
})



