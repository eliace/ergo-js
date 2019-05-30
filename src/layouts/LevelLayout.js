import {Layout} from '../core'
import {h} from 'maquette'

class LevelLayout extends Layout {

  render(html, props, children) {
    let centerItems = []
    let leftItems = []
    let rightItems = []
    children.forEach(child => {
      if (child.options.levelLeft) {
        leftItems.push(child)
      }
      else if (child.options.levelRight) {
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
    return h(html+'.level', props, leftItems.concat(centerItems).concat(rightItems))
  }

  combine(children, level) {
    return children.sort(this.compare).map(child => h('div.level-item', [child.render()]))
  }
}

export default LevelLayout
