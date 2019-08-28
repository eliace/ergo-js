import {Html} from '../../src'
import {Tag, Layouts, IconBox} from '../../bulma'

const Mixins = {
  LeftIcon: function () {
    return {
      classes: {'has-icons-left': true},
      components: {
        leftIcon: {
          base: IconBox,
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
          base: IconBox,
          as: 'is-small is-right',
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
      as: 'input'
    }
  }
}

class Field extends Html {
  config () {
    return {
      as: 'field',
      $control: {
        as: 'control'
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

  static Mixins = Mixins
}


class InputField extends Field {
  config () {
    return {
      $control: {
        $content: {
          base: Input
        }
      }
    }
  }

  configOptions () {
    return {
      placeholder: {
        initOrSet: function (v) {
          this.$control.$content.opt('placeholder', v)
        }
      },
      color: {
        initOrSet: function (nextVal, prevVal) {
          toggleClass(this.$control.$content, 'is-'+nextVal, 'is-'+prevVal)
        }
      },
      size: {
        initOrSet: function (nextVal, prevVal) {
          toggleClass(this.$control.$content, 'is-'+nextVal, 'is-'+prevVal)
        }
      },
      style: {
        initOrSet: function (nextVal, prevVal) {
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
        onInput: function (e, {data}) {
          data.set(e.target.value)
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
        base: Tag
      },
//      items: [1,2,3,4,5,6,7,8,9,0].map(itm => 'Helloodffdfgfsdgf'),
      pattern: '+7 (000) 000 00 00',
      dataChanged: function (v) {
        this.$placeholder.opt('text', v + this.options.pattern.substr(v.length))
      }
    }, {
      $title: {
        base: Header,
        text: 'Colors'
      },
      defaultItem: {
        base: Field.Input,
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
        base: Header,
        text: 'Sizes'
      },
      defaultItem: {
        base: Field.Input,
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
        base: Header,
        text: 'Styles'
      },
      items: [{
        base: Field.Input,
        width: 400,
        placeholder: 'Input text here...',
        style: 'rounded'
      }]
    }, {
      $title: {
        base: Header,
        text: 'States'
      },
      defaultItem: {
        base: Field,
        width: 400,
        $control: {
          base: Input
        }
      },
      items: [
        {$control: {placeholder: 'Normal input'}},
        {$control: {placeholder: 'Hover input', as: 'is-hovered'}},
        {$control: {placeholder: 'Focus input', as: 'is-focused'}},
        {$control: {placeholder: 'Loading input'}, loading: true},
        {$control: {placeholder: 'Disabled input', disabled: true}},
        {$control: {value: 'Read only', readOnly: true}},
        {$control: {value: 'Static text', as: 'is-static'}},
      ]
    }, {
      $title: {
        base: Header,
        text: 'Icons'
      },
      defaultItem: {
        base: Field,
        width: 400,
        $control: {
          base: Input,
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
