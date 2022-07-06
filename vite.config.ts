import { defineConfig } from 'vite'
const { resolve } = require("path");
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    port:8080,
    host:'0.0.0.0'
  },
  resolve:{
    alias:{
      '@': resolve(__dirname,"src")
    }
  }
})
