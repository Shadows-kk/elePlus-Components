import { defineConfig } from 'vite'
const { resolve } = require("path");
import vue from '@vitejs/plugin-vue'
import Vuejsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),Vuejsx()],
  server:{
    port:8080,
    host:'0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://run.mocky.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve:{
    alias:{
      '@': resolve(__dirname,"src")
    }
  }
})
