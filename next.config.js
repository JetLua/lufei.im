const path = require('path')

module.exports = {
  env: {
    PROD: process.env.NODE_ENV === 'production'
  },

  webpack: (config, {webpack}) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve('.'),
      '~': path.resolve('./src'),
    }

    config.plugins.push(
      new webpack.ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom',
        // PIXI: 'pixi.js'
      })
    )

    return config
  }
}
