const app = require('./src/app')
const config = require('./config')

app.listen(config.express.port, config.express.host, function () {
  console.log(`listening at ${config.express.host}:${config.express.port}`)
})
