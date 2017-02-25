var webpack = require('webpack');
var path = require('path');
const PORT = process.env.PORT || 3000;
const ROOT_URL = process.env.ROOT_URL || 'http://localhost:';

module.exports = {
  entry: [
    './app/index.js'
  ],
    output: {
      path: path.resolve(__dirname, "public"),
      filename: 'scripts/bundle.js',
      publicPath: ROOT_URL+PORT,
    },
  resolve: {
    extensions: ['', '.js']
  },
    plugins: [
      new webpack.OldWatchingPlugin(),
      new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"scripts/vendor.bundle.js"),
    ],
};
