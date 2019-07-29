import {Layout, defaultCompare} from '../../src'
//import {h} from 'maquette'

function itemRender (c) {
  return Layout.h('div.level-item', [c.render()])
}

export default function (html, props, components) {
  let left = components.filter(c => c.options.levelLeft)
  let right = components.filter(c => c.options.levelRight)
  let center = components.filter(c => !c.options.levelRight && !c.options.levelLeft)

  if (left.length > 0) {
    left = Layout.h('div.level-left', left.sort(defaultCompare).map(itemRender))
  }
  if (right.length > 0) {
    right = Layout.h('div.level-right', right.sort(defaultCompare).map(itemRender))
  }

  center = center.sort(defaultCompare).map(itemRender)

  return Layout.h(html+'.level', props, [left, ...center, right])
}


// class LevelLayout extends Layout {
//
//   render(html, props, children) {
//     let centerItems = []
//     let leftItems = []
//     let rightItems = []
//     children.forEach(child => {
//       if (child.options.levelLeft) {
//         leftItems.push(child)
//       }
//       else if (child.options.levelRight) {
//         rightItems.push(child)
//       }
//       else {
//         centerItems.push(child)
//       }
//     })
//     if (leftItems.length) {
//       leftItems = [h('div.level-left', this.combine(leftItems))]
//     }
//     if (rightItems.length) {
//       rightItems = [h('div.level-right', this.combine(rightItems))]
//     }
//     centerItems = this.combine(centerItems)
// //    console.log(centerItems.length)
//     return h(html+'.level', props, leftItems.concat(centerItems).concat(rightItems))
//   }
//
//   combine(children, level) {
//     return children.sort(this.compare).map(child => h('div.level-item', [child.render()]))
//   }
// }
//
// export default LevelLayout
