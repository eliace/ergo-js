import {Html} from 'chorda-core'

export class Input extends Html {
  config () {
    return {
      html: 'input',
      css: 'input'
    }
  }
}


export class Textarea extends Html {
  config () {
    return {
      html: 'textarea',
      css: 'textarea'
    }
  }
}
