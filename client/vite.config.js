import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import path from "path";


export default defineConfig( {
  plugins: [ react() ],
  build: { chunkSizeWarningLimit: 1600, },
  publicDir: 'public',
  resolve: {
    alias: {
      '@': '/src',
      '@module': '/src/app/module',
      '@common': '/src/common',
      '@redux': '/src/redux',
      '@service': '/src/app/service',
      '@assets': '/src/assets',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.15:3000',
        changeOrigin: true,
        secure: true,
        rewrite: ( path ) => path.replace( /^\/api/, '' ),

      }
    },
  },
} )
