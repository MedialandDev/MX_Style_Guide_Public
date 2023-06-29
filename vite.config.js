import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import ejs from 'ejs'
import vue from "@vitejs/plugin-vue";
import pugPlugin from "vite-plugin-pug"
import VirtualHtml from 'vite-plugin-virtual-html'

const pageList = [
  // index 為預設頁面, 不能移除
  { path: 'home', title: 'home', pug: 'home', script: 'home' },
  { path: 'index', title: 'demo', pug: 'demo', script: 'main' },
  { path: 'about', title: 'about', pug: 'about', script: 'main' },
  { path: 'vue', title: 'vue', pug: 'vue', script: 'vue' },
]

const pages = {};
pageList.forEach((item) => {
  pages[item.path] = {
    // 預設樣板
    template: '/src/index.html',
    data: {
      title: item.title,
      pug: `<pug src="src/pages/${item.pug}.pug"></pug>`,
      // main.js 放 tailwind and other css
      script: item.script && `<script type="module" src="src/js/${item.script}.js"></script><script type="module" src="src/main.js"></script>`,
    }
  }
})

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: 'vue/dist/vue.esm-browser.prod'
    }
  },
  plugins: [
    vue(),
    pugPlugin(),
    VirtualHtml({
      pages,
      render(template, data){
        return ejs.render(template, data, { delimiter: '%', root: process.cwd() })
      },
    })
  ],
})