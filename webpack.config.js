const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
const cfg = require('./config.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const htmlMinify = {
  html5: true,
  minifyJS: true,
  minifyCSS: true,
  removeComments: true,
  collapseWhitespace: true,
};

module.exports = function(env = {}, argv = {}) {
  const IS_PRODUCTION = env.production;
  const ASSET_NAME = IS_PRODUCTION ? '[name].[chunkhash]' : '[name]';
  process.env.NODE_ENV = IS_PRODUCTION ? 'production' : 'development';
  const envCfg = cfg[env.config || 'local'];

  const config = {};
  config.mode = process.env.NODE_ENV;

  config.entry = {
    app: [
      './src/setup'
    ],
  };

  if (IS_PRODUCTION) {
    config.entry.app.unshift('@babel/polyfill');
  }

  config.output = {
    filename: `assets/js/${ASSET_NAME}.js`,
    chunkFilename: `assets/js/${ASSET_NAME}.js`,
    path: path.resolve(__dirname, 'www'),
  };

  config.optimization = {
    runtimeChunk: 'multiple',
    splitChunks: {
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          priority: -10,
        },
      },
    },
  };

  config.resolve = {
    symlinks: true,
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    plugins: [new TsconfigPathsPlugin({ configFile: path.join('tsconfig.json') })],
  };

  config.devtool = IS_PRODUCTION ? 'hidden-source-map' : 'source-map';

  config.stats = {
    assets: false,
    chunks: false,
    modules: false,
    children: false,
  };

  config.devServer = {
    hot: true,
    https: false,
    compress: false,
    host: '0.0.0.0',
    useLocalIp: true,
    historyApiFallback: true,
    stats: config.stats,
    disableHostCheck: true,
    allowedHosts: [
      'www.duoea.local',
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:3030',
        pathRewrite: {'^/api' : ''}
      }
    }
  };

  const typescriptRule = {
    test: /\.tsx?$/,
    use: [
      {
        loader: 'awesome-typescript-loader',
      },
    ],
  };

  if (!IS_PRODUCTION) {
    typescriptRule.use.unshift({loader: 'react-hot-loader/webpack'});
  }

  config.module = {
    rules: [
      typescriptRule,
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'lazyStyleTag',
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: IS_PRODUCTION ? '[hash:base64]' : '[path][name]__[local]',
              },
            },
          },
          ...(IS_PRODUCTION ? [{
            loader: 'postcss-loader',
            options: {
              browser:['last 10 versions'],
              plugins: [
                require('autoprefixer')([
                  'iOS >= 8',
                  'Android >= 4',
                  'IE >= 11',
                  'Chrome >= 8',
                  'Firefox >= 4',
                  'Safari >= 5.1',
                  'Opera >= 12.1',
                ])
              ]
            }
          }] : []),
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `[${IS_PRODUCTION ? 'hash' : 'name'}].[ext]`,
              outputPath: 'assets/images/',
            },
          },
        ]
      },
      {
        test: /\.wasm$/,
        type: 'javascript/auto',
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `[${IS_PRODUCTION ? 'hash' : 'name'}].[ext]`,
              outputPath: 'assets/libraries/',
            },
          },
        ],
      },
    ],
  };

  config.plugins = [
    new webpack.DefinePlugin({
      'SERVICE_API': JSON.stringify(envCfg.api)
    }),
    new CheckerPlugin(),
    new HtmlWebpackPlugin({
      chunksSortMode: 'manual',
      filename: './index.html',
      template: './index.tpl.html',
      minify: IS_PRODUCTION ? htmlMinify : false,

      title: pkg.title,
      author: pkg.author,
      version: pkg.version,
      keywords: pkg.keywords,
      description: pkg.description,

      environment: process.env.NODE_ENV,
    }),
    new ScriptExtHtmlWebpackPlugin({
      inline: IS_PRODUCTION ? [/runtime~\w+/] : [],
      defaultAttribute: 'defer',
    }),
    new ProgressBarPlugin(),
  ];

  if (IS_PRODUCTION) {
    config.plugins.push(
      new webpack.EnvironmentPlugin({
        'VERSION': pkg.version
      })
    );
    config.plugins.push(
      new CompressionPlugin({
        exclude: /\.map$/
      })
    );

    const sentryConfigFile = './.sentryclirc';
    if (fs.existsSync(sentryConfigFile)) {
      config.plugins.push(
        new SentryWebpackPlugin({
          release: pkg.version,
          include: './dist',
          urlPrefix: '~/',
          configFile: sentryConfigFile,
        })
      );
    }
  } else {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  if (env.report) {
    config.plugins.push(new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static',
    }));
  }


  return config;
};
