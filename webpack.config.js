const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')

const commonStyleLoaders = [
  MiniCssExtractPlugin.loader,
  // 'style-loader',
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      plugins: [
        require('autoprefixer')({
          browsers: [
            '> 1%',
            'last 2 versions',
            'ie 9-10'
          ]
        })
      ]
    }
  }
]

module.exports = {
  entry: {
    'index': path.resolve(__dirname, 'src/style/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  mode: 'production',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          ...commonStyleLoaders,
          'stylus-loader'
        ]
      },
      {
        test: /\.css$/,
        use: commonStyleLoaders
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assert/img/[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      '@': path.resolve(__dirname)
    }
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          safe: true
        }
      })
    ]
  }
}
