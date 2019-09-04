import {Html, Source, Domain} from '../../src'
import {Layouts, Box, IconBox, Button, Input} from '../../bulma'

import {ButtonWithIcon} from '../extensions'
import {Mutate} from '../helpers'
import {COUNTRIES} from '../constants'

class Dropdown extends Html {
  config () {
    return {
      as: 'dropdown-content',
      defaultItem: {
        html: 'a',
        as: 'dropdown-item'
      }
    }
  }
}



class DropdownBox extends Html {
  config () {
    return {
      as: 'dropdown',
//       components: {
// //        dropdown: false
//       },
      $content: {
        tabIndex: -1,
        as: 'dropdown-trigger',
        styles: {
          'width': '100%'
        },
        $content: {
          base: ButtonWithIcon,
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
      },
      $dropdown: {
        as: 'dropdown-menu',
        width: '100%',
        $content: {
          base: Dropdown
        },
        onMouseDown: function (e) {
          e.nativeEvent.stopImmediatePropagation()
        },
      }
    }
  }

  configOptions () {
    return {
      active: {
        initOrSet: function (v) {
          this.opt('classes', {'is-active': v})
        }
      }
    }
  }

}



export default () => {
  return {
    sources: {
      selection: '',
//      dropdown: true,
      data: COUNTRIES
    },
    layout: Layouts.Rows,
    items: [{
      sources: {
        view: function () {
          return new Domain({
            dropdown: false
          })
        }
      },
      base: DropdownBox,
      as: 'dropdown-select',
      width: 400,
      viewChanged: function (v, k, view) {
        // зависит только от props.dropdown
        this.opt('active', !!v.dropdown)
        this.opt('components', {dropdown: v.dropdown})
        // зависит только от props.value
        this.$content.$content.opt('text', v.value)
        this.$content.$content.opt('components', {placeholder: !v.value})
      },
      $content: {
        onClick: function (e, {dropdown, view}) {
          view.$toggle('dropdown')
          e.nativeEvent.stopImmediatePropagation()
        }
      },
      $dropdown: {
        $content: {
          as: 'is-hovered',
          dataChanged: function (v, k) {
            this.opt('$items', k)
          },
          defaultItem: {
            onClick: function (e, {view}) {
              view.set('value', this.options.key)
              view.set('dropdown', false)
            },
            viewChanged: function (v) {
              this.opt('classes', {'is-active': v.value == this.options.key})
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
        value: function () {
          return new Domain(null)
        },
        view: function () {
          return new Domain({})
        },
        dropdown: function () {
          return new Domain(false)
        }
      },
      base: DropdownBox,
      as: 'dropdown-select',
      width: 400,
      allJoined: function ({view, dropdown, value}) {
        view.$method('toggle', this, () => {
          dropdown.$toggle()
        })
        view.$method('select', this, (k) => {
          value.set(k)
          dropdown.set(false)
        })
      },
      valueChanged: function (v) {
        this.$content.$content.opt('text', v)
        this.$content.$content.opt('components', {placeholder: !v})
      },
      dropdownChanged: function (v) {
        this.opt('active', !!v)
        this.opt('components', {dropdown: !!v})
      },
      $content: {
        onClick: function (e, {view}) {
          view.toggle()
          e.nativeEvent.stopImmediatePropagation()
        }
      },
      $dropdown: {
        $content: {
          as: 'is-hovered',
          dataChanged: function (v, k) {
            this.opt('$items', k)
          },
          defaultItem: {
            onClick: function (e, {view}) {
              view.select(this.options.key)
              // value.set(this.options.key)
              // dropdown.set(false)
            },
            valueChanged: function (v) {
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
        value: () => new Domain('Algeria'),
        view: () => new Domain({}),
        dropdown: () => new Domain(false)
      },
      allJoined: function ({view, dropdown, value, data}) {
        view.$method('focus', this, () => {
          dropdown.set(true)
        })
        view.$method('select', this, (k) => {
          dropdown.set(false)
          value.set(k)
        })
        view.$prop('placeholder', null, (v) => {
          let placeholder = 'Search...'
          if (v.value) {
//            const list = view.get('list')
            const list = v.data
              .filter(country => country.name.toLowerCase().startsWith(v.value.toLowerCase()))
              .sort()
            return list.length > 0 ? v.value+list[0].name.substr(v.value.length) : v.value
          }
          else {
            return 'Search...'
          }
        })
        view.$prop('list', null, (v) => {
          let list = v.data
          if (v.value) {
            list = list
              .filter(country => country.name.toLowerCase().startsWith(v.value.toLowerCase()))
              .sort()
          }
          return list
        })
        value.$watch(e => e.name == 'changed', this, (e) => {
//           const v = e.data
//           let list = data.get()
// //          let placeholder = 'Search...'
//           if (v) {
//             list = list
//               .filter(country => country.name.toLowerCase().startsWith(v.toLowerCase()))
//               .sort()
//
// //            placeholder = list.length > 0 ? v+list[0].name.substr(v.length) : v
//           }
//           view.set('list', list)
          view.set('value', e.data)
//          view.set('placeholder', placeholder)
        })
        data.$watch(e => e.name == 'changed', this, (e) => {
          view.set('data', e.data)
        })
        // view.set('data', data.get())
        // view.set('value', value.get())
      },
//      base: DropdownBox,
      as: 'dropdown dropdown-input',
      width: 400,
//      components: true,
//      active: true,
      onMouseDown: function (e) {
        e.nativeEvent.stopImmediatePropagation()
      },
      dropdownChanged: function (v, k) {
//        const _key = 'select2'
        // this.opt('$components', {dropdown: v == this._key})
        // this.opt('classes', {'is-active': v == this._key})
//        this.opt('active', !!v)
        this.opt('components', {dropdown: !!v})
        this.opt('classes', {'is-active': !!v})
      },
      // _inputFocus: function () {
      //   if (!this._key) {
      //     this._key = 'select2'
      //   }
      //   this.sources.dropdown.set(this._key)
      //   return false
      // },
      $content: {
        as: 'dropdown-trigger',
        width: '100%',
        $content: {
          as: 'control has-icons-right input-box',
          viewChanged: function (v, k, d) {
            this.$placeholder.opt('text', d.get('placeholder'))
          },
          valueChanged: function (v) {
            this.$input.opt('value', v)

//             if (v) {
//               const names = this.sources.data.get()
//                 .map(country => country.name)
//                 .filter(name => name.toLowerCase().startsWith(v.toLowerCase()))
// //                .sort()
//
//               if (names.length > 0) {
//                 this.$placeholder.opt('text', v+names[0].substr(v.length))
//               }
//               else {
//                 this.$placeholder.opt('text', v)
//               }
//             }
//             else {
//               this.$placeholder.opt('text', 'Search...')
//             }

          },
          $input: {
            base: Input,
            onFocus: function (e, {view}) {
              view.focus()
//              this.rise('_inputFocus')
            },
            onChange: function (e, {value}) {
              value.set(e.target.value)
//              this.sources.selection.set(e.target.value)
            }
          },
          $icon: {
            base: IconBox,
            as: 'is-small dropdown-icon is-right',
            icon: 'fas fa-angle-down'
          },
          $placeholder: {
            html: 'span',
            as: 'placeholder',
//            text: 'Filter me...',
            weight: -10
          }
        }
      },
      $dropdown: {
        as: 'dropdown-menu',
        width: '100%',
        $content: {
          sources: {
            data: function (o) {
              return o.sources.view.$entry('list')
            }
          },
          base: Dropdown,
          as: 'is-hovered',
//          items: ['Alice', 'Bob', 'Charlie'],
//          dynamic: true,
          dataChanged: Mutate.Items,
          defaultItem: {
            onClick: function (e, {view}) {
              view.select(this.options.key)
//              this.sources.selection.set(this.options.key)
//              this.sources.dropdown.set(false)
//              e.stopImmediatePropagation()
            },
            _valueChanged: function (v) {
              this.opt('classes', {'is-active': v == this.options.key})
            },
            dataChanged: function (v) {
              this.opt('text', v.name)
              this.opt('key', v.name)
            }
          }
        }
      }
    }/*, {
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
            base: Input,
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
            base: IconBox,
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
          base: Dropdown,
          as: 'is-hovered',
//          items: ['Alice', 'Bob', 'Charlie'],
          dynamic: true,
          // dataChanged: function (v, k) {
          //   const sel = this.sources.selection.get()
          //   console.log(sel)
          //   this.opt('$items', this.sources[k].asStream().filter(itm => itm.name.indexOf(sel)))
          // }, //Mutate.Items,
          binding: function (values) {
            console.log(values.selection)
            this.opt('$items', this.sources.data.$stream().name('data').filter(itm => itm.name.toLowerCase().indexOf(values.selection.toLowerCase()) != -1))
          },
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
    }*/]
  }
}
