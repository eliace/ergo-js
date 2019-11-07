import {Config, defaultCompare, defaultRender} from 'chorda-core'
//import {h} from 'maquette'

export default function (h, html, props, components) {
  return h(html+'.content', props, components.sort(defaultCompare).map(defaultRender))
}


// class ContentLayout extends Layout {
//
//   render(html, props, children) {
//     return Layout.h(html+'.content', props, this.combine(children.sort(this.compare)))
//   }
// }
//
// export default ContentLayout
