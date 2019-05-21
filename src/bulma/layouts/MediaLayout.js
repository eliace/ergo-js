import {Layout} from '../../core'
import {h} from 'maquette'

class MediaLayout extends Layout {

  render(c) {
    const content = []
    let left = null
    let right = null
    c.children.forEach(child => {
      if (child.options.mediaLeft) {
        left = child
      }
      else if (child.options.mediaRight) {
        right = child
      }
      else {
        content.push(child)
      }
    })
    const sorted = content.sort(this.compare)
    if (left == null) {
      left = sorted.shift()
    }
    if (right == null) {
      right = sorted.pop()
    }
    return h(c.html+'.media', c.props, [
      h('div.media-left', [left.render()]),
      h('div.media-content', this.combine(sorted)),
      h('div.media-right', [right.render()])
    ])
  }
}

export default MediaLayout
