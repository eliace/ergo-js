import {Html, Source, Layout} from '../../src'
import {Layouts, Tabs, Button} from '../../bulma'

import {Mutate} from '../helpers'


class ValueInput extends Html {
  static defaultOpts = {
    sources: {
      value: ''
    },
    html: 'input',
    onChange: function (e, {value}) {
      value.set(e.target.value)
    },
    valueChanged: Mutate.Value
  }
}

class ValueText extends Html {
  static defaultOpts = {
    sources: {
      value: ''
    },
    html: 'p',
    valueChanged: Mutate.Text
  }
}

class Switch extends Html {

  config () {
    return {
      sources: {
        view: {}
      },
      allBound: function ({view}) {
        view.$event('click', this)
      },
      layout: Layout.passthru,
      $input: {
        html: 'input',
        as: 'switch',
        _type: 'checkbox',
        // onChange: function (e) {
        //   console.log(e)
        // },
        // value: ''
      },
      $content: {
        html: 'label',
        onClick: function (e, {view}) {
          view.click(e)
        }
      }
    }
  }

  configOptions () {
    return {
      selected: {
        initOrSet: function (v) {
          this.$input.opt('checked', v)
        }
      },
      value: {
        initOrSet: function (v) {
          this.domains.view.set(v) // перекладка
        }
      }
    }
  }

  // static defaultOpts = {
  //   layout: Layouts.PassThrough,
  //   components: {
  //     input: {
  //       html: 'input',
  //       as: 'switch',
  //       _type: 'checkbox'
  //     },
  //     content: {
  //       html: 'label',
  //       onClick: function (e) {
  //         this.rise('handleClick', e)
  //       }
  //     }
  //   }
  // }
  // static OPTIONS = {
  //   selected: {
  //     initOrSet: function (v) {
  //       this.$input.opt('checked', v)
  //     }
  //   }
  // }
  //
  // handleClick (e) {
  //   if (this.options.onClick) {
  //     this.options.onClick.call(this, e)
  //   }
  //   return false
  // }
}


export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      sources: {
        data: {
          firstName: '',
          middleName: '',
          lastName: '',
        },
        value: true
      },
      items: [{
        base: ValueInput,
        dataId: 'firstName',
        valueRef: 'data',
        placeholder: 'First Name'
      }, {
        base: ValueInput,
        dataId: 'middleName',
        valueRef: 'data',
        placeholder: 'Middle Name'
      }, {
        base: ValueInput,
        dataId: 'lastName',
        valueRef: 'data',
        placeholder: 'Last Name'
      }, {
        base: ValueText,
        valueRef: 'data',
        format: JSON.stringify
      }]
    }, {
      sources: {
        data: ['Alice', 'Bob', 'Charlie'],
        selection: {}
      },
      dataChanged: Mutate.Items,
      defaultItem: {
        base: Switch,
        dataChanged: function (v) {
          // this.opts.text = v
          // this.opts.key = v
          this.opt('text', v)
          this.opt('key', v)
        },
        onClick: function (e, {selection}) {
          selection.toggle(this.opt('key'))
        },
        selectionChanged: function (v) {
          this.opt('selected', v[this.opt('key')])
        }
      },
      $info: {
        base: ValueText,
        valueRef: 'selection',
        format: JSON.stringify,
        weight: 10
      }
    }]
  }
}
