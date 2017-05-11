var path = require('path');

module.exports = {
  entry: './src/particle-engine.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ParticleBackground',
    libraryTarget: 'umd',
  },
    resolve: {
        modules: [
            path.join(__dirname, './src')
        ],
        extensions: ['.js', '.jsx']
    },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, './src'),
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015', 'stage-2'] },
        }],
      },
    ],
  },
};
