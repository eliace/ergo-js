import {Html} from '../core'
import 'font-awesome/scss/font-awesome.scss'

class Icon extends Html {

  static defaultOpts = {
    html: 'span',
    props: {
      class: 'icon'
    }
  }

}


class FaIcon extends Icon {
  static defaultOpts = {
    components: {
      content: {
        html: 'i.fa'
      }
    }
  }
  static OPTIONS = {
    text: {
      set: function(v) {
        this.$content.opt('as', ['fa-'+v])
//        o.components.content.merge({as: 'fa-'+v})
      }
    }
  }
}

Icon.Fa = FaIcon

export default Icon
