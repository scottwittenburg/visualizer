/* const webpack = */ require('webpack');
const path = require('path');
const loaders = require('./node_modules/paraviewweb/config/webpack.loaders.js');

const eslintrcPath = path.join(__dirname, '.eslintrc.js');
const plugins = [];

// if(process.env.NODE_ENV === 'production') {
//     console.log('==> Production build');
//     plugins.push(new webpack.DefinePlugin({
//         "process.env": {
//             NODE_ENV: JSON.stringify("production"),
//         },
//     }));
// }

module.exports = {
  plugins: plugins,
  entry: path.join(__dirname, './src/app.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'Visualizer.js',
  },
  module: {
    rules: [
      { test: require.resolve("./src/app.js"), loader: 'expose-loader?Visualizer' },
      { test: /\.js$/,
        use: [
          { loader: 'babel-loader', options: {
            presets: ['es2015'],
          } },
        ],
      },
      { test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
        options: { configFile: eslintrcPath }
      },
    ].concat(loaders)
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.join(__dirname, './src'),
    ],
    alias: {
        PVWStyle: path.resolve('./node_modules/paraviewweb/style'),
        VisualizerStyle: path.resolve('./style'),
    },
  },
  // postcss: [
  //     require('autoprefixer')({ browsers: ['last 2 versions'] }),
  // ],
  // eslint: {
  //     configFile: '.eslintrc.js',
  // },
  devServer: {
      contentBase: './dist/',
      port: 9999,
      hot: true,
      quiet: false,
      noInfo: false,
      stats: {
          colors: true,
      },
      proxy: {},
  },
};
