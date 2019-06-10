import {Html, Layouts, Box, IconBox, Button, Source} from '../../src'

import {ButtonWithIcon} from '../extensions'
import {Mutate} from '../helpers'
import {COUNTRIES} from '../constants'


class Input extends Html {
  static defaultOpts = {
    html: 'input',
    as: 'input'
  }
}


class Dropdown extends Html {
  static defaultOpts = {
    as: 'dropdown-content',
    defaultItem: {
      html: 'a',
      as: 'dropdown-item'
    }
  }
}



class DropdownBox extends Html {
  static defaultOpts = {
    sources: {
      dropdown: false
    },
    as: 'dropdown',
    components: {
      content: {
        as: 'dropdown-trigger',
        styles: {
          'width': '100%'
        },
        $content: {
          type: ButtonWithIcon,
          as: 'is-fullwidth',
          $icon: {
            weight: 10,
            as: 'is-small dropdown-icon',
            icon: 'fas fa-angle-down'
          },
          $content: {
            styles: {
              'display': 'flex',
              'flex': '1'
            }
          },
          $placeholder: {
            html: 'span',
            as: 'dropdown-placeholder',
            styles: {
              'display': 'flex',
              'flex': '1'
            },
            text: 'Select me...'
          }
        },
        // onClick: function () {
        //   this.parent.opt('active', !this.parent.options.active)
        // }
      },
      dropdown: {
        as: 'dropdown-menu',
        width: '100%',
        components: {
          content: {
            type: Dropdown
          }
        }
      },
      // overlay: {
      //   as: 'dropdown-overlay',
      //   onMouseDown: function () {
      //     this.parent.opt('active', false)
      //   }
      // }
    }
  }

  static OPTIONS = {
    active: {
      initOrSet: function (v) {
        this.opt('classes', {'is-active': v})
      }
    }
  }
}



export default (projector) => {
  return {
    sources: {
      selection: '',
//      dropdown: true,
      data: COUNTRIES
    },
    layout: Layouts.Rows,
    items: [{
      type: DropdownBox,
      as: 'dropdown-select',
//      text: 'Select me',
//      active: true,
      width: 400,
      dynamic: true,
      selectionChanged: function (v) {
        this.$content.opt('text', v)
        this.$content.$content.$placeholder.opt('render', !v)
      },
      dropdownChanged: function (v, k) {
        this.opt('$components', () => {
          return new Source({dropdown: v})
        })
        this.opt('active', v)
      },
      $content: {
        onClick: function (e) {
          this.sources.dropdown.toggle()
          e.stopImmediatePropagation()
        }
      },
      $dropdown: {
        $content: {
          as: 'is-hovered',
//          items: ['Alice', 'Bob', 'Charlie'],
          dynamic: true,
          dataChanged: Mutate.DynamicItems,
          defaultItem: {
            onClick: function (e) {
              this.sources.selection.set(this.options.key)
              this.sources.dropdown.set(false)
              e.stopImmediatePropagation()
            },
            selectionChanged: function (v) {
              this.opt('classes', {'is-active': v == this.options.key})
            },
            dataChanged: function (v) {
              this.opt('text', v.name)
              this.opt('key', v.name)
            }
          }
        }
      }
    }, {
//      type: DropdownBox,
      as: 'dropdown dropdown-input',
      width: 400,
      $content: {
        as: 'dropdown-trigger',
        width: '100%',
        $content: {
          as: 'control has-icons-right input-box',
          $input: {
            type: Input
          },
          $icon: {
            type: IconBox,
            as: 'is-small dropdown-icon is-right',
            icon: 'fas fa-angle-down'
          },
          $placeholder: {
            html: 'span',
            as: 'placeholder',
            text: 'Filter me...'
          }
        }
      }

    }]
  }
}
