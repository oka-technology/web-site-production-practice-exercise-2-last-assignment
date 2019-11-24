import path from 'path';
import { Configuration } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __DEV__: boolean = process.env.NODE_ENV !== 'production';

export default (): Configuration => ({
  mode: __DEV__ ? 'development' : 'production',
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/i,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
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
        test: /\.jpg$|\.png$/i,
        use: [{ loader: 'file-loader', options: { outputPath: 'img' } }],
      },
      {
        test: /\.eot$|\.svg$|\.ttf$|\.woff$|\.woff2$|\.otf$/i,
        use: [{ loader: 'file-loader', options: { outputPath: 'fonts' } }],
      },
    ],
  },
});
