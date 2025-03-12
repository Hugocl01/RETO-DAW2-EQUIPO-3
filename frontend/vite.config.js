import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: apiUrl,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
