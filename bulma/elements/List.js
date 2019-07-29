import {Html} from '../../src'

class List extends Html {
  config () {
    return {
      html: 'ul',
      defaultItem: {
        html: 'li'
      }
    }
  }
}

export default List
