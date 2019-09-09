import {Layout, defaultCompare, Config} from '../../src'


function colRender (c) {
  return Config.Renderer.h('div', {className: c._internal.options.col}, [c.render()])
}

export default function (html, props, components) {
  return Config.Renderer.h(html, props, [
    Config.Renderer.h('div.row', {}, components.sort(defaultCompare).map(colRender))
  ])
}


// export default class ColumnsLayout extends Layout {
//
//   render(html, props, children) {
//     return Layout.h(html, props, [
//       Layout.h('div.row', {}, this.renderChildren(children))
//     ])
//   }
//
//   renderChildren(children) {
//     return children.sort(this.compare).map(c => {
//       const colCls = c.options.col
//       return Layout.h('div', {'class': colCls}, [c.render()])
//     })
//   }
// }
