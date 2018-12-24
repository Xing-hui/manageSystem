'use strict'
const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Dev Server settings
    host: '0.0.0.0',
    port: 8081,

    // Source Maps
    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true,
    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsSubDirectory: 'static',
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsPublicPath: '/wxapi/',

    // Source Maps
    productionSourceMap: false,
    devtool: '#source-map'
  }
}
