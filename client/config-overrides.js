/* eslint-disable */
const path = require('path')

module.exports = function override(config, env) {
  const overrideConfig = config

  overrideConfig.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      ...{
        'modules': path.resolve(__dirname, 'src/modules'),
        'utils': path.resolve(__dirname, 'src/utils'),
        'common': path.resolve(__dirname, 'src/common'),
        // 'routes': path.resolve(__dirname, 'src/routes'),
      },
    },
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  }

  return overrideConfig
}