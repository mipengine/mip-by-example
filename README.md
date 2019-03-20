# MIP by Example

MIP 组件丰富的使用示例展示。

## 创建新示例

* 在 `example` 目录对应的组件类型中新建页面

  ```
  vim examples/layout/mip-test.html
  ```

* `npm run dev`

* 实时预览示例编写 `http://0.0.0.0:18080/`

## 编写新示例

示例说明部分使用 HTML 注释 ``<!-- ... -->` ，内容使用 markdown 格式

* 二级标题会渲染为右侧目录
* 必须包括 `## 组件介绍` 小节，第一句用于生成组件描述，建议第一句简洁说明组件作用

```html
<!-- ## 组件介绍 -->
<!-- [mip-form](https://www.mipengine.org/v2/components/dynamic-content/mip-form.html) 组件用于在 MIP 页面中进行表单提交。`mip-form` 支持 HTTP 和 XHR(XMLHTTPRequest) 两种提交方式，使用 HTTP 提交会加载或跳转至新的页面，而使用 XHR 提交可以异步渲染更新页面。
-->
```

示例 code 部分直接使用 HTML tag，用于渲染示例代码和示例展示。

```html
<!-- ## 提交表单刷新页面 -->
<!-- 使用 `target=_top` 提交表单后，在当前窗口跳转。-->
<mip-form method="GET" url="/mip-form/submit-form-success" target="_top">
  <input type="text" name="username" placeholder="姓名">
  <input type="number" name="age" placeholder="年龄">
  <input type="submit" value="提交">
</mip-form>
```

* 如果组件仅适用移动端展示，可在示例 DOM 上添加  `data-strategy="mobile-only"`。

```html
<!-- ## 固定位置 -->
<!-- 使用悬浮组件支持 -->
<div id="mip-example-code" data-strategy="mobile-only">
  <mip-fixed type="bottom">
    <mip-appdl 
     ...
    </mip-appdl>
  </mip-fixed>
</div>
</div>
```

如果组件需要 server 进行 api  mock，项目提供基于 express 搭建的 server。可在 `src/routes `中创建和编写路由文件，并在 `src/routes/index.js` 中进行路由 register（建议文件和路由均以组件名命名）

