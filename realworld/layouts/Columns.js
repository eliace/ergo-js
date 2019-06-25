import {Layout} from '../../src'

export default class ColumnsLayout extends Layout {

  render(html, props, children) {
    return Layout.h(html, props, [
      Layout.h('div.row', {}, this.renderChildren(children))
    ])
  }

  renderChildren(children) {
    return children.sort(this.compare).map(c => {
      const colCls = c.options.col
      return Layout.h('div', {'class': colCls}, [c.render()])
    })
  }
}
