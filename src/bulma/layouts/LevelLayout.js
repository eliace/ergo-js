import {Layout} from '../../core'
import {h} from 'maquette'

class LevelLayout extends Layout {

  render(c) {
    let centerItems = []
    let leftItems = []
    let rightItems = []
    c.children.forEach(child => {
      if (child.options.level == 'left') {
        leftItems.push(child)
      }
      else if (child.options.level == 'right') {
        rightItems.push(child)
      }
      else {
        centerItems.push(child)
      }
    })
    if (leftItems.length) {
      leftItems = [h('div.level-left', this.combine(leftItems))]
    }
    if (rightItems.length) {
      rightItems = [h('div.level-right', this.combine(rightItems))]
    }
    centerItems = this.combine(centerItems)
//    console.log(centerItems.length)
    return h(c.html+'.level', c.props, leftItems.concat(centerItems).concat(rightItems))
  }

  combine(children, level) {
    return children.sort(this.compare).map(child => h('div.level-item', [child.render()]))
  }
}

export default LevelLayout
