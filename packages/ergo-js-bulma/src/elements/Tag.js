import {Html} from 'ergo-js-core'

export default class Tag extends Html {
  config () {
    return {
      html: 'span',
      css: 'tag'
    }
  }
}
