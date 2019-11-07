
export default class Text {

  constructor(text, context) {
    this.context = context
    this.props = {}
    this.dom = {props: this.props}
    if (typeof text === 'string') {
      this.options = {}
      this.dom.text = text
    }
    else {
      this.options = text
      this.dom.text = text.text
    }
  }

  render() {
    return this.dom.text
  }

  opt(k, v) {
    if (k == 'text') {
      this.dom.text = v
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

//export default Text
