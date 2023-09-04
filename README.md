# 前台公版
## vite - tailwind
使用 vite 開發 編譯 打包
vite 自帶 loader, pug and stylus 不需要安裝 loader
使用 tailwind css

## 架構
|- public
  |- img
  vite.svg
|- src
  |- components
  |- css
  |- js
  |- pages
  index.html
  main.js
postcss.config
tailwind.config.js
vite.config.js

### 開發
靜態檔案放 public 資料夾下面, 圖片放 img 下面, 請先自行壓縮
index.html 為共用模板
main.js 為共用模板入口

### vite.config.js => pageList 設定
path = 路徑, title = 頁面標題, pug = 頁面, script (非必要)
預設為 index.html 頁面不能移除或改名, 預覽頁面 path 加上 .html
可用 preview 預覽打包後的畫面

## only for 專案注意事項
- 目前如果要用background-image，先不要用tailwind
- compontent.css 是放組件的地方
- tailwin.css 是引入，設置base的地方
## 待優化
.env 環境設定