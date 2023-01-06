// const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DEV_MODE = process.env.NODE_ENV === 'development';
const WEINRE_MODE = DEV_MODE && process.env.WEINRE;
const config = require('../../config');

const toFilename = (pathName, ext = 'js', hashParamater = true) => {
  const units = [pathName, '.', ext];
  if (!DEV_MODE) {
    const hashStr = ext === 'js' ? '[chunkhash]' : '[contenthash]';
    if (hashParamater) {
      units.push(`?${hashStr}`);
    } else {
      units.splice(1, 0, `-${hashStr}`);
    }
  }
  return units.join('');
};

const getLocalhostIPAddress = () => {
  const ifs = require('os').networkInterfaces();
  // eslint-disable-next-line
  const host = `${Object.keys(ifs).map(x => ifs[x].filter(x => x.family === 'IPv4' && !x.internal)[0]).filter(x => x)[0].address}`;
  return host || 'localhost';
};

const DEFAULT_DATA = {
  DEV_MODE,
  APP_ENV: process.env.APP_ENV,
  weinreScript: WEINRE_MODE ? `http://${getLocalhostIPAddress()}:8000/target/target-script-min.js#anonymous` : false,
  ...config,
};

const createPugHtmlLoaderOptions = (stringify = false, customData = {}, htmlPretty = false) => {
  const options = {
    data: {
      ...DEFAULT_DATA,
      ...customData,
    },
    pretty: htmlPretty,
    globals: [],
  };
  return stringify ? JSON.stringify(options) : options;
};

/**
 * @param {HtmlWebpackPluginOptions} options
 * @param {Object} data
 */
const createHtmlWebpackPlugin = (options, data, htmlPretty = true) => {
  const pugHTMLLoaderOptions = createPugHtmlLoaderOptions(true, data, htmlPretty);
  const { template } = options;
  const htmlLoaderOptions = JSON.stringify({
    interpolate: true,
	// https://webpack.js.org/loaders/html-loader/#attributes
	attrs: ['img:src', 'video:src', 'img:srcset', 'source:srcset'],
  });
  options.template = `!!html-loader?${htmlLoaderOptions}!pug-html-loader?${pugHTMLLoaderOptions}!src/${template}`;
  options.minify = { collapseWhitespace: false };
  return new HtmlWebpackPlugin(options);
};


module.exports = {
  toFilename,
  getLocalhostIPAddress,
  createPugHtmlLoaderOptions,
  createHtmlWebpackPlugin,

};
