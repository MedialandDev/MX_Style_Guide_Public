import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import ejs from 'ejs'
import pugPlugin from "vite-plugin-pug"
import VirtualHtml from 'vite-plugin-virtual-html'

const pageList = [
  // index 為預設頁面, 不能移除
  { path: 'index', title: 'demo', pug: 'demo', script: '' },
  { path: 'about', title: 'about', pug: 'about', script: 'about' },
  { path: 'test', title: 'test', pug: 'test', script: '' },
]

const pages = {};
pageList.forEach((item) => {
  pages[item.path] = {
    // 預設樣板
    template: '/src/pages/index.html',
    data: {
      title: item.title,
      pug: `<pug src="src/pages/${item.pug}.pug"></pug>`,
      script: item.script && `<script type="module" src="src/js/${item.script}.js"></script>`
    }
  }
})

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    pugPlugin(),
    VirtualHtml({
      pages,
      render(template, data){
        return ejs.render(template, data, { delimiter: '%', root: process.cwd() })
      },
    })
  ],
})