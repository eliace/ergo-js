import {Layout, defaultCompare, Config} from 'chorda-core'


export default function (h, html, props, components) {
  return h(html, props, [
    h('div.row', {}, components.sort(defaultCompare).map(c => {
      return h('div', {className: c.options.col}, [c.render()])
    }))
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
