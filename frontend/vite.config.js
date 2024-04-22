import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "rohitlingarker",
    project: "design-craft"
  })],

  base: '/',

  server:{
    port: 3000,
  },

  build: {
    sourcemap: true
  }
})