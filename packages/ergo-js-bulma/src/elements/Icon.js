import {Html} from 'chorda-core'
//import 'font-awesome/scss/font-awesome.scss'

class Icon extends Html {

  config () {
    return {
      html: 'span',
      css: 'icon'
    }
  }

  properties () {
    return {
      text: {
        initOrSet: function(v, prev) {
          this.opt('classes', {[v]: true, [prev]: false})
        }
      }
    }
  }

}

/*
class FaIcon extends Icon {

  config () {
    return {
      $content: {
        html: 'i.fa'
      }
    }
  }

  configOptions () {
    return {
      text: {
        set: function(v) {
          this.$content.opt('as', ['fa-'+v])
  //        o.components.content.merge({css: 'fa-'+v})
        }
      },
      icon: {
        initOrSet: function (v) {
          this.$content.opt('classes', {['fa-'+v]: true})
        }
      }
    }
  }
}

Icon.Fa = FaIcon
*/
export default Icon
