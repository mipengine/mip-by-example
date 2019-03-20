/**
 * @file renderer.js
 * @author clark-t (clarktanglei@163.com)
 */

const path = require('path')
const etpl = require('etpl')
const templateDir = path.resolve(__dirname, '../templates')

const engine = new etpl.Engine({
  commandOpen: '{{',
  commandClose: '}}',
  strip: true,
  namingConflict: 'override',
  dir: templateDir,
  extname: '.html'
})

const tplList = [
  'navbar.html',
  'layout.html',
  'index.html',
  'components-list.html',
  'component.html'
]

for (let i = 0; i < tplList.length; i++) {
  engine.loadFromFile(path.resolve(templateDir, tplList[i]))
}

engine.addFilter('json', function (obj) {
  if (!obj) {
    return obj
  }
  return JSON.stringify(obj)
  // return JSON.stringify(obj).replace(/\//g, '\\\/')
})

module.exports = engine
