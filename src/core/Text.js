import Layout from './Layout'

const Text = class {

  constructor(text, context) {
    this.options = {}
    this.props = {}
    this.text = text
    this.context = context
  }

  render() {
    return this.text
  }

  opt(k, v) {
    if (k == 'text') {
      this.text = v
    }
  }

  destroy () {
    if (this.parent) {
      if (this.index != null) {
        this.parent.removeItem(this)
      }
      else {
        this.parent.removeComponent(this)
      }
    }
    else if (this.parent !== false) {
      console.error('try to destroy detached child', this)
    }
  }

  tryDestroy () {
    this.destroy()
  }

}

export default Text
