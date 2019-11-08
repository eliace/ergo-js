import {Html, Layout, Source} from 'chorda-core'
import {getEl} from '../utils'


class Field extends Html {
  config () {
    return {
      html: 'fieldset',
      css: 'form-group',
      $control: {
        css: 'form-control'
      }
    }
  }
  options () {
    return {
      placeholder: {
        set: function (v) {
          this.$control.opt('placeholder', v)
        }
      },
      type: {
        set: function (v) {
          this.$control.opt('type', v)
        }
      },
      size: {
        set: function (v) {
          this.$control.opt('classes', {['form-control-'+v]: true})
        }
      },
      rows: {
        set: function (v) {
          this.$control.opt('rows', v)
        }
      }  
    }
  }
}


class TextAreaField extends Field {
  config () {
    return {
      $control: {
        html: 'textarea'
      }
    }
  }
}

class InputField extends Field {
  config () {
    return {
      scope: {
        data: ctx => ctx.data || ''
      },
      $control: {
        html: 'input',
        type: 'text',
        dom: { getEl },
        onInput: function (e, {data}) {
          data.$set(e.target.value)
        },
        dataChanged: function (v) {
          if (this.el) {
            this.el.value = v
          }
          else {
            this.opt('defaultValue', v)
          }
        }
      }
    }
  }
}

Field.TextArea = TextAreaField
Field.Input = InputField


export default Field
