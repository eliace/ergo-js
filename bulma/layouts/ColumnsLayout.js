import {Layout, defaultCompare, Config} from '../../src'
//import {h} from 'maquette'

function columnRender (comp, i) {
  return Config.Renderer.h('div.column', {className: comp.options.column, key: i}, [comp.render()])
}

export default function (html, props, components) {
  return Config.Renderer.h(html+'.columns', props, components.sort(defaultCompare).map(columnRender))
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
