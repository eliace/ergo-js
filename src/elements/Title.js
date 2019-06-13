import {Html} from '../core'


class Subtitle extends Html {
  static defaultOpts = {
    as: 'subtitle'
  }
}

class Title extends Html {

  static defaultOpts = {
    as: 'title'
  }

  static Subtitle = Subtitle
}


export default Title
