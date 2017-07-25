var
  fs = require('fs'),
  path = require('path'),
  glob = require('glob'),
  utils = require('./utils'),
  webpack = require('webpack'),
  config = require('../config'),
  merge = require('webpack-merge'),
  baseWebpackConfig = require('./webpack.base.conf'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin'),
  SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin'),
  PurifyCSSPlugin = require('purifycss-webpack');

var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true, // warn about potentially dangerous optimizations/code
        sequences: true,  // join consecutive statemets with the “comma operator”
        properties: true,  // optimize property access: a["foo"] → a.foo
        dead_code: true,  // discard unreachable code
        drop_debugger: true,  // discard “debugger” statements
        unsafe: false, // some unsafe optimizations (see below)
        conditionals: true,  // optimize if-s and conditional expressions
        comparisons: true,  // optimize comparisons
        evaluate: true,  // evaluate constant expressions
        booleans: true,  // optimize boolean expressions
        loops: true,  // optimize loops
        unused: true,  // drop unused variables/functions
        hoist_funs: true,  // hoist function declarations
        hoist_vars: true, // hoist variable declarations
        if_return: true,  // optimize if-s followed by return/continue
        join_vars: true,  // join var declarations
        cascade: true,  // try to cascade `right` into `left` in sequences
        side_effects: true,  // drop side-effect-free statements
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync(path.join(__dirname, '../*.html')),
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
        discardComments: {
          removeAll: true
        }
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: 'body',
      minify: {
        html5: true,
        useShortDoctype: true,
        decodeEntities: true,
        removeTagWhitespace: true,
        removeStyleLinkTypeAttributes: true,
        removeScriptTypeAttributes: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: false,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        preserveLineBreaks: false,
        sortAttributes: true,
        sortClassName: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      serviceWorkerLoader: `<script>${fs.readFileSync(path.join(__dirname,
        './service-worker-prod.js'), 'utf-8')}</script>`
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      // filename: 'used-twice.js',
      async: 'used-twice',
      children: false,
      minChunks: function (module, count) {
        return count >= 2;
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      // filename: 'vue-loader.js',
      async: 'vue-loader',
      minChunks: function (module, count) {
        var context = module.context;
        var targets = ['vue', 'vue-router']
        return context &&
          context.indexOf(path.join(__dirname, '../node_modules')) >= 0 &&
            targets.find(function (t) {
                return new RegExp('\\\\' + t + '\\\\', 'i').test(context);
              });
      },
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    // service worker caching
    new SWPrecacheWebpackPlugin({
      cacheId: 'my-vue-app',
      filename: 'service-worker.js',
      staticFileGlobs: ['dist/**/*.{js,html,css}'],
      minify: true,
      stripPrefix: 'dist/'
    })
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
