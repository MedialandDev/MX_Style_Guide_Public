import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import ejs from 'ejs'
import vue from "@vitejs/plugin-vue";
import pugPlugin from "vite-plugin-pug"
import VirtualHtml from 'vite-plugin-virtual-html'

const pageList = [
  // index 為預設頁面, 不能移除或改名
  { path: 'index', title: 'demo頁面', pug: 'demo' },
  { path: 'home', title: 'CMS產品示範平台', pug: 'home', script: 'home' },
  { path: 'about', title: 'about', pug: 'about', script: 'about' },
  { path: 'news', title: '最新消息', pug: 'news', script: 'news' },
  { path: 'news-content', title: '最新消息/內容頁', pug: 'news-content', script: 'news-content' },
  { path: 'activity', title: '活動訊息', pug: 'activity', script: 'activity' },
  { path: 'activity-content', title: '活動訊息/內容頁', pug: 'activity-content', script: 'activity-content' },
  { path: 'article', title: '文章單元', pug: 'article', script: 'article' },
  { path: 'article-content', title: '文章單元/內容頁', pug: 'article-content', script: 'article-content' },
  { path: 'vue', title: 'vue', pug: 'vue', script: 'vue' },
  { path: 'animate-component', title: 'animate-component', pug: 'animate-component', script: 'animate-component' },
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
  
  base: process.env.NODE_ENV === 'development' ? '/' : '/demo/2023_05_mx_demo',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: 'vue/dist/vue.esm-browser.prod'
    }
  },
  plugins: [
    vue(),
    pugPlugin(undefined, { IS_DEV: process.env.NODE_ENV === 'development'}),
    VirtualHtml({
      pages,
      render(template, data){
        return ejs.render(template, data, { delimiter: '%', root: process.cwd() })
      },
    })
  ],
})