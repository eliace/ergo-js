import {Html} from '../../src'
//import 'font-awesome/scss/font-awesome.scss'

class Icon extends Html {

  config () {
    return {
      html: 'span',
      as: 'icon'
    }
  }

}


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
  //        o.components.content.merge({as: 'fa-'+v})
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

export default Icon