import {Layout, defaultCompare, defaultRender} from '../../src'
//import {h} from 'maquette'

export default function (html, props, components) {
  let left = components.filter(c => c.options.__raw.mediaLeft)
  let right = components.filter(c => c.options.__raw.mediaRight)
  let center = components.filter(c => !c.options.__raw.mediaRight && !c.options.__raw.mediaLeft).sort(defaultCompare)

  return Layout.h(html+'.media', props, [
    left.length > 0 && Layout.sorted('div.media-left', null, left),
    Layout.sorted('div.media-content', null, center),
    right.length > 0 && Layout.sorted('div.media-right', null, right)
  ])
}

// class MediaLayout extends Layout {
//
//   render(html, props, children) {
//     const content = []
//     let left = null
//     let right = null
//     children.forEach(child => {
//       if (child.options.mediaLeft) {
//         left = child
//       }
//       else if (child.options.mediaRight) {
//         right = child
//       }
//       else {
//         content.push(child)
//       }
//     })
//     const sorted = content.sort(this.compare)
//     // if (left == null) {
//     //   left = sorted.shift()
//     // }
//     // if (right == null) {
//     //   right = sorted.pop()
//     // }
//     return h(html+'.media', props, [
//       left && h('div.media-left', [left.render()]),
//       h('div.media-content', this.combine(sorted)),
//       right && h('div.media-right', [right.render()])
//     ])
//   }
// }
//
// export default MediaLayout
