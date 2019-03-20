const express = require('express')
const app = express()
const path = require('path')

app.get('/components/:category/:componentId', (req, res) => {
  const category = req.params.category
  const componentId = req.params.componentId
  const filePath = '../dist/components/' + category + '/' + componentId + '.html'
  res.sendFile(path.resolve(__dirname, filePath))
})

app.use(require('./routes'))

app.use(express.static(
  path.resolve(__dirname, '../dist')
))

module.exports = app
