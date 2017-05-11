var path = require('path');

module.exports = {
  entry: './src/particle-background.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/react')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015', 'react', 'stage-2'] },
        }],
      },
    ],
  },
};
