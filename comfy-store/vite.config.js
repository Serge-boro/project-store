import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/store': {
        target: 'http://localhost:4002/store',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/store/, ''),
      },
    },
  },
})
