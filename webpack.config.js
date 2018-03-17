const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000
  },

  module: {
    rules : [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract([ 'css-loader', 'postcss-loader' ]),
        include: [__dirname]
      },
      {
        test: /\.scss$/,
        loader:
          ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [ 'css-loader','postcss-loader', 'sass-loader' ]
          }),
          include: [__dirname]
      }

    ]
},
plugins: [
      new ExtractTextPlugin("style.css")
      ]
};
