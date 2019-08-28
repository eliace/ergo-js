import {Html} from '../../src'


class Icon extends Html {

  config () {
    return {
      html: 'i'
    }
  }

  configOptions () {
    return {
      text: {
        initOrSet: function (v) {
          const classes = {}
          v.split(' ').forEach(c => classes[c] = true)
          this.opt('classes', classes)
        }
      }
    }
  }

}


class IconBox extends Html {

  config () {
    return {
      html: 'span',
      as: 'icon',
      $content: {
        base: Icon
      }
    }
  }

  configOptions () {
    return {
      icon: {
        initOrSet: function (v) {
          this.$content.opt('text', v)
        }
      }
    }
  }

}


IconBox.Icon = Icon

export default IconBox
