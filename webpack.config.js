const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './utilities_for_me/web_app/client/react/index.js',
  output: {
    path: path.resolve(__dirname, 'utilities_for_me/web_app/static'),
    filename: 'index-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', 'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'utilities_for_me/web_app/client/react/index.css',
      chunkFilename: 'utilities_for_me/web_app/static/index-bundle.css'
    })
  ]
}
