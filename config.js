const path = require('path')
const process = require('process')

var config = {
  env: process.env.NODE_ENV || 'development',
  express: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || '18080'
  },
  cache: {
    maxAge: process.env.CACHE_AGE || 864000
  },
  path: {
    template: path.resolve(__dirname, './views')
  }
}

// logger not loaded when generating configurations,
// we use console.log instead
console.log('configuration loaded:', config)

module.exports = config
