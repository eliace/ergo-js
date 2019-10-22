import {Html} from 'ergo-js-core'

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
      html: 'testarea',
      css: 'textarea'
    }
  }
}
