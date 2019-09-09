import {Html} from '../../src'
import {Layouts, Button, IconBox, InputBox} from '../../bulma'

//import {ButtonWithIcon} from '../extensions'
import {Mixins} from '../helpers'


class Field extends Html {
  static defaultOpts = {
    css: 'field',
    dynamicComponents: {
      label: {
        html: 'label',
        css: 'label',
        weight: -100
      },
      body: {
        css: 'field-body'
      },
      help: {
        html: 'p',
        css: 'help',
        weight: 100
      }
    },
    defaultItem: {
      css: 'control'
    },
    components: {
      control: {
        css: 'control',
        renderIfEmpty: false
      }
    }
  }

  static OPTIONS = {
    control: {
      initOrSet: function (v) {
        this.$control.addComponent('content', v)
      }
    },
    label: {
      initOrSet: function (v) {
        this.addComponent('label', v)
      }
    },
    help: {
      initOrSet: function (v) {
        this.addComponent('help', v)
      }
    },
    controls: {
      initOrSet: function (v) {
        this.opt('items', v.map(v => {return {$content: v}}))
      }
    }
  }
}


class Fields extends Html {
  static defaultOpts = {
    css: 'field is-horizontal',
    dynamicComponents: {
      label: {
        css: 'field-label is-normal',
        weight: -100,
        components: {
          content: {
            html: 'label',
            css: 'label'
          }
        }
      }
    },
    components: {
      body: {
        css: 'field-body',
        defaultItem: {
          as: Field
        }
      }
    }
  }
  static OPTIONS = {
    fields: {
      initOrSet: function (v) {
        this.$body.opt('items', v)
      }
    },
    label: {
      initOrSet: function (v) {
        this.addComponent('label', v)
      }
    }
  }
}



export default () => {
  return {
    layout: Layouts.Rows,
//    width: 500,
    items: [{
      as: Field,
      label: 'Button',
      control: {
        as: Button,
        mixins: [Mixins.Button.Icon],
        text: 'Press me',
        css: 'is-danger is-outlined',
        icon: 'fas fa-envelope'
      },
      help: {
        text: 'Some action',
        css: 'is-danger'
      }
    }, {
      layout: Layouts.Columns,
      defaultItem: {
        control: {
          as: InputBox,
          mixins: [Mixins.Input.LeftIcon]
        }
      },
      items: [{
        as: Field,
        label: 'First Name',
        control: {
          leftIcon: 'fas fa-user'
        }
      }, {
        as: Field,
        label: 'Last Name',
        control: {
          leftIcon: 'fas fa-user'
        }
      }, {
        as: Field,
        label: 'Middle Name',
        control: {
          leftIcon: 'fas fa-user'
        }
      }]
    }, {
      as: Fields,
      label: 'Full Name',
      fields: [{
        control: {
          as: InputBox,
          placeholder: 'First Name'
        }
      }, {
        control: {
          as: InputBox,
          placeholder: 'Middle Name'
        }
      }, {
        control: {
          as: InputBox,
          placeholder: 'Last Name'
        }
      }]
    }, {
      as: Fields,
      label: 'Actions',
      fields: [{
        css: 'has-addons',
        controls: [{
          as: Button,
          text: 'Alice'
        }, {
          as: Button,
          text: 'Bob'
        }, {
          as: Button,
          text: 'Charlie'
        }]
      }, {
//          css: 'has-addons has-addons-right',
        css: 'is-grouped is-grouped-right',
        controls: [{
          as: Button,
          text: 'Alice'
        }, {
          as: IconBox,
          css: 'is-normal',
          icon: 'fas fa-minus'
        }, {
          as: Button,
          text: 'Bob'
        }]
      }]
    }, {
      as: Field,
      css: 'is-horizontal',
      $body: {
        items: [{
          as: Field,
          css: 'is-horizontal',
          $label: {
            html: 'div',
            css: 'field-label is-normal',
            $content: {
              html: 'label',
              css: 'label',
              text: 'First Name'
            }
          },
          control: {
            as: InputBox
          }
        }, {
          as: Field,
          css: 'is-horizontal',
          $label: {
            html: 'div',
            css: 'field-label is-normal',
            $content: {
              html: 'label',
              css: 'label',
              text: 'Middle Name'
            }
          },
          control: {
            as: InputBox
          }
        }, {
          as: Field,
          css: 'is-horizontal',
          $label: {
            html: 'div',
            css: 'field-label is-normal',
            $content: {
              html: 'label',
              css: 'label',
              text: 'Last Name'
            }
          },
          control: {
            as: InputBox
          }
        }]
      }
    }]
  }
}
