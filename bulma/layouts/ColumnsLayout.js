import {Layout, defaultCompare, Config} from '../../src'
//import {h} from 'maquette'

function columnRender (comp, i) {
  return Config.h('div.column', {className: comp.options.__raw.column, key: i}, [comp.render()])
}

export default function (html, props, components) {
  return Config.h(html+'.columns', props, components.sort(defaultCompare).map(columnRender))
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
