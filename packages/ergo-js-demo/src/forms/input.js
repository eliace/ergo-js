import {Html} from 'chorda-core'
import {Tag, Layouts, IconBox} from 'chorda-bulma'

const Mixins = {
  LeftIcon: function () {
    return {
      classes: {'has-icons-left': true},
      components: {
        leftIcon: {
          as: IconBox,
          css: 'is-small is-left',
        }
      }
    }
  },
  RightIcon: function () {
    return {
      classes: {'has-icons-right': true},
      components: {
        rightIcon: {
          as: IconBox,
          css: 'is-small is-right',
        }
      }
    }
  }
}


function toggleClass(c, nextValue, prevValue) {
  if (prevValue) {
    c.opt('classes', {[prevValue]: false})
  }
  c.opt('classes', {[nextValue]: true})
}



class Input extends Html {
  config () {
    return {
      html: 'input',
      css: 'input'
    }
  }
}

class Field extends Html {
  config () {
    return {
      css: 'field',
      $control: {
        css: 'control'
      }
    }
  }

  configOptions () {
    return {
      // control: {
      //   sugar: function (o, preparedOpts) {
      //     preparedOpts.merge({
      //       $control: {
      //         content: o
      //       }
      //     })
      //   }
      // },
      loading: {
        initOrSet: function (v) {
          this.$control.opt('classes', {'is-loading': v})
        }
      }
    }
  }
}

Input.Mixins = Mixins


class InputField extends Field {
  config () {
    return {
      $control: {
        $content: {
          as: Input
        }
      }
    }
  }

  properties () {
    return {
      placeholder: {
        set: function (v) {
          this.$control.$content.opt('placeholder', v)
        }
      },
      color: {
        set: function (nextVal, prevVal) {
          toggleClass(this.$control.$content, 'is-'+nextVal, 'is-'+prevVal)
        }
      },
      size: {
        set: function (nextVal, prevVal) {
          toggleClass(this.$control.$content, 'is-'+nextVal, 'is-'+prevVal)
        }
      },
      kind: {
        set: function (nextVal, prevVal) {
          toggleClass(this.$control.$content, 'is-'+nextVal, 'is-'+prevVal)
        }
      }
    }
  }
}

Field.Input = InputField



class Header extends Html {
  config () {
    return {
      layout: Layouts.Content,
      $content: {
        html: 'h4'
      }
    }
  }
}


export default () => {
  return {
    layout: Layouts.Rows,
    width: 400,
    items: [{
      html: 'input',
      css: 'input'
    }, {
      sources: {
        data: 'aaa'
      },
      css: 'input-box',
      $content: {
        html: 'input',
        css: 'input',
        weight: 20,
        onKeyDown: function () {
//          return false
        },
        onInput: function (e, {data}) {
          data.set(e.target.value)
        },
        dataChanged: function (v) {
          this.opt('value', v)
        }
      },
      $placeholder: {
        css: 'placeholder',
        weight: 10
      },
      defaultItem: {
        as: Tag
      },
//      items: [1,2,3,4,5,6,7,8,9,0].map(itm => 'Helloodffdfgfsdgf'),
      pattern: '+7 (000) 000 00 00',
      dataChanged: function (v) {
        this.$placeholder.opt('text', v + this.options.pattern.substr(v.length))
      }
    }, {
      $title: {
        as: Header,
        text: 'Colors'
      },
      defaultItem: {
        as: Field.Input,
        width: 400,
        placeholder: 'Input text here...'
      },
      items: [
        {color: 'primary'},
        {color: 'info'},
        {color: 'success'},
        {color: 'warning'},
        {color: 'danger'}
      ]
    }, {
      $title: {
        as: Header,
        text: 'Sizes'
      },
      defaultItem: {
        as: Field.Input,
        width: 400,
        placeholder: 'Input text here...'
      },
      items: [
        {size: 'small'},
        {},
        {size: 'medium'},
        {size: 'large'}
      ]
    }, {
      $title: {
        as: Header,
        text: 'Styles'
      },
      items: [{
        as: Field.Input,
        width: 400,
        placeholder: 'Input text here...',
        kind: 'rounded'
      }]
    }, {
      $title: {
        as: Header,
        text: 'States'
      },
      defaultItem: {
        as: Field,
        width: 400,
        $control: {
          as: Input
        }
      },
      items: [
        {$control: {placeholder: 'Normal input'}},
        {$control: {placeholder: 'Hover input', css: 'is-hovered'}},
        {$control: {placeholder: 'Focus input', css: 'is-focused'}},
        {$control: {placeholder: 'Loading input'}, loading: true},
        {$control: {placeholder: 'Disabled input', disabled: true}},
        {$control: {value: 'Read only', readOnly: true}},
        {$control: {value: 'Static text', css: 'is-static'}},
      ]
    }, {
      $title: {
        as: Header,
        text: 'Icons'
      },
      defaultItem: {
        as: Field,
        width: 400,
        $control: {
          as: Input,
          placeholder: 'Input text here...'
        }
      },
      items: [{
        control: {
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
