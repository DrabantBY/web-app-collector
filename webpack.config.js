import { resolve, join } from 'node:path';
import HtmlBundlerPlugin from 'html-bundler-webpack-plugin';

export default {
  mode: 'development',

  devtool: 'eval-source-map',

  devServer: {
    static: {
      directory: join(import.meta.dirname, 'dist'),
    },
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true,
      },
    },
  },

  resolve: {
    alias: {
      '@assets': join(import.meta.dirname, 'src/assets'),
      '@img': join(import.meta.dirname, 'src/assets/img'),
      '@svg': join(import.meta.dirname, 'src/assets/svg'),
      '@fonts': join(import.meta.dirname, 'src/assets/fonts'),
      '@scripts': join(import.meta.dirname, 'src/scripts'),
      '@styles': join(import.meta.dirname, 'src/styles'),
      '@templates': join(import.meta.dirname, 'src/templates'),
    },
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
          filename: 'index.html', // => dist/pages/index.html
          data: { title: 'Home page' }, // pass variables into template
        },
        {
          import: 'src/templates/about.html', // template file
          filename: 'about.html', // => dist/pages/about.html
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
        test: /\.(s?css)$/i,
        use: ['css-loader', 'sass-loader'],
      },

      {
        test: /\.(ico|png|jp?g|webp|tiff)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name][ext]',
        },
      },

      {
        test: /\.(svg)$/i,
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
};
