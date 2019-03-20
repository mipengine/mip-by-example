module.exports = {
  data: [
    {
      'name': '组件示例',
      'path': 'docs/index',
      // "url": "/index.html",
      'activeUrl': /^\/(index\.html|v2|v2\/|v2\/index\.html)?((\?|\\#).*)?$/
    },
    {
      'name': '关于 MIP',
      'activeUrl': /^\/(v2\/)?about/,
      'children': [
        {
          'name': '什么是 MIP',
          'path': 'docs/about/what-is-mip.md'
        },
        {
          'name': 'MIP 是如何运作的',
          'path': 'docs/about/how-mip-works.md'
        },
        {
          'name': 'MIP 使用场景',
          'path': 'docs/about/who-uses-mip.md'
        },
        {
          'name': 'MIP 内容声明',
          'path': 'docs/about/announcement.md'
        }
      ]
    },
    {
      'name': 'GitHub',
      'url': 'https://github.com/mipengine/mip2',
      'blank': true
    }
  ]
}
