import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Настроено для репозитория: https://github.com/Mist1qu3X/Technology-tracker
export default defineConfig({
  plugins: [react()],
  // Важно: base должен быть с завершающим слешем для поддиректорий
  base: process.env.NODE_ENV === 'production' ? '/Technology-tracker/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        // Убеждаемся, что пути к ресурсам правильные
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
})
