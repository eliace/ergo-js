import {Html, Layout, Source} from '../../src'

export default class Tags extends Html {
  static defaultOpts = {
    html: 'ul',
    css: 'tag-list',
    defaultItem: {
      html: 'li',
      css: 'tag-pill tag-default'
    }
  }
}
