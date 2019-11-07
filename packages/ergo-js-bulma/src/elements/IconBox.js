import {Html} from 'chorda-core'


class Icon extends Html {

  config () {
    return {
      html: 'i'
    }
  }

  properties () {
    return {
      text: {
        set: function (v) {
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
      css: 'icon',
      $content: {
        as: Icon
      }
    }
  }

  // options () {
  //   return {
  //     icon: {
  //       initOrSet: function (v) {
  //         this.$content.opt('text', v)
  //       }
  //     }
  //   }
  // }

  properties () {
    return {
      icon: {
        set: function (v) {
          this.$content.opt('text', v)
        }
      }
    }
  }

}


IconBox.Icon = Icon

export default IconBox
