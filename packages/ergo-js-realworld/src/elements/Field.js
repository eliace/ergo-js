import {Html, Layout, Source} from '../../src'


class Field extends Html {
  static defaultOpts = {
    html: 'fieldset',
    css: 'form-group',
    components: {
      control: {
        css: 'form-control'
      }
    }
  }
  static OPTIONS = {
    placeholder: {
      initOrSet: function (v) {
        this.$control.opt('placeholder', v)
      }
    },
    type: {
      initOrSet: function (v) {
        this.$control.opt('type', v)
      }
    },
    size: {
      initOrSet: function (v) {
        this.$control.opt('classes', {['form-control-'+v]: true})
      }
    },
    rows: {
      initOrSet: function (v) {
        this.$control.opt('rows', v)
      }
    }
  }
}


class TextAreaField extends Field {
  static defaultOpts = {
    components: {
      control: {
        html: 'textarea'
      }
    }
  }
}

class InputField extends Field {
  static defaultOpts = {
    components: {
      control: {
        html: 'input',
        type: 'text',
        onInput: function (e) {
          this.sources.data.set(e.target.value)
        },
        dataChanged: function (v) {
          this.opt('value', v)
        }
      }
    }
  }
}

Field.TextArea = TextAreaField
Field.Input = InputField


export default Field
