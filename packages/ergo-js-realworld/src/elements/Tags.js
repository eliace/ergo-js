import {Html, Layout, Source} from 'chorda-core'

export default class Tags extends Html {
  config () {
    return {
      html: 'ul',
      css: 'tag-list',
      defaultItem: {
        html: 'li',
        css: 'tag-pill tag-default'
      }  
    }
  }
}
