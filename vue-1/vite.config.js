import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import compression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Remove whitespace in production
          whitespace: 'condense'
        }
      }
    }),
    // Only include dev tools in development
    ...(mode === 'development' ? [vueDevTools()] : []),
    // Add compression in production
    ...(mode === 'production' ? [
      compression({
        algorithm: 'gzip',
        ext: '.gz',
      }),
      compression({
        algorithm: 'brotliCompress',
        ext: '.br',
      }),
      // Bundle analyzer
      visualizer({
        filename: 'dist/stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
      })
    ] : []),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    // Enable minification
    minify: 'terser',
    // Configure Terser for maximum compression
    terserOptions: {
      compress: {
        drop_console: true,    // Remove console.log statements
        drop_debugger: true,   // Remove debugger statements
        pure_funcs: ['console.log', 'console.warn', 'console.error'] // Remove specific console methods
      },
      mangle: {
        safari10: true // Fix Safari 10 issues
      }
    },
    // Enable tree shaking
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          vendor: ['vue'],
          // If you add more dependencies, split them:
          // utils: ['lodash', 'moment']
        }
      }
    },
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 500,
    // Enable source maps only in development
    sourcemap: false
  }
}))
