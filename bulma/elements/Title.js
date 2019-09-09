import {Html} from '../../src'


class Subtitle extends Html {
  static defaultOpts = {
    css: 'subtitle'
  }
}

class Title extends Html {

  static defaultOpts = {
    css: 'title'
  }

  static Subtitle = Subtitle
}


export default Title
