import {Layout} from '../../core'
import {h} from 'maquette'

class ContainerLayout extends Layout {

  render(c) {
    const wrapper = h('div.container', this.combine(c.children.sort(this.compare)))
    return h(c.html, c.props, [wrapper])
  }
}

export default ContainerLayout
