import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import virtualHtml from 'vite-plugin-virtual-html'

const pages = {
  demo: '/src/pages/index.html',
  about: '/src/pages/about.html',
  test: '/src/pages/test.html',
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    virtualHtml({
      pages,
      indexPage: 'demo'
    })
  ],
})