const path = require('path');

module.exports = {
  entry: './index.js',
  mode: "development",
  devtool: 'source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};