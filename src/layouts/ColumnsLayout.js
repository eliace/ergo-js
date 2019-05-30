import {Layout} from '../core'
import {h} from 'maquette'

export default class ColumnsLayout extends Layout {

  render(html, props, children) {
    return h(html+'.columns', props, this.combine(children))
  }

  combine(children) {
    return children.sort(this.compare).map((child, i) => h('div.column', {class: child.options.column, key: i}, [child.render()]))
  }

}
