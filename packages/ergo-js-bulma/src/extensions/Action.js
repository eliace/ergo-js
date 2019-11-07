import {Html} from 'chorda-core'
import {IconBox} from '../elements'

class Action extends Html {
    config () {
      return {
        html: 'a',
        css: 'is-action',
        components: {
          icon: false
        },
        $icon: {
          as: IconBox,
          weight: -10,
          css: 'is-before'
        },
        $content: {
          html: 'span',
          renderIfEmpty: false
        }
      }
    }
    properties () {
      return {
        icon: {
          set: function (v) {
            this.opt('components', {icon: v})
          }
        }
      }
    }
}

export default Action
  