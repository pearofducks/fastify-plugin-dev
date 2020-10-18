const { join } = require('path')

module.exports = {
  entry: {
    main: [join(__dirname, 'client.js')]
  },
  stats: 'errors-only',
  mode: 'development',
  output: {
    publicPath: '/assets',
    path: join(__dirname, 'dist'),
    filename: '[name].js'
  },
}
