import {Html} from '../../src'


class Subtitle extends Html {
  config () {
    return {
      css: 'subtitle'
    }
  }
}

class Title extends Html {
  config () {
    return {
      css: 'title'
    }
  }
}

Title.Subtitle = Subtitle

export default Title
