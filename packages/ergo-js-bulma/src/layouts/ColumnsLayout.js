import {Layout, defaultCompare, Config} from 'chorda-core'
//import {h} from 'maquette'

// function columnRender (comp, i) {
//   return Config.Renderer.h('div.column', {className: comp.options.column, key: i}, [comp.render()])
// }

export default function (h, html, props, components) {
  return h(html+'.columns', props, components.sort(defaultCompare).map((comp, i) => {
    return h('div.column', {className: comp.options.column, key: i}, [comp.render()])
  }))
}


// export default class ColumnsLayout extends Layout {
//
//   render(html, props, children) {
//     return h(html+'.columns', props, this.combine(children))
//   }
//
//   combine(children) {
//     return children.sort(this.compare).map((child, i) => h('div.column', {class: child.options.column, key: i}, [child.render()]))
//   }
//
// }
