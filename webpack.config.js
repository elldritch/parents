module.exports = {
  devtool: 'inline-source-map',
  entry: './index.ts',
  output: {
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
};
