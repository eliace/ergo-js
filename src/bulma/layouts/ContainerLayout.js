import {Layout} from '../../core'
import {h} from 'maquette'

class ContainerLayout extends Layout {

  render(html, props, children) {
    console.log('container', props)
    const wrapper = h('div.container', this.combine(children.sort(this.compare)))
    return h(html, props, [wrapper])
  }
}

export default ContainerLayout
