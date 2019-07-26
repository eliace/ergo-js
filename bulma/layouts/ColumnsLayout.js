import {Layout, defaultCompare} from '../../src'
//import {h} from 'maquette'

function columnRender (comp, i) {
  return Layout.h('div.column', {class: comp.options.column, key: i}, [comp.render()])
}

export default function (html, props, components) {
  return Layout.h(html+'.columns', props, components.sort(defaultCompare).map(columnRender))
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
