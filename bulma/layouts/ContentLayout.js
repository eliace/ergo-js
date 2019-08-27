import {Config, defaultCompare, defaultRender} from '../../src'
//import {h} from 'maquette'

export default function (html, props, components) {
  return Config.Renderer.h(html+'.content', props, components.sort(defaultCompare).map(defaultRender))
}


// class ContentLayout extends Layout {
//
//   render(html, props, children) {
//     return Layout.h(html+'.content', props, this.combine(children.sort(this.compare)))
//   }
// }
//
// export default ContentLayout
