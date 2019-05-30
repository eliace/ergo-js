import {Html} from '../core'

class List extends Html {
  static defaultOpts = {
    html: 'ul',
    defaultItem: {
      html: 'li'
    }
  }
}

export default List
