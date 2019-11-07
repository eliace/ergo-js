import {Html, Source, Layout} from 'chorda-core'
import {Layouts, Tabs, Button, Switch, getEl} from 'chorda-bulma'

import {Mutate} from '../helpers'


function withReactiveInputChecked (mixer) {
  mixer.mix({
    sources: {
      value: (ctx) => ctx.value || ''
    },
    $input: {
      onChange: function (e, {value}) {
        value.$value = e.target.checked
      },
      valueChanged: function (v) {
        if (this.el) {
          this.el.checked = v
        }
        else {
          this.opt('defaultValue', v)
        }
      },
      dom: { getEl }  
    }
  })
}



class ValueInput extends Html {
  config () {
    return {
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
}

class ValueText extends Html {
  config () {
    return {
      sources: {
        value: ''
      },
      html: 'p',
      valueChanged: Mutate.Text  
    }
  }
}
/*
class Switch extends Html {

  config () {
    return {
      sources: {
        view: {}
      },
      allJoined: function ({view}) {
        view.createEvent('click', {}, 'view')
      },
      layout: Layout.passthru,
      $input: {
        html: 'input',
        css: 'switch',
        type: 'checkbox',
        // onChange: function (e) {
        //   console.log(e)
        // },
        // value: ''
      },
      $content: {
        html: 'label',
        onClick: function (e, {view}) {
          view.actions.click(e)
        }
      }
    }
  }

  options () {
    return {
      selected: {
        initOrSet: function (v) {
          this.$input.opt('checked', v)
        }
      },
      value: {
        initOrSet: function (v) {
          this.sources.view.set(v) // перекладка
        }
      }
    }
  }

  // static defaultOpts = {
  //   layout: Layouts.PassThrough,
  //   components: {
  //     input: {
  //       html: 'input',
  //       css: 'switch',
  //       type: 'checkbox'
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
*/

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
        as: ValueInput,
        dataId: 'firstName',
        valueRef: 'data',
        placeholder: 'First Name'
      }, {
        as: ValueInput,
        dataId: 'middleName',
        valueRef: 'data',
        placeholder: 'Middle Name'
      }, {
        as: ValueInput,
        dataId: 'lastName',
        valueRef: 'data',
        placeholder: 'Last Name'
      }, {
        as: ValueText,
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
        as: Switch,
        mix: { withReactiveInputChecked },
        dataChanged: function (v) {
          // this.opts.text = v
          // this.opts.key = v
          this.opt('text', v)
          this.opt('key', v)
        },
        selectionChanged: function (v) {
          this.opt('value', v[this.opt('key')])
        },
        valueChanged: function (v) {
          // эмулируем onChange
          this.fire('onChange', {value: v})
        },
        onChange: function (e, {selection}) {
          selection.set(this.opt('key'), e.value)
        }
        // allJoined: function ({selection, value}) {
        //   value.on('changed', (e) => {
        //     selection.$toggle(this.opt('key'))
        //   })
        //   selection.on('changed', (e) => {

        //   })
        // }
        // onChange: function (e, {selection}) {
        //   debugger
        //   selection.$toggle(this.opt('key'))
        // },
        // selectionChanged: function (v) {
        //   this.opt('value', v[this.opt('key')])
        // }
      },
      $info: {
        sources: {
          value: (ctx, o) => ctx.selection
        },
        as: ValueText,
//        valueRef: 'selection',
        format: JSON.stringify,
        weight: 10
      }
    }]
  }
}
