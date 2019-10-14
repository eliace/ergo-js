import {Html} from 'ergo-js-core'

class Image extends Html {

  config () {
    return {
      html: 'figure',
      css: 'image',
      $content: {
        html: 'img'
      }
    }
  }

  configOptions () {
    return {
      src: {
        initOrSet: function(v) {
          this.$content.opt('src', v)
        }
      },
      text: {
        initOrSet: function(v) {
          this.$content.opt('src', v)
        }
      },
      rounded: {
        initOrSet: function (v) {
          this.$content.opt('classes', {'is-rounded': v})
        }
      }
    }
  }

}

export default Image
