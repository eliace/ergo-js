import {Layout, Config} from 'ergo-js-core'
//import {h} from 'maquette'

export default function (h, html, props, components) {
  return h(html, props, [Layout.sorted('div.container', null, components)])
}


// class ContainerLayout extends Layout {
//
//   render(html, props, children) {
//     console.log('container', props)
//     const wrapper = h('div.container', this.combine(children.sort(this.compare)))
//     return h(html, props, [wrapper])
//   }
// }
//
// export default ContainerLayout
