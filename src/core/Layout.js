import {h} from 'maquette'

const Layout = class {

  constructor(o={}) {
    this.options = o
  }

  render(html, props, children) {
//    return this.combine(c.children.sort(this.compare))
    // return {
    //   props: c.props,
    //   children: this.combine(c.children.sort(this.compare))
    // }

    return h(html, props, this.combine(children.sort(this.compare)))
  }

  // renderText(c) {
  //   return h(c.html, c.props, [c.text])
  // }

  combine(children) {
    return children.map(child => child.render())
  }

  compare(a, b) {
    const w1 = a.options.weight || 0
    const w2 = b.options.weight || 0
    if (w1 == w2) {
      const i1 = a.index || 0
      const i2 = b.index || 0
      return i1 - i2
    }
    return w1 - w2
  }

}

export default Layout
