var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    './app/index.js'
  ],
    output: {
      path: path.resolve(__dirname, "public"),
      filename: 'scripts/bundle.js'
    },
  resolve: {
    extensions: ['', '.js']
  },
    plugins: [
      new webpack.OldWatchingPlugin(),
      new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"scripts/vendor.bundle.js"),
    ],
};
