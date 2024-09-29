const path = require('path');

module.exports = {
  mode: 'development', // Cambia a 'production' para producción
  entry: {
    main: './src/index.js',
    details: './src/details.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    open: true, // Abre el navegador automáticamente
  },
};
