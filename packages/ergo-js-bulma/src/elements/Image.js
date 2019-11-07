import {Html} from 'chorda-core'

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

  properties () {
    return {
      src: {
        set: function(v) {
          this.$content.opt('src', v)
        }
      },
      text: {
        set: function(v) {
          this.$content.opt('src', v)
        }
      },
      rounded: {
        set: function (v) {
          this.$content.opt('classes', {'is-rounded': v})
        }
      }
    }
  }

}

export default Image
