const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const DEV = 'development'
const MODE = process.env.NODE_ENV ? process.env.NODE_ENV : DEV

const ENDS_WITH_JS = /\.jsx?$/
const ENDS_WITH_CSS = /\.css$/i
const NODE_MODULES_DIR = /node_modules/

const devServer = {
  contentBase: path.resolve(__dirname, 'utilities_for_me/web_app/static'),
  hot: true
}

module.exports = {
  entry: './utilities_for_me/web_app/client/react/index.jsx',

  resolve: {
    extensions: ['.js', '.jsx']
  },

  output: {
    path: path.resolve(__dirname, 'utilities_for_me/web_app/static'),
    filename: 'index-bundle.js'
  },

  mode: MODE,

  module: {
    rules: [
      {
        test: ENDS_WITH_JS,
        exclude: NODE_MODULES_DIR,
        use: {
          loader: 'babel-loader' // Magically finds this module and magically gets a babelrc (ugh!)
        }
      },
      {
        test: ENDS_WITH_CSS,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] // Magically finds loaders and libs?, transformed from right to left?
      }
    ]
  },

  plugins: [new MiniCssExtractPlugin({ filename: 'index-bundle.css' })],

  devServer: devServer,

  devtool: 'source-map'
}
