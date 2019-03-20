/**
 * @file parse example file html
 */
const parse5 = require('parse5')
const htmlparser2Adapter = require('parse5-htmlparser2-tree-adapter')
const marked = require('marked')
const striptags = require('striptags')
const hljs = require('highlight.js')

class DocumentParser {
  constructor (tagName, html) {
    this.doc = ''
    this.tagName = tagName
    this.html = html
    this.headings = []
  }

  exec () {
    const document = parse5.parse(this.html)
    this.walker(document, this.html)
    return {
      document: this.doc,
      headings: this.headings,
      description: this.description || ''
    }
  }

  walker (node, html) {
    if (node.nodeName === '#comment') {
      const markdown = this.normalizeLeadingWhitespace(node.data)
      const tokens = marked.lexer(markdown)
      for (let token of tokens) {
        // extract headings
        if (token.type === 'heading' && token.depth === 2) {
          this.headings.push(token.text)
        }
        // extract first sentence as description
        if (token.type === 'paragraph') {
          this.extractDescription(token.text)
        }
      }
      const markedDoc = marked.parser(tokens)
      this.doc += this.appendHtml(markedDoc)
    }

    if (this.isExampleCode(node) || node.tagName === this.tagName) {
      const exampleCode = this.parseCode(node)
      const strategy = getAttribute(node, 'data-strategy') || ''
      this.doc += '<div class="mip-components-example-container" ' + strategy + '>'
      this.doc += this.appendPreview(exampleCode)
      this.doc += this.appendCode(exampleCode)
      this.doc += '</div>'
    } else {
      const childNodes = node.childNodes || []
      for (let childNode of childNodes) {
        this.walker(childNode, html)
      }
    }
  }
  isExampleCode (node) {
    return hasAttribute(node, {
      name: 'id',
      value: 'mip-example-code'
    })
  }
  extractDescription (paragraph) {
    const result = []
    if (this.description) {
      return
    }
    // get first sentence
    for (let i = 0; i < paragraph.length; i++) {
      const current = paragraph.charAt(i)
      result.push(current)
      if (current === '。' || current === '\n' || current === '\r') {
        break
      }
    }
    let sentence = result.join('')
    sentence = marked(sentence)
    sentence = striptags(sentence)
    this.description = sentence
  }
  normalizeLeadingWhitespace (string) {
    let lines = string.replace(/\t/g, '  ').split(/\r?\n/)
    let offset = Number.MAX_SAFE_INTEGER
    for (let line of lines) {
      if (line.trim().length > 0) {
        const lineOffset = this.stripLeadingWhitespace(line, line.length)
        offset = offset > lineOffset ? lineOffset : offset
      }
    }
    offset = offset === Number.MAX_SAFE_INTEGER ? 0 : offset
    lines = lines.map(line => {
      line = line.substring(offset)
      const trimmedString = line.trim()
      if (trimmedString.startsWith('#')) {
        line = trimmedString
      }
      return line
    })
    return lines.join('\n')
  }
  stripLeadingWhitespace (string, offset) {
    let startIndex = 0
    for (let i = 0; i < offset; i++) {
      if (string.charAt(i) === ' ') {
        startIndex++
      } else {
        break
      }
    }
    return startIndex
  }
  parseCode (node) {
    let docFragment = node
    if (!this.isExampleCode(node)) {
      docFragment = htmlparser2Adapter.createDocumentFragment()
      htmlparser2Adapter.appendChild(docFragment, node)
    }
    return parse5.serialize(docFragment)
  }

  appendPreview (code) {
    const previewHtml = `
      <div class="mip-components-preview">
        <div class="preview-header">
          <h4> MIP Example </h4>
        </div>
        ${code}
      </div>`
    return previewHtml
  }

  appendCode (code) {
    const highlightCode = this.highlight(code, 'html')
    const codeHtml = `
      <div class="mip-components-code highlight">
        <div class="code-label"></div>
        <pre>${highlightCode}</pre>
      </div>`
    return codeHtml
  }

  appendHtml (doc) {
    const docHtml = `<div class="mip-components-desc markdown-body">${doc}</div>`
    return docHtml
  }

  highlight (code, lang) {
    if (lang) {
      return hljs.highlight(lang, code).value
    } else {
      return hljs.highlightAuto(code).value
    }
  }
}

function getAttribute (node, attributeName) {
  if (!node.attrs) {
    return
  }
  for (let attr of node.attrs) {
    if (attr.name === attributeName) {
      return attr.value
    }
  }
}

function hasAttribute (node, attribute) {
  if (!node.attrs) {
    return
  }
  for (let attr of node.attrs) {
    if (attr.name === attribute.name && attr.value === attribute.value) {
      return true
    }
  }
  return false
}

module.exports = DocumentParser
