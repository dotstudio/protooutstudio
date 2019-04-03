'use strict';
// https://github.com/frontainer/frontplate-cli/wiki/6.%E8%A8%AD%E5%AE%9A
module.exports = function (production) {
  global.FRP_SRC = 'pc';
  global.FRP_DEST = 'public/pc';
  global.FRP_ASSET_PATH = '/wp-content/themes/protoout';
  return {
    clean: {},
    html: {
      params: {
        IS_PRODUCTION: production ? true : false
      },
      rules: {
        "tagname-lowercase": false
      }
    },
    style: production ? {
      dest: FRP_DEST + global.FRP_ASSET_PATH + '/assets/css',
    } : {
      dest: FRP_DEST + global.FRP_ASSET_PATH + '/assets/css',
    },
    script: production ? {
      output: {
        path: FRP_DEST + global.FRP_ASSET_PATH + '/assets/js',
        publicPath: '/assets/js/',
        filename: "[name].js",
        sourceMapFilename: 'maps/[name].map',
        jsonpFunction: 'fr'
      },
      module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
              presets: ['es2015'],
              plugins: ['transform-runtime']
            }
          },
          {
            test: /\.ejs$/,
            loader: 'ejs-loader',
            query: {
              variable: 'data',
              interpolate: '\\{\\{(.+?)\\}\\}',
              evaluate: '\\[\\[(.+?)\\]\\]'
            }
          },
        ]
      },
      resolve: {
        alias: {
          'waypoints': 'waypoints/lib'
        }
      }
    } : {
      output: {
        path: FRP_DEST + global.FRP_ASSET_PATH + '/assets/js',
        publicPath: '/assets/js/',
        filename: "[name].js",
        sourceMapFilename: 'maps/[name].map',
        jsonpFunction: 'fr'
      },
      module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
              presets: ['es2015'],
              plugins: ['transform-runtime']
            }
          },
          {
            test: /\.ejs$/,
            loader: 'ejs-loader',
            query: {
              variable: 'data',
              interpolate: '\\{\\{(.+?)\\}\\}',
              evaluate: '\\[\\[(.+?)\\]\\]'
            }
          },
        ]
      },
      resolve: {
        alias: {
          'waypoints': 'waypoints/lib'
        }
      }
    },
    server: {
      ghostMode: {
        clicks: false,
        forms: false,
        scroll: false
      }
    },
    copy: {
      [`${global.FRP_SRC}/lib/**/*`]: `${FRP_DEST + global.FRP_ASSET_PATH}/assets/lib`,
      [`${global.FRP_SRC}/json/**/*`]: `${FRP_DEST + global.FRP_ASSET_PATH}/assets/json`,
      [`${global.FRP_SRC}/images/**/*`]: `${FRP_DEST + global.FRP_ASSET_PATH}/assets/images`,
      [`${global.FRP_SRC}/fonts/**/*`]: `${FRP_DEST + global.FRP_ASSET_PATH}/assets/fonts`
    },
    sprite: [],
    test: {}
  }
};
