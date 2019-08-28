import {Config, defaultCompare} from '../../src'
//import {h} from 'maquette'

function rowRender (comp, i) {
  return Config.Renderer.h('div.row', {className: comp.options.row, key: i}, [comp.render()])
}

export default function (html, props, components) {
  return Config.Renderer.h(html+'.rows', props, components.sort(defaultCompare).map(rowRender))
}

// export default class RowsLayout extends Layout {
//
//   render(html, props, children) {
//     return h(html+'.rows', props, this.combine(children))
//   }
//
//   combine(children) {
//     return children.sort(this.compare).map((child, i) => h('div.row', {class: child.options.row, key: i}, [child.render()]))
//   }
//
// }
