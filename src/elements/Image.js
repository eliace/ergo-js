import {Html} from '../core'

class Image extends Html {

  config () {
    return {
      html: 'figure',
      as: 'image',
      $content: {
        html: 'img'
      }
    }
  }

  configOptions () {
    return {
      src: {
        initOrSet: function(v) {
  //        console.log('src', v)
          this.$content.opt('src', v)//.components.content.merge({props: {src: v}})
        }
      }
    }
  }

}

export default Image
