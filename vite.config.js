import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 👈 This allows access from other devices on LAN
    port: 5173       // 👈 Optional: ensures it runs on the default port
  }
})
