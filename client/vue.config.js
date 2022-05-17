const path = require('path');
module.exports = {
  transpileDependencies: ['vuetify'],
  outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    proxy: 'http://127.0.0.1:3000',
  },
  configureWebpack: {
    devtool: 'source-map',
  },
};
