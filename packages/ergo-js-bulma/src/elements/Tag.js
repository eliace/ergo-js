import {Html} from 'chorda-core'

export default class Tag extends Html {
  config () {
    return {
      html: 'span',
      css: 'tag'
    }
  }
}
