# MX development guide

## 切版專案 Quick Start
 - https://nodejs.org/en/download/ 安裝 node.js (範例使用v16.14.2)
 - terminal 執行 ``npm i`` 即可安裝所需套件
 - terminal 執行 ``npm run start`` 即可啟動
 - 瀏覽 ``localhost:3000`` 即可預覽畫面
 - 新增一個頁面的步驟:
     
    - 執行 ``npm run plop``，並輸入想要新增的頁面名稱(例: about )，即會自動新增:
      (名稱請使用kebab-case，也就是小寫加上-符號)
        ```
            src\新頁面名稱.js
            src\css\新頁面名稱.styl
            src\html\新頁面名稱.pug
        ```
        以上三個檔案。或也可以選用手動新增: 新增步驟為:
        ```
            1. 複製 src\index.js 更名為新頁面名稱 (例: about.js)
            2. about.js 內第一行 ``import './css/index.styl';`` 更名為新頁面名稱，例: ``import './css/about.styl';``
            3. 複製檔案 src\css\index.styl 更名為新頁面名稱 (例: about.styl)
            4. 複製檔案 src\html\index.pug 更名為新頁面名稱 (例: about.pug)
        ```
     
    - internal\webpack\webpack.config.js 設定檔裡，新增兩段內容:
        1. webpack.config.js 設定檔裡，新增一個 entry
            - 複製第29行:
                ```
                    index: ['./index.js'],
                ```
            - 並更改為新頁面名稱，例:
                ```
                    about: ['./about.js'],
                ```
            - 貼在 29行下面


        2. webpack.config.js 設定檔裡，新增一個 createHtmlWebpackPlugin
            - 複製第220-224行:
                ```
                    createHtmlWebpackPlugin({
                    template: 'html/index.pug',
                    filename: 'index.html',
                    chunks: ['index', 'commons', 'vendors'],
                    }, { }), // 第二參數可以傳變數給 pug
                ```
            - 並更改為新頁面名稱，例:
                ```
                    createHtmlWebpackPlugin({
                    template: 'html/about.pug',
                    filename: 'about.html',
                    chunks: ['about', 'commons', 'vendors'],
                    }, { }),
                ```
            - 貼在 224行下面
    - 以上兩步驟完成後，輸入 ``Ctrl + C`` 停止 terminal

    - terminal 再次執行 ``npm run start`` 即可重新啟動
    - 重新啟動後，瀏覽 ``localhost:3000/about.html`` 即可預覽新頁面的畫面
    - 新頁面的 HTML 內容，進入 ``src\html\about.pug`` 即可編輯
    - 新頁面的 CSS 內容，進入 ``src\css\about.styl`` 即可編輯
    - 新頁面的 JS 內容，進入 ``src\about.js`` 即可編輯
    - 新頁面的 IMG 內容，放入 ``src\assets\img`` 內，從 HTML/CSS裡輸入路徑 `` ~img/圖檔名稱.jpg `` 即可取用

## 線上 guide.html Demo
TBC

## Gitflow
TBC

## eslint
- JS 用 airbnb base
- eslint 若有紅字，請修正

## npm script
- 啟動： ``npm run start``
- 打包： ``npm run build``
- 新增頁面： ``npm run plop``


## development 
- 專案都以 webpack 開發
- 測試站一律都要放 robots.txt, 檔案在 guide/robots.txt

## 打包步驟
- 執行： ``npm run build`` build 出打包檔，會 build 到 /dist 資料夾
- 切版 demo 網址，使用 githubPage： https://medialanddev.github.io/MX_Style_Guide_Public/dist-build/
- 如需更新 demo, 請將 build 出的 /dist 資料夾，手動複製貼上到 /dist-build 資料夾，並推版到 master 分支，五分鐘後 githubPage 便會自動更新
- 測試站一律都要放 robots.txt, 檔案在 src/assets/copy/robots.txt， build 時會自動複製到根目錄

## Javascript Guide
- 採用 js es6

## Style Guide
- 採用 stylus
- 檔案命名可以參考 boostrap 或是 https://tailwindcss.com/

### Repository

```
    /internal/webpack/webpack.config.js - 在這裡設定 entry, 並使用 createHtmlWebpackPlugin 註冊新頁面
    /src
        /css
            /base - 所有專案共用 mixins/extends, 全站共用樣式各個細項
                    
            /mixins - 放 stylus 變數、function、不包含實際的 .class, 檔名都加 _ 開頭

            /modules - 個別 dom 物件/components 樣式
                命名可以參考 https://tailwindcss.com/
            /vendors - 外部套件樣式
            common.styl - 全站共用樣式 (挑選需要的 modules & vendors include)
            {pagename}.styl - 頁面樣式 (需include common.styl)

        /assets
            /copy - 這裡放的東西，會直接複製到切版的根目錄
            /img - 放圖檔
        /html - 這裡放 pug 檔
        /utils - 這裡放要寫給 js export 的 modules
```

### CSS Naming
- 目前檔案使用 `B(Block)-E(Element)-E(Element)`
- 表示執行狀態的Modifier class，前綴 `is-`，需與 Element Class 併用
- 表示另一版本樣式的class，前綴 `style-`，需與 Element Class 併用
    - Modifier Example
        - (X) .nav__open { z-index: 10; }
        - (X) .is-open { z-index: 10; }
        - (O) nav.is-open { z-index: 10; }
        - (X) .style-dark { background-color: #333; color: white; }
        - (O) button.style-dark { background-color: #333; color: white; }

- 為了方便了解 class 含意，傾向使用完整單字，少使用簡稱
    - Example
        - (O) .button-submit
        - (O) .btn-submit
        - (X) .b-s

#### CSS Naming Examples:
- .nav
- .nav-item
- .nav-item-zhname
- .nav-item-enname
- .nav-item.is-active
- .nav.is-sticked
- .btn
- .btn.is-disabled
- .btn.style-large


### CSS Styles

#### Reset
- 使用 Reset CSS (Meyer)
- 或是直接導入 boostrap4

#### Box-Sizing
- 一律使用border-box ( = padding 含在寬高內)
- 或是直接導入 boostrap4

#### Typography
- 傾向將用於文字排版的樣式設定在 article 的子元素。
    - 因文字段落的量一般比非文字元素少很多，限縮在 article 內方便管理，不會影響全局排版。
    - h1-h6 另設 class 寫樣式，便於調整SEO。
    - Example
        - (X) h1 { line-height: 1.6 }
        - (O) article.article h1, .h1 { line-height: 1.6 }
        - (O) .title-bordered { line-height: 1.6 }
        - (O) article.article p { line-height: 1.6 }

- Font-Size
    - html
        - 使用 100%
    - h1-h6, p, text elements
        - 使用單位: px ( follow 專案視覺 guideline )
        - 因 RWD 各 breakpoint 視覺內訂定的標題/文字尺寸一般以 px 標、且不一定互成比例，所以不傾向使用em/rem。

    - input, textarea, form elements
        - 使用單位: px ( follow 專案視覺 guideline )
        - 若為 16px ，則設為 1rem。

- Line-Height
    - 使用無單位( = em )標記
        - 因同一文字元素在各 breakpoint 視覺內訂定的行高一般相同。視覺修調前後的行高一般也會依比例修改，所以傾向使用 em。
    - 非文字元素： reset 為 1。

#### Breakpoints
- import bootstrap.css (v4.4.1) - 576px, 768px, 992px, 1200px

#### Colors
- 不 follow Bootstrap。
- 不傾向以業務邏輯命名顏色。
- 直接以顏色名稱加前綴來命名變數。
- Example
    - (X) color-primary
    - (O) color-red
    - (O) c-red

#### Grid System
- 已有 import bootstrap.css (v4.4.1)
- 此bootstrap 為原始版，並未經過 customize (gutter為 30px)
- 已有新增 .gutter-{size} 的擴充class 於 size.styl ，可以使用

#### 其他
- 不要針對 tag 直接寫 style
- Example
    - (X) button { width: 100px; }
    - (O) .custom-btn { width: 100px; }
    - (X) h1 { font-size: 32px; }
    - (O) .h1 { font-size: 32px; }