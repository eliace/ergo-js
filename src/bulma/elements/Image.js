import {Html} from '../../core'

class Image extends Html {

  static defaultOpts = {
    html: 'figure',
    props: {
      class: 'image'
    },
    components: {
      content: {
        html: 'img'
      }
    }
  }

  static OPTIONS = {
    ...Html.OPTIONS,
    src: {
      set: function(v) {
//        console.log('src', v)
        this.$content.opt('src', v)//.components.content.merge({props: {src: v}})
      }
    }
  }

}

export default Image
