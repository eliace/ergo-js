import {Tag, Html, Layouts, IconBox} from '../../src'

const Mixins = {
  LeftIcon: function () {
    return {
      classes: {'has-icons-left': true},
      components: {
        leftIcon: {
          type: IconBox,
          as: 'is-small is-left',
        }
      }
    }
  },
  RightIcon: function () {
    return {
      classes: {'has-icons-right': true},
      components: {
        rightIcon: {
          type: IconBox,
          as: 'is-small is-right',
        }
      }
    }
  }
}




class Input extends Html {
  static defaultOpts = {
    html: 'input',
    as: 'input'
  }
}

class Field extends Html {
  static defaultOpts = {
    as: 'field',
    components: {
      control: {
        as: 'control'
      }
    }
  }
  static OPTIONS = {
    control: {
      sugar: function (o, preparedOpts) {
        preparedOpts.merge({
          components: {
            control: {
              components: {
                content: o
              }
            }
          }
        })
      }
    },
    loading: {
      initOrSet: function (v) {
        this.$control.opt('classes', {'is-loading': v})
      }
    }
  }
  static Mixins = Mixins
}



class Header extends Html {
  static defaultOpts = {
    layout: Layouts.Content,
    components: {
      content: {
        html: 'h4'
      }
    }
  }
}


export default (projector) => {
  return {
    items: [{
      html: 'input',
      as: 'input'
    }, {
      sources: {
        data: 'aaa'
      },
      as: 'input-box',
      $content: {
        html: 'input',
        as: 'input',
        weight: 20,
        onKeyDown: function () {
//          return false
        },
        onInput: function (e) {
          console.log(e)
//          console.log(e.target.value)
//          this.sources.data.set(this.sources.data.get()+e.key)
          this.sources.data.set(e.target.value)
//          this.sources.data.set(this.sources.data.get())
         //  e.stopImmediatePropagation()
         //  e.preventDefault()
         // return false
        },
        dataChanged: function (v) {
          this.opt('value', v)
        }
      },
      $placeholder: {
        as: 'placeholder',
        weight: 10
      },
      defaultItem: {
        type: Tag
      },
//      items: [1,2,3,4,5,6,7,8,9,0].map(itm => 'Helloodffdfgfsdgf'),
      pattern: '+7 (000) 000 00 00',
      dataChanged: function (v) {
        this.$placeholder.opt('text', v + this.options.pattern.substr(v.length))
      }
    }, {
      $title: {
        type: Header,
        text: 'Colors'
      },
      defaultItem: {
        type: Field,
        width: 400,
        control: {
          type: Input,
          placeholder: 'Input text here...'
        }
      },
      items: [
        {control: {as: 'is-primary'}},
        {control: {as: 'is-info'}},
        {control: {as: 'is-success'}},
        {control: {as: 'is-warning'}},
        {control: {as: 'is-danger'}}
      ]
    }, {
      $title: {
        type: Header,
        text: 'Sizes'
      },
      defaultItem: {
        type: Field,
        width: 400,
        control: {
          type: Input,
          placeholder: 'Input text here...'
        }
      },
      items: [
        {control: {as: 'is-small'}},
        {},
        {control: {as: 'is-medium'}},
        {control: {as: 'is-large'}}
      ]
    }, {
      $title: {
        type: Header,
        text: 'Styles'
      },
      items: [{
        type: Field,
        width: 400,
        control: {
          type: Input,
          placeholder: 'Input text here...',
          as: 'is-rounded'
        }
      }]
    }, {
      $title: {
        type: Header,
        text: 'States'
      },
      defaultItem: {
        type: Field,
        width: 400,
        control: {
          type: Input
        }
      },
      items: [
        {control: {placeholder: 'Normal input'}},
        {control: {placeholder: 'Hover input', as: 'is-hovered'}},
        {control: {placeholder: 'Focus input', as: 'is-focused'}},
        {control: {placeholder: 'Loading input'}, loading: true},
        {control: {placeholder: 'Disabled input', disabled: true}},
        {control: {value: 'Read only', readOnly: true}},
        {control: {value: 'Static text', as: 'is-static'}},
      ]
    }, {
      $title: {
        type: Header,
        text: 'Icons'
      },
      defaultItem: {
        type: Field,
        width: 400,
        control: {
          type: Input,
          placeholder: 'Input text here...'
        }
      },
      items: [{
        $control: {
          mixins: [Mixins.LeftIcon, Mixins.RightIcon],
          $leftIcon: {
//            mixins: [Mixins.Fas],
            icon: 'fas fa-envelope'
          },
          $rightIcon: {
//            mixins: [Mixins.Fas],
            icon: 'fas fa-check'
          }
        }
      }]
    }]
  }
}
