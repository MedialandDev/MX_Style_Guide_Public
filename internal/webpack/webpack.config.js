/* eslint max-len:0 */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const launchEditorMiddleware = require('launch-editor-middleware');
const WebpackBar = require('webpackbar');
const chokidar = require('chokidar');

const {
  toFilename,
  createPugHtmlLoaderOptions,
  createHtmlWebpackPlugin,
} = require('./util');

const DEV_MODE = process.env.NODE_ENV === 'development';
const config = require('../../config');

const publicPath = '';

const webpackConfig = {
  mode: process.env.NODE_ENV,
  context: path.resolve('src'),
  entry: {
    index: ['./index.js'],
    guide: ['./guide.js'],
    myNewPage: ['./my-new-page.js'], // entry名稱不能用-符號，因此改用camelCase
  },
  devtool: DEV_MODE ? 'inline-source-map' : false,
  output: {
    path: path.resolve('dist'),
    filename: toFilename('assets/js/[name]'),
    chunkFilename: toFilename('assets/js/[name]-chunk'),
    publicPath,
  },
  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('src/assets'),
      path.resolve('node_modules'),
    ],
    alias: {
      '@': path.resolve('src'),
    },
  },
  /*
    ##     ##  #######  ########  ##     ## ##       ########
    ###   ### ##     ## ##     ## ##     ## ##       ##
    #### #### ##     ## ##     ## ##     ## ##       ##
    ## ### ## ##     ## ##     ## ##     ## ##       ######
    ##     ## ##     ## ##     ## ##     ## ##       ##
    ##     ## ##     ## ##     ## ##     ## ##       ##
    ##     ##  #######  ########   #######  ######## ########
  */
  module: {
    noParse: /jquery/,
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            // https://forum.vuejs.org/t/how-to-remove-attributes-from-tags-inside-vue-components/24138/9
            options: {
              compilerOptions: {
                modules: [
                  {
                    // remove html attribute data-testid
                    preTransformNode(astEl) {
                      const attribute = 'data-testid';
                      if (process.env.NODE_ENV === 'production') {
                        const { attrsMap, attrsList } = astEl;
                        if (attrsMap[attribute]) {
                          delete attrsMap[attribute];
                          const index = attrsList.findIndex((x) => x.name === attribute);
                          attrsList.splice(index, 1);
                        }
                      }
                      return astEl;
                    },
                  },
                ],
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(ttf|woff|mp4|eot)$/,
        use: {
          // https://github.com/webpack-contrib/file-loader
          loader: 'file-loader',
          options: {
            name: DEV_MODE ? '[path][name].[ext]' : '[path][name].[ext]?[contenthash:8]',
            esModule: false,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: DEV_MODE ? '[path][name].[ext]' : '[path][name].[ext]?[contenthash:8]',
            esModule: false,
            limit: 2 * 1024, // 小於 2k 的圖片變 base64
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: [
              {
                loader: 'pug-plain-loader',
                options: {
                  data: {
                    DEV_MODE,
                    APP_ENV: process.env.APP_ENV,
                  },
                },
              },
            ],
          },
          {
            // 這個沒用到，因為 util.js 裡的 createHtmlWebpackPlugin 取代
            use: [
              {
                loader: 'html-loader',
                options: {
                  interpolate: true, // <img src="${require(`./images/gallery.png`)}">
                  // attrs: ['img:src', 'video:src', 'img:srcset', 'source:srcset'],
                },
              },
              {
                loader: 'pug-html-loader',
                options: createPugHtmlLoaderOptions(),
              },
            ],
            include: path.resolve('src/html'),
          },
        ],
      },
      {
        test: /\.(styl|stylus)?$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: publicPath.substr(0, 1) === '/' ? publicPath : '../../',
              hmr: DEV_MODE,
            },
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [
                // https://github.com/luisrudge/postcss-flexbugs-fixes
                require('postcss-flexbugs-fixes'),
                // https://github.com/postcss/autoprefixer#options
                require('autoprefixer')({
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          {
            loader: 'stylus-loader',
            options: {
              paths: ['src/css/', 'src/assets/', 'src/'],
              sourceMap: true,
              define: {
                DEV_MODE,
              },
              preferPathResolver: 'webpack',
              import: [path.resolve('src/css/mixins/_index.styl')],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  /*
    ########  ##       ##     ##  ######   #### ##    ##  ######
    ##     ## ##       ##     ## ##    ##   ##  ###   ## ##    ##
    ##     ## ##       ##     ## ##         ##  ####  ## ##
    ########  ##       ##     ## ##   ####  ##  ## ## ##  ######
    ##        ##       ##     ## ##    ##   ##  ##  ####       ##
    ##        ##       ##     ## ##    ##   ##  ##   ### ##    ##
    ##        ########  #######   ######   #### ##    ##  ######
  */
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: toFilename('assets/css/[name]', 'css'),
      chunkFilename: toFilename('assets/css/[name]-chunk', 'css'),
    }),
    createHtmlWebpackPlugin({
      template: 'html/index.pug',
      filename: 'index.html',
      chunks: ['index', 'commons', 'vendors'],
    }, { }), // 第二參數可以傳變數給 pug
    createHtmlWebpackPlugin({
      template: 'html/guide.pug',
      filename: 'guide.html',
      chunks: ['guide', 'commons', 'vendors'],
    }, { }), // 第二參數可以傳變數給 pug
    createHtmlWebpackPlugin({
      template: 'html/my-new-page.pug',
      filename: 'my-new-page.html',
      chunks: ['myNewPage', 'commons', 'vendors'], // chunks內為entry名稱，不能用-符號，因此改用camelCase
    }, { }), // 第二參數可以傳變數給 pug
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
    new CopyWebpackPlugin([
      { from: 'assets/copy', to: './', ignore: ['.*'] },
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        VUE_ENV: JSON.stringify('client'),
        ...Object.keys(config).reduce((o, key) => {
          const value = config[key];
          o[key] = ['boolean', 'number'].indexOf(typeof value) !== -1
            ? value
            : JSON.stringify(value);
          return o;
        }, {}),
      },
    }),
    new WebpackBar(),
    ...DEV_MODE
      ? [
        new FriendlyErrorsPlugin(),
      ]
      : [
        new webpack.HashedModuleIdsPlugin(),
        new OptimizeCSSAssetsPlugin({}),
      ],
  ],
  /*
    #######  ########  ######## #### ##     ## #### ########    ###    ######## ####  #######  ##    ##
    ##     ## ##     ##    ##     ##  ###   ###  ##       ##    ## ##      ##     ##  ##     ## ###   ##
    ##     ## ##     ##    ##     ##  #### ####  ##      ##    ##   ##     ##     ##  ##     ## ####  ##
    ##     ## ########     ##     ##  ## ### ##  ##     ##    ##     ##    ##     ##  ##     ## ## ## ##
    ##     ## ##           ##     ##  ##     ##  ##    ##     #########    ##     ##  ##     ## ##  ####
    ##     ## ##           ##     ##  ##     ##  ##   ##      ##     ##    ##     ##  ##     ## ##   ###
    #######  ##           ##    #### ##     ## #### ######## ##     ##    ##    ####  #######  ##    ##
  */
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 100,
      minChunks: 1,
      automaticNameDelimiter: '-',
      name: true,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
        },
        vendors: {
          name: 'vendors',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          enforce: true,
        },
      },
    },
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: !DEV_MODE ? 'warning' : false,
  },
  externals: {
    // 如果有用到 cdnjs script src jquery 的話，可以把這一段加入
    // jquery: 'jQuery',
  },
  /*
    ########  ######## ##     ##  ######  ######## ########  ##     ## ######## ########
    ##     ## ##       ##     ## ##    ## ##       ##     ## ##     ## ##       ##     ##
    ##     ## ##       ##     ## ##       ##       ##     ## ##     ## ##       ##     ##
    ##     ## ######   ##     ##  ######  ######   ########  ##     ## ######   ########
    ##     ## ##        ##   ##        ## ##       ##   ##    ##   ##  ##       ##   ##
    ##     ## ##         ## ##   ##    ## ##       ##    ##    ## ##   ##       ##    ##
    ########  ########    ###     ######  ######## ##     ##    ###    ######## ##     ##
  */
  devServer: {
    before(app, server) {
      app.use('/__open-in-editor', launchEditorMiddleware(null, 'src', () => console.log(
        'To specify an editor, specify the EDITOR env variable or '
        + 'add "editor" field to your Vue project config.\n',
      )));
      // hot reload for html, pug, 如果是開發 vue 專案，chokidar 就可以不用寫
      chokidar.watch('src/html/**/*').on('all', () => {
        server.sockWrite(server.sockets, 'content-changed');
      });
    },
    historyApiFallback: true,
    noInfo: true,
    port: 3000,
    hot: true,
    stats: {
      colors: true,
      hash: false,
      chunks: false,
      chunkModules: false,
      children: false,
    },
    host: '0.0.0.0',
    disableHostCheck: true,
    /*  proxy: [
      {
        context: ['/upload', '/api'],
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    ], */
  },

};

module.exports = webpackConfig;
