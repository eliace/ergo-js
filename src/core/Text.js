import Layout from './Layout'

const Text = class {

  constructor(text) {
    this.options = {__raw: {}}
    this.props = {}
    this.value = text
  }

  render() {
    return this.value
  }

  opt(k, v) {
    if (k == 'text') {
      this.value = v
    }
  }

  destroy () {

  }

  tryDestroy () {

  }

}

export default Text
