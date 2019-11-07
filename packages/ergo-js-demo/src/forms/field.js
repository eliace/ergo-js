import {Html, Text, Config, Layout} from 'chorda-core'
import {Layouts, Button, IconBox, Input as InputBox, Field} from 'chorda-bulma'

import {ButtonWithIcon} from '../extensions'
import {Mixins} from '../helpers'


class Fields extends Html {
  config () {
    return {
      css: 'field is-horizontal',
      components: {
        label: false
      },
      $label: {
        css: 'field-label is-normal',
        weight: -100,
        $content: {
          html: 'label',
          css: 'label'
        }
      },
      $body: {
        css: 'field-body',
        defaultItem: {
          as: Field
        }
      }
    }
  }
  properties () {
    return {
      fields: {
        set: function (v) {
          this.$body.opt('items', v)
        }
      },
      label: {
        set: function (v) {
          this.opt('components', {label: v})
        }
      }  
    }
  }
}


class HorizontalField extends Field {
  config () {
    return {
      css: 'is-horizontal',
      $label: {
        layout: Layout.wrapped,
        $wrapper: {
          css: 'field-label is-normal',
          weight: -100,  
        }
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
      label: {
        text: 'Button',
        css: 'has-text-danger'
      },
      control: {
        as: Button,
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
        as: Field,
        control: {
          as: InputBox
        }
      },
      items: [{
        label: 'First Name',
        leftIcon: 'fas fa-user'
      }, {
        label: 'Last Name',
        leftIcon: 'fas fa-user'
      }, {
        label: 'Middle Name',
        leftIcon: 'fas fa-user'
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
        defaultAddon: {
          as: Button
        },
        addons: [{
          text: 'Alice'
        }, {
          text: 'Bob'
        }, {
          text: 'Charlie'
        }]
      }, {
//          css: 'has-addons has-addons-right',
        css: 'is-grouped-right',
        defaultGroupItem: {
          as: Button,
        },
        group: [{
          text: 'Alice'
        }, {
          as: IconBox,
          css: 'is-medium',
          icon: 'fas fa-minus'
        }, {
          text: 'Bob'
        }]
      }]
    }, {
      as: Fields,
      fields: [{
        as: HorizontalField,
        label: 'First Name',
        control: {
          as: InputBox
        }
      }, {
        as: HorizontalField,
        label: 'Middle Name',
        control: {
          as: InputBox
        }
      }, {
        as: HorizontalField,
        label: 'Last Name',
        control: {
          as: InputBox
        }
      }]
    }]
  }
}
