import { defineConfig } from 'vite'
const { resolve } = require("path");
import vue from '@vitejs/plugin-vue'
import Vuejsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),Vuejsx()],
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
