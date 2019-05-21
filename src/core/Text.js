

const Text = class {

  constructor(text) {
    this.options = {}
    this.props = {}
    this.value = text
  }

  render() {
    return this.value
  }

  set(k, v) {
    if (k == 'text') {
      this.value = v
    }
  }

}

export default Text
