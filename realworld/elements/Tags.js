import {Html, Layout, Source} from '../../src'

export default class Tags extends Html {
  static defaultOpts = {
    html: 'ul',
    as: 'tag-list',
    defaultItem: {
      html: 'li',
      as: 'tag-pill tag-default'
    }
  }
}
