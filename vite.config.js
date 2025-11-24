import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Настроено для репозитория: https://github.com/Mist1qu3X/Technology-tracker
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/Technology-tracker/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
})
