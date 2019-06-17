import {Html, Layouts, Tabs, Source, Button} from '../../src'

import {Mutate} from '../helpers'


class VmInput extends Html {
  static defaultOpts = {
    sources: {
      vm: ''
    },
    html: 'input',
    onInput: function (e) {
      this.sources.vm.set(e.target.value)
    },
    vmChanged: Mutate.Value
  }
}

class VmText extends Html {
  static defaultOpts = {
    sources: {
      vm: ''
    },
    html: 'p',
    vmChanged: Mutate.Text
  }
}

class Switch extends Html {
  static defaultOpts = {
    layout: Layouts.PassThrough,
    components: {
      input: {
        html: 'input',
        as: 'switch',
        _type: 'checkbox'
      },
      content: {
        html: 'label',
        onClick: function (e) {
          this.rise('handleClick', e)
        }
      }
    }
  }
  static OPTIONS = {
    selected: {
      initOrSet: function (v) {
        this.$input.opt('checked', v)
      }
    }
  }

  handleClick (e) {
    if (this.options.onClick) {
      this.options.onClick.call(this, e)
    }
    return false
  }
}


export default (projector) => {
  return {
    layout: Layouts.Rows,
    items: [{
      sources: {
        data: {
          firstName: '',
          middleName: '',
          lastName: '',
        },
        vm: true
      },
      vmRef: 'data',
      items: [{
        type: VmInput,
        vmId: 'firstName',
        placeholder: 'First Name'
      }, {
        type: VmInput,
        vmId: 'middleName',
        placeholder: 'Middle Name'
      }, {
        type: VmInput,
        vmId: 'lastName',
        placeholder: 'Last Name'
      }, {
        type: VmText,
        format: JSON.stringify
      }]
    }, {
      sources: {
        data: ['Alice', 'Bob', 'Charlie'],
        selection: {}
      },
      dataChanged: Mutate.Items,
      defaultItem: {
        type: Switch,
        dataChanged: function (v) {
          this.opts.text = v
          this.opts.key = v
          // this.opt('text', v)
          // this.opt('key', v)
        },
        onClick: function () {
          this.sources.selection.toggle(this.opts.key)//this.opt('key'))
        },
        selectionChanged: function (v) {
          this.opt('selected', v[this.opts.key])//v[this.opt('key')])
        }
      },
      $info: {
        type: VmText,
        vmRef: 'selection',
        format: JSON.stringify,
        weight: 10
      }
    }]
  }
}
