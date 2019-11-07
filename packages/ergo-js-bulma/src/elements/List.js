import {Html} from 'chorda-core'

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
