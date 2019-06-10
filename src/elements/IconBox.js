import {Html} from '../core'


class Icon extends Html {
  static defaultOpts = {
    html: 'i'
  }
  static OPTIONS = {
    text: {
      initOrSet: function (v) {
        const classes = {}
        v.split(' ').forEach(c => classes[c] = true)
        this.opt('classes', classes)
      }
    }
  }
}


class IconBox extends Html {
  static defaultOpts = {
    html: 'span',
    class: 'icon',
    components: {
      content: {
        type: Icon
      }
    }
  }
  static OPTIONS = {
    icon: {
      initOrSet: function (v) {
//        debugger
        this.$content.opt('text', v)
      }
    }
  }
}


IconBox.Icon = Icon

export default IconBox
