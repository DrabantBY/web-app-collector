import { resolve } from 'node:path';
import HtmlBundlerPlugin from 'html-bundler-webpack-plugin';

export default {
  mode: 'development',

  devtool: 'eval-source-map',

  devServer: {
    static: './dist/pages',
  },

  output: {
    path: resolve(import.meta.dirname, 'dist'),
    clean: true,
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: [
        {
          import: 'src/templates/home.html', // template file
          filename: 'pages/index.html', // => dist/pages/index.html
          data: { title: 'Home page' }, // pass variables into template
        },
        {
          import: 'src/templates/about.html', // template file
          filename: 'pages/about.html', // => dist/pages/about.html
          data: { title: 'About page' }, // pass variables into template
        },
      ],

      js: {
        // output filename of compiled JavaScript
        filename: 'scripts/main.js', // => dist/scripts/main.js
      },
      css: {
        // output filename of extracted CSS
        filename: 'styles/main.css', // => dist/styles/main.css
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(s?css)$/,
        use: ['css-loader', 'sass-loader'],
      },

      {
        test: /\.(ico|png|jp?g|webp|tiff)/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name][ext]',
        },
      },

      {
        test: /\.(svg)/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/svg/[name][ext]',
        },
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
    ],
  },

  // enable HMR with live reload
  // devServer: {
  //   static: resolve(import.meta.dirname, 'dist'),
  //   watchFiles: {
  //     paths: ['src/**/*.*'],
  //     options: {
  //       usePolling: true,
  //     },
  //   },
  // },
};
