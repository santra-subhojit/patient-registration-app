// vite.config.js
import { defineConfig } from 'vite'
export default defineConfig({
  optimizeDeps: { exclude: ['@electric-sql/pglite'] },
  worker: { format: 'es' }
})
