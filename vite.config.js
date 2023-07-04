import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import ejs from 'ejs'
import vue from "@vitejs/plugin-vue";
import pugPlugin from "vite-plugin-pug"
import VirtualHtml from 'vite-plugin-virtual-html'

const pageList = [
  // index 為預設頁面, 不能移除或改名
  { path: 'index', title: 'demo', pug: 'demo' },
  { path: 'home', title: 'home', pug: 'home', script: 'home' },
  { path: 'about', title: 'about', pug: 'about', script: 'about' },
  { path: 'news', title: 'news', pug: 'news', script: 'news' },
  { path: 'news-content', title: 'news-content', pug: 'news-content', script: '' },
  { path: 'activity', title: 'activity', pug: 'activity', script: '' },
  { path: 'activity-content', title: 'activity-content', pug: 'activity-content', script: '' },
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
      main: `<script type="module" src="src/main.js"></script>`,
      script: item.script && `<script type="module" src="src/js/${item.script}.js"></script>`,
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