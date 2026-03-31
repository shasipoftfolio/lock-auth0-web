import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'config-auth.strangelabs.in',
    port: 5173,
    open: 'http://config-auth.strangelabs.in:5173',
  },
})