import path from 'path';
import { Configuration } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';

export default (): Configuration => ({
  mode: 'development',
  optimization: {
    minimizer: [new TerserPlugin({})],
  },
  entry: path.resolve(__dirname, './src/ts/index.ts'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'style.css',
            },
          },
          'extract-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
          'extract-loader',
          'html-loader',
        ],
      },
      {
        test: /\.jpg$|\.png$|\.eot$|\.svg$|\.ttf$|\.woff$|\.woff2$|\.otf$/i,
        use: ['file-loader'],
      },
    ],
  },
});
