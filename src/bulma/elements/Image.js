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
      init: function(v, o) {
        o.components.content.merge({props: {src: v}})
      }
    }
  }

}

export default Image
