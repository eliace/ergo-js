import {Layout} from '../core'
import {h} from 'maquette'

export default class RowsLayout extends Layout {

  render(html, props, children) {
    return h(html+'.rows', props, this.combine(children))
  }

  combine(children) {
    return children.sort(this.compare).map((child, i) => h('div.row', {class: child.options.row, key: i}, [child.render()]))
  }

}
