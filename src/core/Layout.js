import {h} from 'maquette'
import {defaultRender, defaultCompare} from './Utils'

function simple (html, props, children) {
  return h(html, props, children.map(defaultRender))
}

function sorted (html, props, children) {
  return h(html, props, children.sort(defaultCompare).map(defaultRender))
}

function passthru (html, props, children) {
  return children.map(defaultRender)
}

export default {h, passthru, sorted, simple}


// const Layout = class {
//
//   constructor(o={}) {
//     this.options = o
//   }
//
//   render(html, props, children) {
// //    return this.combine(c.children.sort(this.compare))
//     // return {
//     //   props: c.props,
//     //   children: this.combine(c.children.sort(this.compare))
//     // }
//
//     return h(html, props, this.combine(children.sort(this.compare)))
//   }
//
//   // renderText(c) {
//   //   return h(c.html, c.props, [c.text])
//   // }
//
//   combine(children) {
//     return children.map(child => child.render ? child.render() : child)
//   }
//
//   compare(a, b) {
//     const w1 = a.options.weight || 0
//     const w2 = b.options.weight || 0
//     if (w1 == w2) {
//       const i1 = a.index || 0
//       const i2 = b.index || 0
//       return i1 - i2
//     }
//     return w1 - w2
//   }
//
//   // h (selector, props, children) {
//   //   return h(selector, props, children)
//   // }
//
// //  static h = h
// }
//
// Layout.h = h
//
// class Passthrough extends Layout {
//
//   render(html, props, children) {
//     return this.combine(children)
//   }
//
// }
//
// Layout.Passthru = Passthrough
//
// export default Layout
