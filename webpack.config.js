const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const LodashWebpackPlugin = require('lodash-webpack-plugin')

const devServerConfig = {
  contentBase: path.join(__dirname, 'dist'),
  compress: true,
  port: 9000,
  proxy: {
    '/api': 'http://localhost:8080'
  },
  historyApiFallback: true
}

module.exports = {
  entry: { main: './src/App/App.jsx' },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: devServerConfig,
  devtool: 'cheap-module-source-map',
  // devtool: 'inline-source-map',
  resolve: {
    alias: {
      public: path.resolve(__dirname, 'public'),
      app: path.resolve(__dirname, 'src', 'App')
    },
    extensions: ['.webpack.js', '.web.js', '.js', '.json', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['lodash'],
            presets: ['@babel/react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        // images
        test: /\.(png|svg|jpg|gif)$/,
        use: ['url-loader']
      },
      {
        // fonts
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    // new LodashWebpackPlugin(),
    new CopyWebpackPlugin([{ from: 'src/server.js' }], {
      ignore: ['src/Database/*.js']
    })
  ]
}