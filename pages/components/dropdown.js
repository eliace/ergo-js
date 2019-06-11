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
        tabIndex: -1,
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
        const _key = 'select1'
        this.opt('$components', () => {
          return new Source({dropdown: v == _key})
        })
        this.opt('active', v == _key)
      },
      $content: {
        onClick: function (e) {
          const _key = 'select1'
          const v = this.sources.dropdown.get()
          if (v != _key) {
            this.sources.dropdown.set(_key)
          }
          else {
            this.sources.dropdown.set(false)
          }
//          this.sources.dropdown.toggle()
          e.stopImmediatePropagation()
        }
      },
      $dropdown: {
        onMouseDown: function (e) {
          e.stopImmediatePropagation()
        },
        $content: {
          as: 'is-hovered',
//          items: ['Alice', 'Bob', 'Charlie'],
          dynamic: true,
          dataChanged: Mutate.DynamicItems,
          defaultItem: {
            onClick: function (e) {
              this.sources.selection.set(this.options.key)
              this.sources.dropdown.set(false)
//              e.stopImmediatePropagation()
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
      dynamic: true,
//      active: true,
      onMouseDown: function (e) {
        e.stopImmediatePropagation()
      },
      dropdownChanged: function (v, k) {
//        const _key = 'select2'
        this.opt('$components', () => {
//          return this.sources[key].filter()
          return new Source({dropdown: v == this._key})
        })
        this.opt('classes', {'is-active': v == this._key})
      },
      _inputFocus: function () {
        if (!this._key) {
          this._key = 'select2'
        }
        this.sources.dropdown.set(this._key)
        return false
      },
      $content: {
        as: 'dropdown-trigger',
        width: '100%',
        $content: {
          as: 'control has-icons-right input-box',
          selectionChanged: function (v) {
            this.$input.opt('value', v)

            if (v) {
              const names = this.sources.data.get()
                .map(country => country.name)
                .filter(name => name.toLowerCase().startsWith(v.toLowerCase()))
                .sort()

              if (names.length > 0) {
                this.$placeholder.opt('text', v+names[0].substr(v.length))
              }
              else {
                this.$placeholder.opt('text', v)
              }
            }
            else {
              this.$placeholder.opt('text', 'Search...')
            }

          },
          $input: {
            type: Input,
            onFocus: function () {
              this.rise('_inputFocus')
            },
            onInput: function (e) {
              this.sources.selection.set(e.target.value)
            }
          },
          $icon: {
            type: IconBox,
            as: 'is-small dropdown-icon is-right',
            icon: 'fas fa-angle-down'
          },
          $placeholder: {
            html: 'span',
            as: 'placeholder',
            text: 'Filter me...',
            weight: -10
          }
        }
      },
      $dropdown: {
        as: 'dropdown-menu',
        width: '100%',
        $content: {
          type: Dropdown,
          as: 'is-hovered',
//          items: ['Alice', 'Bob', 'Charlie'],
          dynamic: true,
          dataChanged: Mutate.DynamicItems,
          defaultItem: {
            onClick: function (e) {
              this.sources.selection.set(this.options.key)
              this.sources.dropdown.set(false)
//              e.stopImmediatePropagation()
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
      sources: {
        vm: {
          input: '',
          placeholder: '',
          dropdown: false
        },
        selection: ''
      },
      as: 'dropdown dropdown-input',
      width: 400,
      dynamic: true,
      onMouseDown: function (e) {
        e.stopImmediatePropagation()
      },
//      active: true,
      _inputFocus: function () {
        if (!this._key) {
          this._key = 'select3'
        }
        this.sources.dropdown.set(this._key)
        return false
      },
      _inputValue: function (v) {
        this.sources.selection.set(v)
      },
      _itemClicked: function (item) {
        this.sources.selection.set(item.options.key)
        this.sources.dropdown.set(false)
      },
      dropdownChanged: function (v, k) {
        this.sources.vm._updating = false
        this.sources.vm.set('dropdown', v == this._key)
        this.sources.vm._updating = true
      },
      selectionChanged: function (v, k) {

        let ph = 'Search...'

        if (v) {
          const names = this.sources.data.get()
            .map(country => country.name)
            .filter(name => name.toLowerCase().startsWith(v.toLowerCase()))
            .sort()

          if (names.length > 0) {
            ph = v+names[0].substr(v.length)
          }
          else {
            ph = v
          }
        }

        this.sources.vm._updating = true
        this.sources.vm.set('input', v)
        this.sources.vm.set('placeholder', ph)
      },
      vmChanged: function (v, k) {
        this.opt('$components', k)
        this.opt('classes', {'is-active': v.dropdown})
//        console.log('vm changed')
      },
      $content: {
        as: 'dropdown-trigger',
        width: '100%',
        $content: {
          as: 'control has-icons-right input-box',
          $input: {
            type: Input,
            vmId: 'input',
            vmChanged: Mutate.Value,
            onFocus: function () {
              this.rise('_inputFocus')
            },
            onInput: function (e) {
              this.rise('_inputValue', e.target.value)
//              this.sources.viewModel.set(e.target.value)
            }
          },
          $icon: {
            type: IconBox,
            as: 'is-small dropdown-icon is-right',
            icon: 'fas fa-angle-down'
          },
          $placeholder: {
            html: 'span',
            as: 'placeholder',
            weight: -10,
            vmId: 'placeholder',
            vmChanged: Mutate.Text
          }
        }
      },
      $dropdown: {
        as: 'dropdown-menu',
        width: '100%',
        $content: {
          type: Dropdown,
          as: 'is-hovered',
//          items: ['Alice', 'Bob', 'Charlie'],
          dynamic: true,
          dataChanged: Mutate.DynamicItems,
          defaultItem: {
            onClick: function (e) {
              this.rise('_itemClicked', this)
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
    }]
  }
}
