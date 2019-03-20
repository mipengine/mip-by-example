const fs = require('fs')
const renderer = require('../lib/renderer')
const path = require('path')
const DocumentParser = require('../lib/DocumentParser')
const navbar = require('../data/navbar')
const EXAMPLE_PATH = './examples'

const indexCategories = []
const CATEGORIES_NAME = {
  'layout': '布局',
  'presentation': '呈现',
  'media': '多媒体',
  'dynamic-content': '动态内容',
  'ads': '广告',
  'social': '社交与分享',
  'analytics': '统计与分析'
}

function generateIndexHtml () {
  const indexHtml = renderer.render('index', {
    navbar: navbar.data,
    categories: Object.values(CATEGORIES_NAME),
    navIndex: 0,
    url: '/v2/components/index.html',
    componentList: indexCategories
  })
  fs.writeFileSync(path.resolve(__dirname, '../../dist/index.html'), indexHtml, 'utf-8')
}

function generateExampleHtml () {
  // 遍历 example 目录
  for (let category in CATEGORIES_NAME) {
    const fullname = path.join(EXAMPLE_PATH, category)
    const categories = {}
    categories['category'] = CATEGORIES_NAME[category]
    categories['components'] = []
    indexCategories.push(categories)

    fs.readdirSync(fullname).forEach((file) => {
      const componentName = path.basename(file, '.html')
      const filePath = './examples/' + category + '/' + componentName + '.html'
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const parser = new DocumentParser(componentName, fileContent)
      const document = parser.exec()

      categories['components'].push({
        name: componentName,
        description: document.description,
        url: '/components/' + category + '/' + componentName
      })

      const exampleHtml = renderer.render('component', {
        categories: document.headings,
        navbar: navbar.data,
        navIndex: 0,
        content: document.document,
        componentName: componentName
      })

      const outputDir = path.resolve(__dirname, '../../dist/components/' + category)
      const outputPath = outputDir + '/' + componentName + '.html'
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir)
      }
      fs.writeFileSync(outputPath, exampleHtml, 'utf-8')
    })
  }
}

module.exports = function (callback) {
  generateExampleHtml()
  generateIndexHtml()
  callback()
}
