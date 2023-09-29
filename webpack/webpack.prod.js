const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack'); // Import dotenv-webpack

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';
const envFileName = isProduction ? '.env.prod' : process.env.NODE_ENV === 'uat' ? '.env.uat' : '.env.local';

console.log({
  dir: __dirname,
  cwd: process.cwd(),
  distPath: path.resolve(process.cwd(), 'dist'),
});

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const getRules = () => {
  return [
    {
      test: /\.(ts|tsx)$/i,
      loader: 'ts-loader',
      exclude: ['/node_modules/'],
    },
    {
      test: /\.css$/i,
      use: [stylesHandler, 'css-loader'],
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
      type: 'asset',
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    },
    {
      test: /\.html$/,
      use: ['html-loader'], // You can use 'html-loader' to load HTML files
    },
  ];
};

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    main: './src/index.js',
  },
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,

  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].[contentHash].effihr.bundle.js',
    publicPath: '/',
  },
  module: {
    rules: getRules(),
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin(),
    new Dotenv({
      path: envFileName, // Specify the .env file based on the environment
    }), // Include the Dotenv plugin
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      src: path.resolve(process.cwd(), 'src'),
    }
  },
};
