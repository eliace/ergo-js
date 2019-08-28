import {Html} from '../../src'
import {Layouts, Button, IconBox, InputBox} from '../../bulma'

//import {ButtonWithIcon} from '../extensions'
import {Mixins} from '../helpers'


class Field extends Html {
  static defaultOpts = {
    as: 'field',
    dynamicComponents: {
      label: {
        html: 'label',
        as: 'label',
        weight: -100
      },
      body: {
        as: 'field-body'
      },
      help: {
        html: 'p',
        as: 'help',
        weight: 100
      }
    },
    defaultItem: {
      as: 'control'
    },
    components: {
      control: {
        as: 'control',
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
        this.opt('$items', v.map(v => {return {$content: v}}))
      }
    }
  }
}


class Fields extends Html {
  static defaultOpts = {
    as: 'field is-horizontal',
    dynamicComponents: {
      label: {
        as: 'field-label is-normal',
        weight: -100,
        components: {
          content: {
            html: 'label',
            as: 'label'
          }
        }
      }
    },
    components: {
      body: {
        as: 'field-body',
        defaultItem: {
          base: Field
        }
      }
    }
  }
  static OPTIONS = {
    fields: {
      initOrSet: function (v) {
        this.$body.opt('$items', v)
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
      base: Field,
      label: 'Button',
      control: {
        base: Button,
        mixins: [Mixins.Button.Icon],
        text: 'Press me',
        as: 'is-danger is-outlined',
        icon: 'fas fa-envelope'
      },
      help: {
        text: 'Some action',
        as: 'is-danger'
      }
    }, {
      layout: Layouts.Columns,
      defaultItem: {
        control: {
          base: InputBox,
          mixins: [Mixins.Input.LeftIcon]
        }
      },
      items: [{
        base: Field,
        label: 'First Name',
        control: {
          leftIcon: 'fas fa-user'
        }
      }, {
        base: Field,
        label: 'Last Name',
        control: {
          leftIcon: 'fas fa-user'
        }
      }, {
        base: Field,
        label: 'Middle Name',
        control: {
          leftIcon: 'fas fa-user'
        }
      }]
    }, {
      base: Fields,
      label: 'Full Name',
      fields: [{
        control: {
          base: InputBox,
          placeholder: 'First Name'
        }
      }, {
        control: {
          base: InputBox,
          placeholder: 'Middle Name'
        }
      }, {
        control: {
          base: InputBox,
          placeholder: 'Last Name'
        }
      }]
    }, {
      base: Fields,
      label: 'Actions',
      fields: [{
        as: 'has-addons',
        controls: [{
          base: Button,
          text: 'Alice'
        }, {
          base: Button,
          text: 'Bob'
        }, {
          base: Button,
          text: 'Charlie'
        }]
      }, {
//          as: 'has-addons has-addons-right',
        as: 'is-grouped is-grouped-right',
        controls: [{
          base: Button,
          text: 'Alice'
        }, {
          base: IconBox,
          as: 'is-normal',
          icon: 'fas fa-minus'
        }, {
          base: Button,
          text: 'Bob'
        }]
      }]
    }, {
      base: Field,
      as: 'is-horizontal',
      $body: {
        items: [{
          base: Field,
          as: 'is-horizontal',
          $label: {
            html: 'div',
            as: 'field-label is-normal',
            $content: {
              html: 'label',
              as: 'label',
              text: 'First Name'
            }
          },
          control: {
            base: InputBox
          }
        }, {
          base: Field,
          as: 'is-horizontal',
          $label: {
            html: 'div',
            as: 'field-label is-normal',
            $content: {
              html: 'label',
              as: 'label',
              text: 'Middle Name'
            }
          },
          control: {
            base: InputBox
          }
        }, {
          base: Field,
          as: 'is-horizontal',
          $label: {
            html: 'div',
            as: 'field-label is-normal',
            $content: {
              html: 'label',
              as: 'label',
              text: 'Last Name'
            }
          },
          control: {
            base: InputBox
          }
        }]
      }
    }]
  }
}
